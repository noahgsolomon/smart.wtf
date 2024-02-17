export default function ChapterDivider({
  chapter,
  title,
}: {
  chapter: number;
  title: string;
}) {
  return (
    <div className="pb-2">
      <p className="text-lg text-primary/60">Chapter {chapter}</p>
      <h4>{title}</h4>
    </div>
  );
}
