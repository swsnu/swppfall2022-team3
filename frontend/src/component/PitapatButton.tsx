interface IProps {
  onClick: () => void;
};

export function PitapatButton({
  onClick,
}: IProps) {
  return (
    <button
      className={"absolute w-20 h-8 bottom-4 right-4 z-10 bg-white rounded-lg border border-pink-600 flex items-center justify-center"}
      onClick={onClick}
    >
      <div className={"flex-none mx-0.5 font-bold text-pink-600"}>♡</div>
      <div className={"flex-none mx-1.5 font-bold text-pink-600"}>두근</div>
    </button>
  );
}
