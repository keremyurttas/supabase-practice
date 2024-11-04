import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // Import your Supabase client

// Handler for POST requests to insert a new note
export async function POST(req: Request) {
  try {
    const { note } = await req.json(); // Parse the request body

    // Validate the note
    if (!note || note.trim() === "") {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient(); // Initialize Supabase client

    // Insert the new note into the 'notes' table
    const { error } = await supabase.from("notes").insert([{ text:note }]);

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Note inserted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error handling POST request:", err);
    return NextResponse.json(
      { error: "Failed to insert note" },
      { status: 500 }
    );
  }
}
