"use client";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setUsername(me.username);
        setEmail(me.email);
      } catch {}
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMe({ username });
      router.push("/profile");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <img
          src="https://ac.goit.global/default-avatar.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>Email: {email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
