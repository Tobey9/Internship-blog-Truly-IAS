import { verifyAuth } from "@/lib/authVerify";
import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import slugify from "slugify";
import { sanitize } from "@/lib/sanitizeHtml";

export async function GET() {
  try {
    await connectToDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return Response.json(posts);
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const user = verifyAuth(req);

    if (!user.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, content, image } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cleanContent = sanitize(content);

    await connectToDB();

    const slug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists
    const existing = await Post.findOne({ slug });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "Post with this title already exists." }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const newPost = new Post({
      title,
      content: cleanContent,
      slug,
      image,
      // optional
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(JSON.stringify({ error: "Failed to create post." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
