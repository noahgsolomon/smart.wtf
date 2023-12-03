import { api } from "@/trpc/server";
import NotesCard from "./notescard";

const Notes = async () => {
  const notes = (await api.notes.getUserNotes.query()).notes;

  console.log(
    "NOTTTTTTESSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSNOTTTTTTESSSSS",
    notes,
  );

  return (
    <div>
      <h1>Notes</h1>
      <div className="flex flex-wrap gap-8 py-4">
        {notes.map((note) => {
          return <NotesCard note={note} key={note.id} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
