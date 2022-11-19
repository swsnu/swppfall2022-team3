import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { selectUser } from "../store/slices/user";
import { PitapatStatus } from "../types";


interface IProps {
  from: number;
  to: number;
  pitapatStatus: PitapatStatus;
  isAccept: boolean;
  isListView: boolean;
}

export default function PitapatButton({
  from,
  to,
  pitapatStatus,
  isAccept,
  isListView,
}: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;

  const isPitapatAlreadysent = useCallback(() => {
    if (!loginUser) {
      return false;
    }
    return false;
  }, [loginUser, to]);

  const getIconText = useCallback(() => {
    if (!isAccept) {
      return "X";
    }
    return isPitapatAlreadysent() ? "♥" : "♡";
  }, [isAccept, isPitapatAlreadysent]);

  const getButtonText = useCallback(() => {
    if (!isAccept) {
      return "거절";
    }
    switch (pitapatStatus) {
    case PitapatStatus.NONE:
      return "두근";
    case PitapatStatus.RECEIVED:
      return "수락";
    case PitapatStatus.SENT:
      return "취소";
    case PitapatStatus.MATCHED:
      return "매칭";
    }
  }, [isAccept, pitapatStatus]);

  const pitapatOnClick = useCallback(() => {
    /*
    if (isAccept) {
    }
    else {
    }
    */
  }, [dispatch, isAccept, from, to]);

  return (
    <button
      className={`${isListView ? "flex-none" : "absolute right-4"} w-16 h-8 z-10 bg-white rounded-lg border ${isAccept ? "border-pink-600" : "border-blue-600"} flex items-center justify-center`}
      onClick={pitapatOnClick}
      disabled={pitapatStatus === PitapatStatus.MATCHED}
    >
      <div className={`flex-none mx-0.5 font-bold ${isAccept ? "text-pink-600" : "text-blue-600"}`}>
        {getIconText()}
      </div>
      <div className={`flex-none text-sm mx-1.5 font-bold ${isAccept ? "text-pink-600" : "text-blue-600"}`}>
        {getButtonText()}
      </div>
    </button>
  );
}
