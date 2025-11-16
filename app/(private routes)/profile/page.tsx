import { serverGetMe } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const me = await serverGetMe();

  return (
    <main style={{ padding: 20 }}>
      <h1>Profile</h1>
      {me ? (
        <>
          <Image
            src={me.avatar || "https://ac.goit.global/default-avatar.png"}
            alt="avatar"
            width={120}
            height={120}
          />
          <p>Username: {me.username}</p>
          <p>Email: {me.email}</p>
          <Link href="/profile/edit">Edit Profile</Link>
        </>
      ) : (
        <p>Please sign in</p>
      )}
    </main>
  );
}
