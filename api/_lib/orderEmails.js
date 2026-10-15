// Branded HTML emails for shop orders.
// Email clients ignore <style> blocks and modern CSS, so everything is built
// with tables and inline styles (works in Gmail, Outlook, Apple Mail).

const SITE_URL = "https://www.aquaproswim.com";
const CLUB = {
  email: "aquaproswim@gmail.com",
  phone: "071 248 750",
  phoneHref: "+38971248750",
  address: "Skopje Sports Center",
  facebook: "https://www.facebook.com/AquaProSwimming/",
  instagram: "https://www.instagram.com/aquaproswimming/",
  youtube: "https://www.youtube.com/@aquaproswimmingacademy5793",
};

const COLORS = {
  navy: "#062a4f",
  blue: "#007cf7",
  sky: "#00bfff",
  ice: "#e0f2ff",
  page: "#eef4fb",
  text: "#1f2d3d",
  muted: "#6b7c93",
  border: "#e3ebf5",
};

const FONT = "'Montserrat', 'Segoe UI', Arial, Helvetica, sans-serif";

export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]
  );

const formatEur = (value) => {
  const amount = Number(value);
  return `${Number.isInteger(amount) ? amount : amount.toFixed(2)} EUR`;
};

const absoluteUrl = (path) => (path ? `${SITE_URL}${path}` : null);

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

const layout = ({ preheader, header, body }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <title>Aqua Pro Swim</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.page};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLORS.page}" style="background:${COLORS.page};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(6,42,79,0.10);">
          ${header}
          ${body}
          ${footer()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const header = ({ eyebrow, title, subtitle }) => `
  <tr>
    <td bgcolor="${COLORS.navy}" style="background:${COLORS.navy};background-image:linear-gradient(135deg, ${COLORS.navy} 0%, #0a4f94 55%, ${COLORS.blue} 100%);padding:36px 32px 32px;text-align:center;">
      <a href="${SITE_URL}" style="text-decoration:none;">
        <img src="${SITE_URL}/Logo.png" width="72" height="72" alt="Aqua Pro Swim" style="display:block;margin:0 auto 14px;border:0;width:72px;height:72px;" />
      </a>
      <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:3px;color:${COLORS.sky};text-transform:uppercase;">${eyebrow}</div>
      <div style="font-family:${FONT};font-size:26px;line-height:1.3;font-weight:800;color:#ffffff;margin-top:8px;">${title}</div>
      ${subtitle ? `<div style="font-family:${FONT};font-size:14px;line-height:1.6;color:#cfe6ff;margin-top:8px;">${subtitle}</div>` : ""}
    </td>
  </tr>
  <tr>
    <td bgcolor="${COLORS.sky}" style="height:4px;line-height:4px;font-size:0;background:${COLORS.sky};background-image:linear-gradient(90deg, ${COLORS.sky}, ${COLORS.blue});">&nbsp;</td>
  </tr>`;

const sectionTitle = (text) => `
  <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${COLORS.blue};margin:0 0 12px;">${text}</div>`;

const orderBadge = (orderLabel, dateLabel) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
    <tr>
      <td style="font-family:${FONT};">
        <span style="display:inline-block;background:${COLORS.ice};color:${COLORS.blue};font-weight:800;font-size:15px;padding:8px 16px;border-radius:999px;">Order ${escapeHtml(orderLabel)}</span>
      </td>
      <td align="right" style="font-family:${FONT};font-size:13px;color:${COLORS.muted};">${escapeHtml(dateLabel)}</td>
    </tr>
  </table>`;

const itemRow = (line, isLast) => {
  const image = line.image
    ? `<img src="${escapeHtml(line.image)}" width="56" height="56" alt="" style="display:block;width:56px;height:56px;border-radius:10px;object-fit:cover;border:1px solid ${COLORS.border};background:${COLORS.ice};" />`
    : `<div style="width:56px;height:56px;border-radius:10px;background:${COLORS.ice};"></div>`;
  const details = [
    line.size ? `Size: ${escapeHtml(line.size)}` : null,
    `Qty: ${line.quantity}`,
    `${formatEur(line.unitPrice)} each`,
  ]
    .filter(Boolean)
    .join(" &nbsp;·&nbsp; ");

  return `
    <tr>
      <td width="68" valign="middle" style="padding:14px 0;${isLast ? "" : `border-bottom:1px solid ${COLORS.border};`}">${image}</td>
      <td valign="middle" style="padding:14px 12px;font-family:${FONT};${isLast ? "" : `border-bottom:1px solid ${COLORS.border};`}">
        <div style="font-size:15px;font-weight:700;color:${COLORS.text};">${escapeHtml(line.name)}</div>
        <div style="font-size:13px;color:${COLORS.muted};margin-top:4px;">${details}</div>
      </td>
      <td align="right" valign="middle" style="padding:14px 0;font-family:${FONT};font-size:15px;font-weight:700;color:${COLORS.text};white-space:nowrap;${isLast ? "" : `border-bottom:1px solid ${COLORS.border};`}">${formatEur(line.subtotal)}</td>
    </tr>`;
};

const itemsBlock = (lines, total) => {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  return `
    ${sectionTitle("Order summary")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${lines.map((line, index) => itemRow(line, index === lines.length - 1)).join("")}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;background:${COLORS.navy};background-image:linear-gradient(135deg, ${COLORS.navy}, #0a4f94);border-radius:14px;">
      <tr>
        <td style="padding:18px 20px;font-family:${FONT};font-size:14px;color:#cfe6ff;">Total · ${itemCount} ${itemCount === 1 ? "item" : "items"}</td>
        <td align="right" style="padding:18px 20px;font-family:${FONT};font-size:22px;font-weight:800;color:#ffffff;white-space:nowrap;">${formatEur(total)}</td>
      </tr>
    </table>`;
};

const infoCard = (rows) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.ice};border-radius:14px;margin-bottom:28px;">
    <tr>
      <td style="padding:18px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${rows
            .map(
              ([label, value]) => `
          <tr>
            <td width="90" style="padding:5px 0;font-family:${FONT};font-size:13px;color:${COLORS.muted};vertical-align:top;">${label}</td>
            <td style="padding:5px 0;font-family:${FONT};font-size:14px;font-weight:600;color:${COLORS.text};">${value}</td>
          </tr>`
            )
            .join("")}
        </table>
      </td>
    </tr>
  </table>`;

const button = (href, label, { primary = true } = {}) => `
  <a href="${escapeHtml(href)}" style="display:inline-block;font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:999px;margin:4px;${
    primary
      ? `background:${COLORS.blue};color:#ffffff;`
      : `background:#ffffff;color:${COLORS.blue};border:2px solid ${COLORS.blue};`
  }">${label}</a>`;

const step = (number, title, text) => `
  <tr>
    <td width="44" valign="top" style="padding:8px 0;">
      <div style="width:32px;height:32px;line-height:32px;border-radius:50%;background:${COLORS.blue};color:#ffffff;text-align:center;font-family:${FONT};font-weight:800;font-size:14px;">${number}</div>
    </td>
    <td valign="top" style="padding:8px 0;font-family:${FONT};">
      <div style="font-size:15px;font-weight:700;color:${COLORS.text};">${title}</div>
      <div style="font-size:13px;line-height:1.6;color:${COLORS.muted};margin-top:2px;">${text}</div>
    </td>
  </tr>`;

const footer = () => `
  <tr>
    <td bgcolor="${COLORS.navy}" style="background:${COLORS.navy};padding:28px 32px;text-align:center;font-family:${FONT};">
      <div style="font-size:14px;font-weight:700;color:#ffffff;">Aqua Pro Swim Academy</div>
      <div style="font-size:13px;line-height:1.8;color:#9fc3e8;margin-top:6px;">
        ${CLUB.address}<br />
        <a href="mailto:${CLUB.email}" style="color:#9fc3e8;text-decoration:none;">${CLUB.email}</a> &nbsp;·&nbsp;
        <a href="tel:${CLUB.phoneHref}" style="color:#9fc3e8;text-decoration:none;">${CLUB.phone}</a>
      </div>
      <div style="margin-top:14px;font-size:13px;">
        <a href="${CLUB.facebook}" style="color:${COLORS.sky};text-decoration:none;font-weight:600;">Facebook</a>
        <span style="color:#3d6a96;">&nbsp;|&nbsp;</span>
        <a href="${CLUB.instagram}" style="color:${COLORS.sky};text-decoration:none;font-weight:600;">Instagram</a>
        <span style="color:#3d6a96;">&nbsp;|&nbsp;</span>
        <a href="${CLUB.youtube}" style="color:${COLORS.sky};text-decoration:none;font-weight:600;">YouTube</a>
        <span style="color:#3d6a96;">&nbsp;|&nbsp;</span>
        <a href="${SITE_URL}" style="color:${COLORS.sky};text-decoration:none;font-weight:600;">aquaproswim.com</a>
      </div>
    </td>
  </tr>`;

const textItems = (lines, total) =>
  lines
    .map(
      (line) =>
        `- ${line.name}${line.size ? ` (size ${line.size})` : ""} x${line.quantity} = ${formatEur(line.subtotal)}`
    )
    .join("\n") + `\nTotal: ${formatEur(total)}`;

const formatDate = (date) =>
  date.toLocaleString("en-GB", {
    timeZone: "Europe/Skopje",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// ---------------------------------------------------------------------------
// Emails
// ---------------------------------------------------------------------------

// lines: [{ name, size, quantity, unitPrice, subtotal, image }]
export const renderClubEmail = ({ orderLabel, customer, lines, total, dashboardUrl }) => {
  const dateLabel = formatDate(new Date());
  const html = layout({
    preheader: `${customer.name} ordered ${lines.length} product(s) · ${formatEur(total)}`,
    header: header({
      eyebrow: "Team Shop",
      title: `New order ${escapeHtml(orderLabel)}`,
      subtitle: `${escapeHtml(customer.name)} just placed an order`,
    }),
    body: `
      <tr>
        <td style="padding:32px;">
          ${orderBadge(orderLabel, dateLabel)}
          ${sectionTitle("Customer")}
          ${infoCard([
            ["Name", escapeHtml(customer.name)],
            ["Email", `<a href="mailto:${escapeHtml(customer.email)}" style="color:${COLORS.blue};text-decoration:none;">${escapeHtml(customer.email)}</a>`],
            ["Phone", `<a href="tel:${escapeHtml(customer.phone.replace(/\s+/g, ""))}" style="color:${COLORS.blue};text-decoration:none;">${escapeHtml(customer.phone)}</a>`],
          ])}
          ${itemsBlock(lines, total)}
          <div style="text-align:center;margin-top:28px;">
            ${button(`mailto:${customer.email}?subject=${encodeURIComponent(`Your Aqua Pro order ${orderLabel}`)}`, "Reply to customer")}
            ${button(`tel:${customer.phone.replace(/\s+/g, "")}`, "Call customer", { primary: false })}
          </div>
          ${
            dashboardUrl
              ? `<div style="text-align:center;margin-top:16px;font-family:${FONT};font-size:13px;"><a href="${escapeHtml(dashboardUrl)}" style="color:${COLORS.muted};">Open orders in Supabase →</a></div>`
              : ""
          }
        </td>
      </tr>`,
  });

  const text = `New shop order ${orderLabel}\n${dateLabel}\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\n\n${textItems(lines, total)}`;
  return { html, text };
};

export const renderCustomerEmail = ({ orderLabel, customer, lines, total }) => {
  const dateLabel = formatDate(new Date());
  const firstName = customer.name.split(/\s+/)[0];
  const html = layout({
    preheader: `Thank you for your order ${orderLabel}! Ви благодариме за нарачката!`,
    header: header({
      eyebrow: "Order received · Нарачката е примена",
      title: `Thank you, ${escapeHtml(firstName)}!`,
      subtitle: "Ви благодариме за нарачката!",
    }),
    body: `
      <tr>
        <td style="padding:32px;">
          ${orderBadge(orderLabel, dateLabel)}
          <p style="font-family:${FONT};font-size:15px;line-height:1.7;color:${COLORS.text};margin:0 0 6px;">
            We've received your order and our team will be in touch soon.
          </p>
          <p style="font-family:${FONT};font-size:14px;line-height:1.7;color:${COLORS.muted};margin:0 0 28px;">
            Ја добивме вашата нарачка и наскоро ќе ве контактираме.
          </p>
          ${itemsBlock(lines, total)}
          <div style="height:32px;line-height:32px;font-size:0;">&nbsp;</div>
          ${sectionTitle("What happens next · Што следува")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${step(1, "We confirm your order", "We check sizes and availability. · Ги проверуваме големините и залихата.")}
            ${step(2, "Payment &amp; pickup", "We contact you about payment and where to pick up your gear. · Ве контактираме за плаќање и подигнување.")}
            ${step(3, "Show off your new gear", "See you at the pool! · Се гледаме на базен!")}
          </table>
          <div style="text-align:center;margin-top:28px;">
            ${button(`mailto:${CLUB.email}?subject=${encodeURIComponent(`Question about order ${orderLabel}`)}`, "Questions? Contact us")}
          </div>
          <p style="font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};text-align:center;margin:16px 0 0;">
            You can also simply reply to this email. · Можете и само да одговорите на оваа порака.
          </p>
        </td>
      </tr>`,
  });

  const text = `Thank you for your order, ${firstName}! / Ви благодариме за нарачката!\n\nOrder ${orderLabel} · ${dateLabel}\n\n${textItems(lines, total)}\n\nWhat happens next:\n1. We confirm your order (sizes and availability).\n2. We contact you about payment and pickup.\n3. See you at the pool!\n\nQuestions? Reply to this email or write to ${CLUB.email} · ${CLUB.phone}\n\nAqua Pro Swim Academy · ${SITE_URL}`;
  return { html, text };
};

export const addProductImages = (lines, imagesByIndex) =>
  lines.map((line, index) => ({ ...line, image: absoluteUrl(imagesByIndex[index]) }));
