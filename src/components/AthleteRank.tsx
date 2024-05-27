interface AthleteRankProps {
  rank: number;
}

export default function AthleteRank({ rank }: AthleteRankProps) {
  return (
    <div>
      <span className="text-2xl">
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : ""}
      </span>{" "}
      {rank}
    </div>
  );
}
