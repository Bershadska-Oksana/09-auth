"use client";

import React from "react";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout as apiLogout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated, setUser } =
    useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
    } finally {
      clearIsAuthenticated();
      setUser(null);
      router.push("/sign-in");
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <a href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </a>
        </li>

        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <a href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </a>
      </li>

      <li className={css.navigationItem}>
        <a href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </a>
      </li>
    </>
  );
}
