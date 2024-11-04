"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Page() {
  const [noteText, setNoteText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    const fetchNote = async () => {
      const supabase = createClient();
      const { data: note, error } = await supabase
        .from("notes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching note:", error.message);
        router.push("/notes");
        return;
      }

      if (note) {
        setNoteText(note.text); // Assuming 'note' column has the text of the note
      }
      setLoading(false);
    };

    if (id) fetchNote();
    console.log(noteText);
  }, [id]);

  const editNote = async () => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteText }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        router.push("/notes"); // Success message
      } else {
        const errorData = await response.json();
        console.error("Error editing note:", errorData.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>Editing note with id: {id}</div>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button onClick={editNote}>Edit note</button>
    </>
  );
}
