import React from "react";
import css from "./profile.module.css";
import Image from "next/image";
import { serverGetMe } from "@/lib/api/serverApi";

export const metadata = {
  title: "Profile — NoteHub",
  description: "User profile",
};

type Props = { searchParams?: any };

export default async function ProfilePage() {
  
  try {
    
    const me = await serverGetMe(); 
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <a href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </a>
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
  } catch (error) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p>Unable to load profile. Please sign in again.</p>
        </div>
      </main>
    );
  }
}
