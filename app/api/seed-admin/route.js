import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectToDB();

  // Check if admin already exists
  const existing = await User.findOne({ username: "Toby" });
  if (existing) {
    return Response.json({ message: "Admin already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash("toby123", 10);

  // Create the user
  const newUser = new User({
    username: "Toby",
    password: hashedPassword,
  });

  await newUser.save();

  return Response.json({ message: "Admin user created successfully" });
}
