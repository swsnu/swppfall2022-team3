import React, { Dispatch, ReactElement, SetStateAction, useCallback } from "react";
import { Modal, Box, Typography } from "@mui/material";
import style from "../../constant/style";


export interface IProps {
  description: ReactElement;
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
      <Box
        sx={style}
        className={"items-center rounded-md text-center mt-72 w-3/5 max-w-xs h-40"}
      >
        <section className={"h-24"}>
          <Typography
            className={"text-pink-400"}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {description}
          </Typography>
        </section>
        <button
          className={`w-36 min-h-8 h-8 rounded-md text-center shadow ${style.button.colorSet.main}`}
          onClick={handleClose}
        >
          확인
        </button>
      </Box>
    </Modal>
  );
}
