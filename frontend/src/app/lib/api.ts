export interface Product {
  id: string;
  name: string;
  price: number;
  discountPercent?: number;
  image: string;
  scent: string;
  category: string;
  isNew?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  buyerEmail?: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  shippingAddress?: ShippingAddress;
}

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:4000/api"
    : "https://ar-perfumers.onrender.com/api");
const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthSession(token: string, user: User) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const errorData = (await response.json()) as { message?: string };
      if (errorData.message) message = errorData.message;
    } catch {
      // no-op
    }
    if (response.status === 401) {
      clearAuthSession();
      throw new Error("Session expired. Please login again.");
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string) {
  return request<{ token: string; user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function requestMagicLink(email: string) {
  return request<{ message: string; magicLink?: string; token?: string; user?: User }>("/auth/magic-link/request", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyMagicLink(token: string) {
  return request<{ token: string; user: User }>("/auth/magic-link/verify", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function getProducts() {
  return request<Product[]>("/products");
}

export async function getProductById(id: string) {
  return request<Product>(`/products/${id}`);
}

export async function createProduct(payload: Omit<Product, "id">) {
  return request<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteProduct(id: string) {
  return request<Product>(`/products/${id}`, { method: "DELETE" });
}

export async function updateProduct(id: string, payload: Partial<Omit<Product, "id">>) {
  return request<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function getOrders() {
  return request<Order[]>("/orders");
}

export async function createOrder(items: OrderItem[], shippingAddress?: ShippingAddress) {
  return request<Order>("/orders", {
    method: "POST",
    body: JSON.stringify({ items, shippingAddress }),
  });
}

export async function updateOrderStatus(id: string, status: string) {
  return request<Order>(`/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
