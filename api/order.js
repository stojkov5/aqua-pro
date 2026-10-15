import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";
import {
  addProductImages,
  renderClubEmail,
  renderCustomerEmail,
} from "./_lib/orderEmails.js";

// Receives a shop order from the cart page, saves it in Supabase (which prices
// it from the products table — never trusting prices sent by the browser) and
// emails it through Resend.

const RESEND_URL = "https://api.resend.com/emails";
const MAX_LINES = 30;

const isNonEmptyString = (value, maxLength) =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  value.length <= maxLength;

const isEmail = (value) =>
  isNonEmptyString(value, 254) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Keeps only the fields create_order needs; the database does the real validation.
const sanitizeItems = (items) => {
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_LINES) {
    return null;
  }
  return items.map((item) => ({
    id: Number(item?.id),
    size: typeof item?.size === "string" ? item.size : null,
    quantity: Number(item?.quantity),
  }));
};

const sendEmail = async (apiKey, payload) => {
  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
  return response.json();
};

// Product photos for the email. order.items come back in the same order as
// the items we sent, so they can be matched by position. Emails still go out
// without photos if this lookup fails.
const fetchImagesByIndex = async (supabase, orderItems) => {
  const ids = [...new Set(orderItems.map((item) => item.id))];
  const { data, error } = await supabase.from("products").select("id, image").in("id", ids);
  if (error) {
    console.error("Could not load product images for email:", error);
    return [];
  }
  const imageById = new Map(data.map((row) => [row.id, row.image]));
  return orderItems.map((item) => imageById.get(item.id));
};

const supabaseOrdersUrl = () => {
  const ref = process.env.VITE_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  return ref ? `https://supabase.com/dashboard/project/${ref}/editor` : null;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, phone, items, website } = req.body ?? {};

  // Honeypot: real visitors never see or fill the "website" field.
  if (website) return res.status(200).json({ ok: true });

  if (
    !isNonEmptyString(fullName, 100) ||
    !isEmail(email) ||
    !isNonEmptyString(phone, 30)
  ) {
    return res.status(400).json({ error: "Please fill in name, email and phone." });
  }

  const orderItems = sanitizeItems(items);
  if (!orderItems) {
    return res.status(400).json({ error: "Your cart contains invalid items." });
  }

  const { RESEND_API_KEY, ORDER_EMAIL_TO, ORDER_EMAIL_FROM } = process.env;
  const supabase = getSupabaseAdmin();
  if (!RESEND_API_KEY || !ORDER_EMAIL_TO || !ORDER_EMAIL_FROM || !supabase) {
    console.error("Ordering is not configured: missing env variables");
    return res.status(500).json({ error: "Ordering is temporarily unavailable." });
  }

  const customer = {
    name: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
  };

  const { data: order, error: orderError } = await supabase.rpc("create_order", {
    p_customer_name: customer.name,
    p_customer_email: customer.email,
    p_customer_phone: customer.phone,
    p_items: orderItems,
  });

  if (orderError) {
    // create_order raises invalid_items for unknown/inactive products, bad
    // quantities or missing sizes; anything else is a server problem.
    if (orderError.message?.includes("invalid_items")) {
      return res.status(400).json({
        error: "Some items in your cart are no longer available. Please empty your cart and add them again.",
      });
    }
    console.error("Failed to save order:", orderError);
    return res.status(502).json({ error: "Could not save your order. Please try again." });
  }

  const orderLabel = `#${order.orderNumber}`;
  const imagesByIndex = await fetchImagesByIndex(supabase, orderItems);
  const emailData = {
    orderLabel,
    customer,
    lines: addProductImages(order.items, imagesByIndex),
    total: order.total,
  };

  try {
    const clubEmail = renderClubEmail({ ...emailData, dashboardUrl: supabaseOrdersUrl() });
    await sendEmail(RESEND_API_KEY, {
      from: ORDER_EMAIL_FROM,
      to: [ORDER_EMAIL_TO],
      reply_to: customer.email,
      subject: `New shop order ${orderLabel} — ${customer.name}`,
      html: clubEmail.html,
      text: clubEmail.text,
    });
  } catch (error) {
    // The order is already saved in Supabase, so the club can still see it there.
    console.error(`Failed to send club email for order ${orderLabel}:`, error);
  }

  // The customer confirmation is a courtesy: the order is already saved.
  try {
    const customerEmail = renderCustomerEmail(emailData);
    await sendEmail(RESEND_API_KEY, {
      from: ORDER_EMAIL_FROM,
      to: [customer.email],
      reply_to: ORDER_EMAIL_TO,
      subject: `Your Aqua Pro order ${orderLabel} / Вашата нарачка ${orderLabel}`,
      html: customerEmail.html,
      text: customerEmail.text,
    });
  } catch (error) {
    console.error(`Failed to send customer confirmation for order ${orderLabel}:`, error);
  }

  return res.status(200).json({ ok: true, orderNumber: order.orderNumber });
}
