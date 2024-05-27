interface AthleteBibProps {
  bibnumber: string;
}

export default function AthleteBib({ bibnumber }: AthleteBibProps) {
  return (
    <div className="mx-auto w-12 rounded-full bg-slate-50 px-2 text-center font-bold text-slate-950">
      {bibnumber}
    </div>
  );
}
