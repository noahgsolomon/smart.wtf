import { api } from "@/trpc/server";
import NotesCard from "./notescard";
import AddNote from "./addnote";

const Notes = async () => {
  const notes = (await api.notes.getUserNotes.query()).notes;

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <h1>Notes</h1>
        <div>|</div>
        <AddNote />
      </div>

      <div className="flex flex-wrap gap-8 py-4">
        {notes.map((note) => {
          return <NotesCard note={note} key={note.id} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
