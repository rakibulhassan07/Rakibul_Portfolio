import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "rakib07_admin";

const getPassword = () => {
  const password = process.env.BLOG_ADMIN_PASSWORD;
  if (!password) {
    throw new Error("Missing BLOG_ADMIN_PASSWORD environment variable.");
  }
  return password;
};

export const getAdminToken = () => {
  const password = getPassword();
  return crypto.createHash("sha256").update(`rakib07:${password}`).digest("hex");
};

export const isValidAdminToken = (token?: string | null) => {
  if (!token) return false;
  return token === getAdminToken();
};

export const isValidPassword = (password: string) => {
  return password === getPassword();
};
