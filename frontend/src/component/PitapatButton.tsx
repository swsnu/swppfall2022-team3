import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../store";
import { selectUser, userActions } from "../store/slices/user";
import { pitapatUrl } from "../store/urls";
import { PitapatStatus } from "../types";


interface IProps {
  from: number;
  to: number;
  isAccept: boolean;
  isListView: boolean;
}

export default function PitapatButton({
  from,
  to,
  isAccept,
  isListView,
}: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const senders = useSelector(selectUser).pitapat.senders;
  const receivers = useSelector(selectUser).pitapat.receivers;

  const getPitapatStatus = useCallback((): PitapatStatus => {
    if (
      (!loginUser) ||
      ((loginUser.key !== from) && (loginUser.key !== to))
    ) {
      return PitapatStatus.NONE;
    }
    else if (loginUser.key === from) {
      const receiverKeys: number[] = receivers.map((u) => u.key);
      if (receiverKeys.indexOf(to) >= 0) {
        return PitapatStatus.FROM_ME;
      }
      else {
        return PitapatStatus.NONE;
      }
    }
    else {
      const senderKeys: number[] = senders.map((u) => u.key);
      if (senderKeys.indexOf(from) >= 0) {
        return PitapatStatus.TO_ME;
      }
      else {
        return PitapatStatus.NONE;
      }
    }
  }, [loginUser, senders, receivers, to, from]);

  const getIconText = useCallback(() => {
    if (!isAccept) {
      return "X";
    }
    else if (loginUser?.key === to) {
      return "♥";
    }
    else {
      return "♡";
    }
  }, [isAccept, loginUser, to]);

  const getButtonText = useCallback(() => {
    if (!isAccept) {
      return "거절";
    }
    switch (getPitapatStatus()) {
    case PitapatStatus.NONE:
      return "두근";
    case PitapatStatus.TO_ME:
      return "수락";
    case PitapatStatus.FROM_ME:
      return "취소";
    }
  }, [isAccept, getPitapatStatus]);

  const pitapatOnClick = useCallback(async () => {
    if (!loginUser) { return; }

    if (!isAccept) {
      await axios.delete(`${pitapatUrl}`, { data: { from: to, to: from } });
      dispatch(userActions.deleteSender(to));
    }
    else if (getPitapatStatus() === PitapatStatus.FROM_ME) {
      await axios.delete(`${pitapatUrl}`, { data: { from: from, to: to } });
      dispatch(userActions.deleteReceiver(to));
    }
    else {
      await axios.post(`${pitapatUrl}/`, { from: from, to: to });
      dispatch(userActions.deleteSender(to));
    }
  }, [loginUser, isAccept, from, to, getPitapatStatus, dispatch]);

  return (
    <button
      className={`${isListView ? "flex-none" : "absolute right-4"} w-16 h-8 z-10 bg-white rounded-lg border ${isAccept ? "border-pink-600" : "border-blue-600"} flex items-center justify-center`}
      onClick={pitapatOnClick}
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
