"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import styles from "./createPostForm.module.css";
const TextEditor = dynamic(() => import("../TextEditor"), { ssr: false });

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${baseURL}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image }),
    });

    if (res.ok) {
      const newPost = await res.json();
      onPostCreated?.(newPost);
      setTitle("");
      setContent("");
      setImage("");
      alert("Post created!");
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cover Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <TextEditor onChange={setContent} initialContent="" />

      <button type="submit">Publish</button>
    </form>
  );
}
