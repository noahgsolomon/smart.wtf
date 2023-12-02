import NotesCard from "./notescard";

const Notes = async () => {
  return (
    <div>
      <h1>Notes</h1>
      <div className="flex flex-wrap gap-8 py-4">
        <NotesCard
          note={{
            category: "MATH",
            description:
              "Representing the rate at which a function changes as one variable varies while keeping other variables constant.",
            id: 1,
            name: "Partial Derivatives",
            time: 8,
          }}
        />
      </div>
    </div>
  );
};

export default Notes;
