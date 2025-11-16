import { serverGetNoteById } from "@/lib/api/serverApi";

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await serverFetchNoteById(params.id);
  return (
    <main style={{ padding: 20 }}>
      <h1>{note?.title || "Note"}</h1>
      <p>{note?.content}</p>
    </main>
  );
}
