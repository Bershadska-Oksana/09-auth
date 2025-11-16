"use client";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

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

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMe({ username });
      router.push("/profile");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Edit Profile</h1>
      <form onSubmit={onSave}>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <p>Email: {email}</p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </form>
    </main>
  );
}
