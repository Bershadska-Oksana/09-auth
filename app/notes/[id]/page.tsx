import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id).catch(() => null);
  const title = note ? `${note.title} — NoteHub` : "Note details — NoteHub";
  const description = note ? note.content.slice(0, 160) : "Note details page";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-vercel-app.vercel.app/notes/${params.id}`,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
}

const NotePage = async ({ params }: Props) => {
  return <NoteDetailsClient id={params.id} />;
};

export default NotePage;
