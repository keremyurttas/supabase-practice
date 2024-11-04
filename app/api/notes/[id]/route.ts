import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(req: Request, { params }) {
  const supabase = createClient();
  const { id } = params; // Get the note ID from the URL
  const { noteText } = await req.json();
  if (!noteText || noteText.trim() === "") {
    return NextResponse.json(
      { error: "Note content cannot be empty" },
      { status: 400 }
    );
  }

  const { error } = await (await supabase)
    .from("notes")
    .update({ text: noteText })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Note updated successfully" },
    { status: 200 }
  );
}
