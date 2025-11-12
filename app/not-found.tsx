import type { Metadata } from "next";
import Link from "next/link";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found — NoteHub",
  description: "The page you are looking for does not exist in NoteHub.",
  openGraph: {
    title: "Page not found — NoteHub",
    description: "The page you are looking for does not exist in NoteHub.",
    url: "https://your-vercel-app.vercel.app/not-found",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 — Page not found</h1>
        <p className={css.text}>
          Sorry, this page does not exist. You can go back to the{" "}
          <Link href="/">home page</Link>.
        </p>
      </div>
    </main>
  );
}
