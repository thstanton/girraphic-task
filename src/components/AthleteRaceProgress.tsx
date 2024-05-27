interface AthleteRaceProgressProps {
  raceprogress: string;
}

export default function AthleteRaceProgress({
  raceprogress,
}: AthleteRaceProgressProps) {
  return (
    <span
      className={
        "rounded-full px-2 py-1 text-sm capitalize text-slate-50" +
        ` ${
          raceprogress === "completed"
            ? "bg-green-500"
            : raceprogress === "running"
              ? "bg-yellow-500"
              : "bg-red-500"
        }`
      }
    >
      {raceprogress}
    </span>
  );
}
