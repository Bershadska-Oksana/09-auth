"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./CreateNotePage.module.css";
import { createNote } from "@/lib/api/notes";

const CreateNotePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await createNote({ title, content, tag });
      router.push("/notes"); // після успішного створення повертає на список нотаток
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.main}>
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <label>
          Tag
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </label>

        {error && <p className={css.error}>{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Note"}
        </button>
      </form>
    </main>
  );
};

export default CreateNotePage;
