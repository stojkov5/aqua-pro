import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";

// Receives a shop order from the cart page, saves it in Supabase (which prices
// it from the products table — never trusting prices sent by the browser) and
// emails it through Resend.

const RESEND_URL = "https://api.resend.com/emails";
const MAX_LINES = 30;

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]
  );

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

const renderItemsTable = (lines, total) => `
  <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
    <thead style="background:#f0f4f8">
      <tr><th align="left">Product</th><th align="left">Size</th><th>Qty</th><th align="right">Price</th><th align="right">Subtotal</th></tr>
    </thead>
    <tbody>
      ${lines
        .map(
          (line) => `<tr>
        <td>${escapeHtml(line.name)}</td>
        <td>${escapeHtml(line.size ?? "—")}</td>
        <td align="center">${line.quantity}</td>
        <td align="right">${line.unitPrice} EUR</td>
        <td align="right">${line.subtotal} EUR</td>
      </tr>`
        )
        .join("")}
    </tbody>
    <tfoot>
      <tr><td colspan="4" align="right"><strong>Total</strong></td><td align="right"><strong>${total} EUR</strong></td></tr>
    </tfoot>
  </table>`;

const renderItemsText = (lines, total) =>
  lines
    .map(
      (line) =>
        `- ${line.name}${line.size ? ` (size ${line.size})` : ""} x${line.quantity} = ${line.subtotal} EUR`
    )
    .join("\n") + `\nTotal: ${total} EUR`;

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

  const lines = order.items;
  const total = order.total;
  const orderLabel = `#${order.orderNumber}`;

  try {
    await sendEmail(RESEND_API_KEY, {
      from: ORDER_EMAIL_FROM,
      to: [ORDER_EMAIL_TO],
      reply_to: customer.email,
      subject: `New shop order ${orderLabel} — ${customer.name}`,
      html: `
        <h2 style="font-family:Arial,sans-serif">New shop order ${orderLabel}</h2>
        <p style="font-family:Arial,sans-serif;font-size:14px">
          <strong>Name:</strong> ${escapeHtml(customer.name)}<br/>
          <strong>Email:</strong> ${escapeHtml(customer.email)}<br/>
          <strong>Phone:</strong> ${escapeHtml(customer.phone)}
        </p>
        ${renderItemsTable(lines, total)}
        <p style="font-family:Arial,sans-serif;font-size:12px;color:#666">Reply to this email to contact the customer.</p>`,
      text: `New shop order ${orderLabel}\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\n\n${renderItemsText(lines, total)}`,
    });
  } catch (error) {
    // The order is already saved in Supabase, so the club can still see it there.
    console.error(`Failed to send club email for order ${orderLabel}:`, error);
  }

  try {
    await sendEmail(RESEND_API_KEY, {
      from: ORDER_EMAIL_FROM,
      to: [customer.email],
      reply_to: ORDER_EMAIL_TO,
      subject: `Your Aqua Pro order ${orderLabel} / Вашата нарачка ${orderLabel}`,
      html: `
        <p style="font-family:Arial,sans-serif;font-size:14px">
          Hi ${escapeHtml(customer.name)},<br/><br/>
          Thank you for your order! We will contact you soon about payment and pickup.<br/>
          Ви благодариме за нарачката! Наскоро ќе ве контактираме за плаќање и подигнување.
        </p>
        ${renderItemsTable(lines, total)}
        <p style="font-family:Arial,sans-serif;font-size:14px">Aqua Pro Swim · aquaproswim.com</p>`,
      text: `Hi ${customer.name},\n\nThank you for your order! We will contact you soon about payment and pickup.\nВи благодариме за нарачката! Наскоро ќе ве контактираме за плаќање и подигнување.\n\n${renderItemsText(lines, total)}\n\nAqua Pro Swim · aquaproswim.com`,
    });
  } catch (error) {
    console.error(`Failed to send customer confirmation for order ${orderLabel}:`, error);
  }

  return res.status(200).json({ ok: true, orderNumber: order.orderNumber });
}
