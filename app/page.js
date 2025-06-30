import Image from "next/image";
import style from "./page.module.css";
import Subscribe from "@/components/Subscribe";
import Link from "next/link";
import SafeHTML from "@/components/SafeHTML";

async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

export const metadata = {
  title: "My Blog",
  description: "Read insightful articles and updates by Toby.",
};

export default async function mainPage() {
  const posts = await getPosts();

  return (
    <>
      <header className={style.header}>
        <div className={style.headerText}>
          <h1>My Blog</h1>
        </div>
        <div className={style.headerImage}>
          <Image
            src="/welcome.jpg"
            alt="Welcome Image"
            width={800}
            height={400}
          />
        </div>
      </header>

      <div className={style.body}>
        <div className={style.left}>
          <div className={style.posts}>
            {posts.map((post) => (
              <Link
                href={`/post/${post.slug}`}
                key={post._id}
                className={style.postLink}
              >
                <div className={style.post}>
                  <div className={style.postImage}>
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={300}
                        height={200}
                      />
                    )}
                  </div>
                  <div className={style.content}>
                    <h2>{post.title}</h2>
                    <SafeHTML
                      html={post.content.slice(0, 200) + "..."}
                      className={style.excerpt}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Subscribe />
      </div>
    </>
  );
}
