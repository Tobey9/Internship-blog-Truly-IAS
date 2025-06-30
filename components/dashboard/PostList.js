"use client";

import styles from "./postList.module.css"; // optional for styling
import Link from "next/link";
import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PostList({ posts, setPosts }) {
  const handleDelete = async (slug) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const res = await fetch(`${baseURL}/api/posts/${slug}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts(posts.filter((post) => post.slug !== slug));
    } else {
      alert("Failed to delete post");
    }
  };

  return (
    <div className={styles.postList}>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id} className={styles.item}>
            <Link href={`/post/${post.slug}`}>
              <strong>{post.title}</strong>
            </Link>
            <div className={styles.actions}>
              <Link href={`/dashboard/edit/${post.slug}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(post.slug)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
