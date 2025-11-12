import NotesClient from "./Notes.client";
import { NOTES_FILTER_ALL } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug ?? [];
  const tag = slug[0] === NOTES_FILTER_ALL ? "All" : (slug[0] ?? "All");
  const title = `Notes: ${tag} — NoteHub`;
  const description = `Notes filtered by ${tag} on NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-vercel-app.vercel.app/notes/filter/${tag}`,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
}

const NotesPage = ({ params }: Props) => {
  const slug = params.slug ?? [];
  const tag = slug[0] === NOTES_FILTER_ALL ? undefined : slug[0];
  return <NotesClient tag={tag} key={tag} />;
};

export default NotesPage;
