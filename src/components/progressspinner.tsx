export default function ProgressSpinner({
  progress = 0,
}: {
  progress: number;
}) {
  // Ensure progress is between 0 and 100
  const strokePercent = Math.min(Math.max(progress, 0), 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (strokePercent / 100) * circumference;

  return (
    <svg fill="none" height="32" width="32" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="10"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-secondary"
      />
      <circle
        className={`progress-circle ${
          progress === 100 ? "stroke-success" : "stroke-blue"
        }`}
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        x="50"
        y="50"
        className="fill-primary text-3xl opacity-60"
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {strokePercent.toFixed(0)}%
      </text>
    </svg>
  );
}
