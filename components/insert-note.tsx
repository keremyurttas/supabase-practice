"use client";
import { useState } from "react";

export default function Insert() {
  const [note, setNote] = useState<string>("");

  const insertNote = async () => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }), // Send the note in the body of the request
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Success message
      } else {
        const errorData = await response.json();
        console.error("Error inserting note:", errorData.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a new note"
      />
      <button onClick={insertNote}>Insert Note</button>
    </div>
  );
}
