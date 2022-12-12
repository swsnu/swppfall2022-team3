import React, { Dispatch, ReactElement, SetStateAction, useCallback } from "react";
import { Modal, Box } from "@mui/material";
import style from "../constant/style";


export interface IProps {
  description: ReactElement | string;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SignInModal({
  description,
  modalOpen,
  setModalOpen,
}: IProps) {
  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return (
    <Modal
      className={"flex justify-center"}
      open={modalOpen}
      style={{
        justifyContent: "center",
      }}
      aria-describedby="modal-modal-description"
    >
      <div className={"flex items-center w-3/5"}>
        <Box
          sx={style}
          className={"flex-auto flex flex-col items-center px-4 rounded-md text-center max-w-xs"}
        >
          <p className={"flex-auto h-fit mt-6 text-pink-400"}>
            {description}
          </p>
          <button
            className={`w-36 min-h-8 h-8 my-6 rounded-md text-center shadow ${style.button.colorSet.main}`}
            onClick={handleClose}
          >
          확인
          </button>
        </Box>
      </div>
    </Modal>
  );
}
