import { verifyAuth } from "@/lib/authVerify";
import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import { sanitize } from "@/lib/sanitizeHtml";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    const post = await Post.findOne({ slug: params.slug });

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = verifyAuth(request);
    if (!user.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDB();

    const post = await Post.findOneAndDelete({ slug: params.slug });

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete post" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const user = verifyAuth(req);
    if (!user.isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { slug } = params;
    const { title, content, image } = await req.json();

    if (!title || !content) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDB();

    const updated = await Post.findOneAndUpdate(
      { slug },
      {
        title,
        content: sanitize(content),
        image,
      },
      { new: true }
    );

    if (!updated) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PUT /api/posts/[slug] error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
