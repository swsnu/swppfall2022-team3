import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { pitapatAction, selectPitapat } from "../store/slices/pitapat";
import { PitapatStatus } from "../types";


interface IProps {
  from: number;
  to: number;
  status: PitapatStatus;
  isListView: boolean;
};

export default function PitapatButton({
  from,
  to,
  status,
  isListView,
}: IProps) {
  const myKey = 1;
  const dispatch = useDispatch<AppDispatch>();
  const pitapats = useSelector(selectPitapat).pitapats;

  function isPitapatAlreadySended() {
    return pitapats.filter((p) => p.from === myKey).filter((p) => p.to === to).length !== 0;
  }

  return (
    <button
      className={isListView ? "flex-none w-16 h-8 z-10 bg-white rounded-lg border border-pink-600 flex items-center justify-center"
        : "absolute right-4 w-16 h-8 z-10 bg-white rounded-lg border border-pink-600 flex items-center justify-center"}
      onClick={() => dispatch(pitapatAction.toggle({
        from: from,
        to: to,
      }))}
    >
      <div className={"flex-none mx-0.5 font-bold text-pink-600"}>
        {isPitapatAlreadySended() ? "♥" : "♡"}
      </div>
      <div className={"flex-none text-sm mx-1.5 font-bold text-pink-600"}>
        {
          (status === PitapatStatus.NONE) ? "두근" :
          (status === PitapatStatus.RECEIVED) ? "수락" :
          (status === PitapatStatus.SENT) ? "취소" :
          "매칭"
        }
      </div>
    </button>
  );
}
