import Link from "next/link";
interface NoteProps {
  note: {
    id: string;
    text: string;
  };
}
export default function Note({ note }: NoteProps) {
  return <Link href={"/notes/" + note.id}>{note.text}</Link>;
}
