import { serverGetNotes } from "@/lib/api/serverApi";

export default async function FilteredNotesPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const notes = await serverFetchNotes();
  return (
    <main style={{ padding: 20 }}>
      <h1>Notes</h1>
      <p>Notes count: {Array.isArray(notes) ? notes.length : 0}</p>
    </main>
  );
}
