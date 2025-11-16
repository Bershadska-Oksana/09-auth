"use client";
import { useState } from "react";
import { login, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    try {
      await login(email, password);
      const me = await getMe();
      setUser(me);
      router.push("/profile");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={css.input}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={css.input}
            required
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
