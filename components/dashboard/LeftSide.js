"use client";

import { useRouter } from "next/navigation";
import style from "./LeftSide.module.css";
import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function DashboardLeft() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${baseURL}/api/logout`, {
      method: "POST",
    });

    router.push("/login"); // Redirect to login or homepage
  };

  return (
    <div className={style.leftSide}>
      <div>
        <h3>
          <Link href="/dashboard">Dashboard</Link>
        </h3>
      </div>
      <div>
        <h3>
          <Link href="/">Home</Link>
        </h3>
      </div>

      <div>
        <h3 onClick={handleLogout}>Logout</h3>
      </div>
    </div>
  );
}
