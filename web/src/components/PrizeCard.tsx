import { Prize } from "../constants";

interface PrizeCardProps {
  prize: Prize;
}
export function PrizeCard({ prize }: PrizeCardProps) {
  return (
    <div
      id="prize-card"
      className="cursor-pointer transition duration-200 bg-lightOrange text-gray-800 shadow rounded-md flex px-6 py-4 gap-3 items-center"
    >
      <p className="font-heading text-purple text-lg">#{prize.position}</p>
      <img className="w-8 h-8" src={prize.prizeIcon} alt="prize icon" />
      <p>{prize.prizeText}</p>
    </div>
  );
}
