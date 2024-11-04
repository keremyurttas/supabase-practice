import { createClient } from "@/utils/supabase/server";
import Note from "@/components/note";
import Insert from "@/components/insert-note";
export default async function Notes() {
  //   const [note, setNote] = useState("");

  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  console.log(notes);
  return (
    <>
      {notes?.map((note) => <Note note={note} key={note.index} />)}
      <Insert />
    </>
  );
}
