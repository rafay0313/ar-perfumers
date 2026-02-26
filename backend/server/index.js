import 'dotenv/config';
import http from "node:http";
import { randomUUID } from "node:crypto";
import { URL } from "node:url";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const API_PREFIX = "/api";

const users = [
  {
    id: "u_admin",
    name: "Admin User",
    email: "abdurrafayfarhan3@gmail.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "u_customer",
    name: "Luxury Customer",
    email: "user@arluxe.com",
    password: "user123",
    role: "customer",
  },
];

const products = [
  {
    id: "reef-33",
    name: "REEF 33",
    price: 3500,
    discountPercent: 0,
    image: "/reef-33-3-2.png",
    scent: "Warm, Spicy, Amber",
    category: "Premium Category",
    isNew: true,
  },
  {
    id: "elysium-3",
    name: "ELYSIUM",
    price: 3500,
    discountPercent: 0,
    image: "/elysium-3.png",
    scent: "Fresh, Citrus, Woody",
    category: "Premium Category",
    isNew: true,
  },
  {
    id: "aventus-creed-4",
    name: "AVENTUS CREED",
    price: 4000,
    discountPercent: 0,
    image: "/aventus-creed-4.png",
    scent: "Fruity, Smoky, Woody",
    category: "Premium Category",
    isNew: true,
  },
  {
    id: "oud-maracuja-2-1",
    name: "OUD MARACUJA",
    price: 4000,
    discountPercent: 0,
    image: "/oud-maracuja-2-1.png",
    scent: "Tropical, Oud, Amber",
    category: "Premium Category",
    isNew: true,
  },
  {
    id: "blue-oud5-1",
    name: "BLUE OUD",
    price: 4000,
    discountPercent: 0,
    image: "/blue-oud5-1.png",
    scent: "Fresh, Oud, Marine",
    category: "Premium Category",
    isNew: true,
  },
  {
    id: "officer-1",
    name: "OFFICER",
    price: 1500,
    discountPercent: 0,
    image: "/officer-1.png",
    scent: "Fresh, Aromatic, Elegant",
    category: "New Category",
    isNew: true,
  },
  {
    id: "urban-eclipse-1",
    name: "URBAN ECLIPSE",
    price: 1500,
    discountPercent: 0,
    image: "/urban-eclipse-1.png",
    scent: "Woody, Dark, Modern",
    category: "New Category",
    isNew: true,
  },
  {
    id: "miranee-1",
    name: "MIRANEE",
    price: 1500,
    discountPercent: 0,
    image: "/miranee-1.png",
    scent: "Soft, Musky, Floral",
    category: "New Category",
    isNew: true,
  },
  {
    id: "braven-1-1",
    name: "BRAVEN",
    price: 1500,
    discountPercent: 0,
    image: "/braven-1-1.png",
    scent: "Bold, Woody, Spicy",
    category: "New Category",
    isNew: true,
  },
  {
    id: "evelle-4",
    name: "EVELLE",
    price: 1500,
    discountPercent: 0,
    image: "/evelle-4.jpg.jpeg",
    scent: "Elegant, Floral, Smooth",
    category: "New Category",
    isNew: true,
  },
];

const orders = [];
const tokenToUserId = new Map();
const magicLinkTokens = new Map();
const SELLER_EMAIL = process.env.SELLER_EMAIL || "abdurrafayfarhan3@gmail.com";

function normalizeDiscount(value) {
  const parsed = Number(value || 0);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(90, Math.max(0, parsed));
}

function isValidAddress(address) {
  if (!address || typeof address !== "object") return false;
  const requiredKeys = ["fullName", "phone", "addressLine", "city", "state", "zipCode", "country"];
  return requiredKeys.every((key) => String(address[key] || "").trim().length > 0);
}

function formatPKR(value) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

async function notifySellerByEmail(order, buyer) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || typeof fetch === "undefined") {
    throw new Error("Seller email is not configured. Set RESEND_API_KEY to enable order emails.");
  }

  const itemLines = order.items
    .map((item) => `- ${item.name} x${item.quantity} (${formatPKR(item.price)})`)
    .join("\n");
  const address = order.shippingAddress || {};
  const buyerPhone = address.phone || "N/A";
  const text = [
    `New Order Received: ${order.id}`,
    `Buyer Email: ${buyer.email}`,
    `Buyer Name: ${buyer.name}`,
    `Buyer Phone: ${buyerPhone}`,
    `Total: ${formatPKR(order.total)}`,
    `Order Date: ${new Date(order.createdAt).toLocaleString("en-PK")}`,
    "",
    "Shipping Address:",
    `${address.fullName || ""}`,
    `${address.phone || ""}`,
    `${address.addressLine || ""}`,
    `${address.city || ""}, ${address.state || ""}, ${address.zipCode || ""}`,
    `${address.country || ""}`,
    "",
    "Items:",
    itemLines,
  ].join("\n");
  const rows = order.items
    .map(
      (item) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;">${item.name}</td><td style="padding:8px;border:1px solid #ddd;">${item.quantity}</td><td style="padding:8px;border:1px solid #ddd;">${formatPKR(item.price)}</td></tr>`,
    )
    .join("");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;">
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString("en-PK")}</p>
      <p><strong>Buyer Name:</strong> ${buyer.name}</p>
      <p><strong>Buyer Email:</strong> ${buyer.email}</p>
      <p><strong>Buyer Phone:</strong> ${buyerPhone}</p>
      <p><strong>Total:</strong> ${formatPKR(order.total)}</p>
      <h3>Shipping Address</h3>
      <p>${address.fullName || ""}<br/>${address.phone || ""}<br/>${address.addressLine || ""}<br/>${address.city || ""}, ${address.state || ""}, ${address.zipCode || ""}<br/>${address.country || ""}</p>
      <h3>Items</h3>
      <table style="border-collapse:collapse;width:100%;">
        <thead>
          <tr>
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Product</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Qty</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Unit Price</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: [SELLER_EMAIL],
      subject: `New Order ${order.id} - ${buyer.email}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Order email failed: ${errText}`);
  }

  const providerData = await response.json();
  return { sent: true, provider: "resend", id: providerData?.id || null };
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function getUserFromAuthHeader(req) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7).trim();
  const userId = tokenToUserId.get(token);
  if (!userId) return null;
  return users.find((u) => u.id === userId) || null;
}

function requireAuth(req, res) {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    sendJson(res, 401, { message: "Unauthorized" });
    return null;
  }
  return user;
}

function requireAdmin(req, res) {
  const user = requireAuth(req, res);
  if (!user) return null;
  if (user.role !== "admin") {
    sendJson(res, 403, { message: "Admin access required" });
    return null;
  }
  return user;
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      });
      res.end();
      return;
    }

    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const path = url.pathname;

    if (path === `${API_PREFIX}/health` && req.method === "GET") {
      sendJson(res, 200, { ok: true, timestamp: new Date().toISOString() });
      return;
    }

    if (path === `${API_PREFIX}/auth/login` && req.method === "POST") {
      const body = await parseBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const user = users.find((u) => u.email.toLowerCase() === email && u.password === password);

      if (!user) {
        sendJson(res, 401, { message: "Invalid credentials" });
        return;
      }

      const token = randomUUID();
      tokenToUserId.set(token, user.id);
      sendJson(res, 200, {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
      return;
    }

    if (path === `${API_PREFIX}/auth/magic-link/request` && req.method === "POST") {
      const body = await parseBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      if (!email || !email.includes("@")) {
        sendJson(res, 400, { message: "Valid email is required" });
        return;
      }

      let user = users.find((u) => u.email.toLowerCase() === email);
      if (!user) {
        user = {
          id: `u_${randomUUID()}`,
          name: email.split("@")[0] || "Customer",
          email,
          password: "",
          role: "customer",
        };
        users.push(user);
      }

      const magicToken = randomUUID();
      const expiresAt = Date.now() + 15 * 60 * 1000;
      magicLinkTokens.set(magicToken, { userId: user.id, expiresAt });
      const authToken = randomUUID();
      tokenToUserId.set(authToken, user.id);

      const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";
      const magicLink = `${frontendBase}/login?token=${magicToken}`;
      console.log(`[Magic Link] ${email} -> ${magicLink}`);

      sendJson(res, 200, {
        message: "Email confirmed instantly",
        magicLink,
        token: authToken,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
      return;
    }

    if (path === `${API_PREFIX}/auth/magic-link/verify` && req.method === "POST") {
      const body = await parseBody(req);
      const magicToken = String(body.token || "").trim();
      const saved = magicLinkTokens.get(magicToken);
      if (!saved) {
        sendJson(res, 400, { message: "Invalid or expired magic link" });
        return;
      }
      if (Date.now() > saved.expiresAt) {
        magicLinkTokens.delete(magicToken);
        sendJson(res, 400, { message: "Magic link expired" });
        return;
      }

      const user = users.find((u) => u.id === saved.userId);
      if (!user) {
        magicLinkTokens.delete(magicToken);
        sendJson(res, 404, { message: "User not found" });
        return;
      }

      magicLinkTokens.delete(magicToken);
      const authToken = randomUUID();
      tokenToUserId.set(authToken, user.id);
      sendJson(res, 200, {
        token: authToken,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
      return;
    }

    if (path === `${API_PREFIX}/auth/me` && req.method === "GET") {
      const user = requireAuth(req, res);
      if (!user) return;
      sendJson(res, 200, { id: user.id, name: user.name, email: user.email, role: user.role });
      return;
    }

    if (path === `${API_PREFIX}/products` && req.method === "GET") {
      sendJson(res, 200, products);
      return;
    }

    if (path.startsWith(`${API_PREFIX}/products/`) && req.method === "GET") {
      const id = path.slice(`${API_PREFIX}/products/`.length);
      const product = products.find((p) => p.id === id);
      if (!product) {
        sendJson(res, 404, { message: "Product not found" });
        return;
      }
      sendJson(res, 200, product);
      return;
    }

    if (path === `${API_PREFIX}/products` && req.method === "POST") {
      const admin = requireAdmin(req, res);
      if (!admin) return;

      const body = await parseBody(req);
      const newProduct = {
        id: randomUUID(),
        name: String(body.name || "Unnamed Product"),
        price: Number(body.price || 0),
        discountPercent: normalizeDiscount(body.discountPercent),
        image: String(body.image || ""),
        scent: String(body.scent || ""),
        category: String(body.category || "General"),
        isNew: Boolean(body.isNew),
      };
      products.unshift(newProduct);
      sendJson(res, 201, newProduct);
      return;
    }

    if (path.startsWith(`${API_PREFIX}/products/`) && req.method === "PUT") {
      const admin = requireAdmin(req, res);
      if (!admin) return;
      const id = path.slice(`${API_PREFIX}/products/`.length);
      const index = products.findIndex((p) => p.id === id);
      if (index < 0) {
        sendJson(res, 404, { message: "Product not found" });
        return;
      }
      const body = await parseBody(req);
      const next = { ...products[index], ...body };
      if ("discountPercent" in body) {
        next.discountPercent = normalizeDiscount(body.discountPercent);
      }
      products[index] = next;
      sendJson(res, 200, products[index]);
      return;
    }

    if (path.startsWith(`${API_PREFIX}/products/`) && req.method === "DELETE") {
      const admin = requireAdmin(req, res);
      if (!admin) return;
      const id = path.slice(`${API_PREFIX}/products/`.length);
      const index = products.findIndex((p) => p.id === id);
      if (index < 0) {
        sendJson(res, 404, { message: "Product not found" });
        return;
      }
      const [removed] = products.splice(index, 1);
      sendJson(res, 200, removed);
      return;
    }

    if (path === `${API_PREFIX}/orders` && req.method === "GET") {
      const user = requireAuth(req, res);
      if (!user) return;
      const visibleOrders = user.role === "admin" ? orders : orders.filter((o) => o.userId === user.id);
      sendJson(res, 200, visibleOrders);
      return;
    }

    if (path === `${API_PREFIX}/orders` && req.method === "POST") {
      const user = requireAuth(req, res);
      if (!user) return;
      const body = await parseBody(req);
      const items = Array.isArray(body.items) ? body.items : [];
      if (!isValidAddress(body.shippingAddress)) {
        sendJson(res, 400, { message: "Shipping address is required before checkout" });
        return;
      }
      const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
      const order = {
        id: randomUUID(),
        userId: user.id,
        buyerEmail: user.email,
        items,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
        shippingAddress: body.shippingAddress,
      };
      orders.unshift(order);
      const emailDispatch = await notifySellerByEmail(order, user);
      order.emailDispatch = emailDispatch;
      sendJson(res, 201, order);
      return;
    }

    if (path.startsWith(`${API_PREFIX}/orders/`) && req.method === "PATCH") {
      const admin = requireAdmin(req, res);
      if (!admin) return;
      const orderId = path.slice(`${API_PREFIX}/orders/`.length);
      const order = orders.find((o) => o.id === orderId);
      if (!order) {
        sendJson(res, 404, { message: "Order not found" });
        return;
      }
      const body = await parseBody(req);
      order.status = String(body.status || order.status);
      sendJson(res, 200, order);
      return;
    }

    sendJson(res, 404, { message: "Route not found" });
  } catch (error) {
    sendJson(res, 500, { message: "Internal server error", error: String(error) });
  }
});

server.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}${API_PREFIX}`);
});
