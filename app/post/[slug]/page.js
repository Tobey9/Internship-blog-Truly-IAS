import Subscribe from "@/components/Subscribe";
import style from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import SafeHTML from "@/components/SafeHTML";

async function getPost(slug) {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return await res.json();
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "",
    openGraph: {
      title: post.title,
      description: post.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "",
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function postPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <div className={style.container}>
      <div className={style.post}>
        <h1>{post.title}</h1>
        <SafeHTML html={post.content} className={style.content} />
        <Image src={post.image} alt="Image" height={500} width={700} />
      </div>

      <Subscribe />
    </div>
  );
}
