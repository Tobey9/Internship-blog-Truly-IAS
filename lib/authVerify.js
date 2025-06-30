// lib/authVerify.js
import jwt from "jsonwebtoken";

export function verifyAuth(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // return user info like { id, username, isAdmin }
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
