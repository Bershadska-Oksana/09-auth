import { dehydrate, QueryClient } from "@tanstack/react-query";
import { serverGetNoteById } from "@/lib/api/serverApi";
import NotePreview from "./NotePreview.client";

type Props = { params: { id: string } };

export const dynamic = "force-dynamic";

export default async function ModalNotePage({ params }: Props) {
  const qc = new QueryClient();
  await qc.prefetchQuery(["note", params.id], async () => {
    return await serverGetNoteById(params.id);
  });

  const dehydrated = dehydrate(qc);

  return (
    <div>
      <NotePreview id={params.id} dehydratedState={dehydrated} />
    </div>
  );
}
