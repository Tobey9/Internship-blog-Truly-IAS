"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./page.module.css";
import DashboardNavbar from "@/components/dashboard/Navbar";
import DashboardLeft from "@/components/dashboard/LeftSide";
import PostList from "@/components/dashboard/PostList";
import CreatePost from "@/components/dashboard/CreatePostForm";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div>
      <DashboardNavbar />
      <div className={style.content}>
        <DashboardLeft />
        <CreatePost onPostCreated={handlePostCreated} />
        <PostList posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
}
