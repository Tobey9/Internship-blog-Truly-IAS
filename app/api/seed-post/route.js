import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import slugify from "slugify";

export async function GET() {
  await connectToDB();

  const title = "Welcome to My First Blog Post";
  const content = "<p>This is the <strong>first post</strong> on my blog!</p>";
  const slug = slugify(title, { lower: true, strict: true });
  const image =
    "https://images.unsplash.com/photo-1509909756405-be0199881695?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const existing = await Post.findOne({ slug });
  if (existing) {
    return Response.json({ message: "Post already exists" });
  }

  const post = new Post({ title, content, slug, image });
  await post.save();

  return Response.json({ message: "Dummy post created", post });
}
