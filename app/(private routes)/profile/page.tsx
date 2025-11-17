// app/(private routes)/profile/page.tsx
import React from "react";
import css from "./profile.module.css";
import Image from "next/image";
import { serverGetMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile — NoteHub",
  description: "User profile",
};

export default async function ProfilePage() {
  const me = await serverGetMe();

  if (!me) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p>Please sign in.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={me.avatar || "https://ac.goit.global/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {me.username}</p>
          <p>Email: {me.email}</p>
        </div>
      </div>
    </main>
  );
}
