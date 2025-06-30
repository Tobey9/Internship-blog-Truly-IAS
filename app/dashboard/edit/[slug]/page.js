"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import style from "./page.module.css";

import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

export default function EditPostPage() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the post by slug
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        const data = await res.json();
        setTitle(data.title);
        setImage(data.image || "");
        setContent(data.content || "");
        setLoading(false);
      } catch (err) {
        console.error("Failed to load post", err);
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image, content }),
    });

    if (res.ok) {
      alert("Post updated!");
      router.push("/dashboard");
    } else {
      alert("Failed to update post");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={style.editPost}>
      <form onSubmit={handleSubmit}>
        <h2>Edit Post</h2>
        <label htmlFor="">Title</label>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="">Cover Image</label>
        <input
          type="text"
          placeholder="Cover Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <TextEditor key={slug} onChange={setContent} initialContent={content} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
