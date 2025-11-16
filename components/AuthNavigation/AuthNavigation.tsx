"use client";
import Link from "next/link";
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
    } catch {}
    clearIsAuthenticated();
    setUser(null);
    router.push("/sign-in");
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink}>
            Profile
          </Link>
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
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}
