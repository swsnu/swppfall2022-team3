import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import style from "../constant/style";
import { selectUser, userActions } from "../store/slices/user";
import { blockUrl } from "../store/urls";


export interface IProps {
  title?: string;
  saveYPosition?: () => void;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const iconClassName = "h-8 w-8 mx-2";
const defaultTitle = "두근두근 캠퍼스";

export default function AppBar({
  title=defaultTitle,
  setIsModalOpen,
  saveYPosition,
}: IProps) {
  const pathName = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBackVisible, setIsBackVisible] = useState<boolean>(false);
  const [isUserVisible, setIsUserVisible] = useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [isMoreVisible, setIsMoreVisible] = useState<boolean>(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState<boolean>(false);
  const from = useSelector(selectUser).loginUser?.key;
  const to = useSelector(selectUser).interestingUser?.key;


  const backOnClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const settingOnClick = useCallback(() => {
    if (saveYPosition) {
      saveYPosition();
    }
    navigate("/setting");
  }, [navigate, saveYPosition]);

  const filterOnClick = useCallback(() => {
    if (setIsModalOpen !== undefined) {
      setIsModalOpen(true);
    }
  }, [setIsModalOpen]);

  const moreOnClick = useCallback(() => {
    setIsMoreModalOpen(true);
  }, [setIsMoreModalOpen]);

  const onMoreModalClose = useCallback(() => {
    setIsMoreModalOpen(false);
  }, [setIsMoreModalOpen]);

  const blockOnClick = useCallback(() => {
    setIsBlockModalOpen(true);
  },[setIsBlockModalOpen]);

  const confirmBlockOnClick = useCallback(async() => {
    await axios.post(`${blockUrl}`, { from: from, to: to });
    if(to){
      dispatch(userActions.deleteUser(to));
    }
    setIsBlockModalOpen(false);
    setIsMoreModalOpen(false);
    navigate(-1);
  }, [from, to, dispatch, navigate, setIsBlockModalOpen]);

  const cansleBlockOnClick = useCallback(() => {
    setIsBlockModalOpen(false);
    setIsMoreModalOpen(false);
  }, [setIsBlockModalOpen]);

  useEffect(() => {
    const shouldBackVisible: boolean =
      /^\/profile$/.test(pathName) ||
      /^\/chat\/.+$/.test(pathName) ||
      /^\/setting\/?$/.test(pathName) ||
      /^\/profile\/edit\/?$/.test(pathName);
    setIsBackVisible(shouldBackVisible);
  }, [setIsBackVisible, pathName]);

  useEffect(() => {
    const shouldUserVisible: boolean =
      /^\/pitapat\/?$/.test(pathName) ||
      /^\/chat\/?$/.test(pathName);
    setIsUserVisible(shouldUserVisible);
  }, [setIsUserVisible, pathName]);

  useEffect(() => {
    const shouldFilterVisible = /^\/search\/?$/.test(pathName);
    setIsFilterVisible(shouldFilterVisible);
  }, [setIsFilterVisible, pathName]);

  useEffect(() => {
    const shouldMoreVisible = /^\/profile\/?$/.test(pathName);
    setIsMoreVisible(shouldMoreVisible);
  }, [setIsMoreVisible, pathName]);

  return (
    <section className={"w-full z-20 flex justify-center p-2 fixed top-0 bg-white border-b-2 border-b-pink-300 z-10"}>
      <Modal
        className={"flex justify-end"}
        open={isMoreModalOpen}
        onClose={onMoreModalClose}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
          className={"place-items-end mt-12 w-3/5 max-w-xs h-12"}
        >
          <article
            className={"flex items-center h-12 border-b-4 border-b-gray-300 pl-2 text-left text-lg"}
            role={"presentation"}
            onClick={blockOnClick}
          >
            유저 차단
          </article>
        </Box>
      </Modal>
      <Modal
        className={"flex justify-center"}
        open={isBlockModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
          className={"items-center rounded-md text-center mt-72 w-4/5 max-w-xs h-48"}
        >
          <section className={"h-32"}>
            <Typography
              className={"text-pink-500 font-semibold"}
              id="modal-modal-title"
              variant="h6"
            >
              경고: 다시는 유저의<br />
              프로필을 확인할 수 없습니다.
            </Typography>
            <Typography
              className={"text-pink-400"}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              해당 유저를<br />
              차단하시겠습니까?<br />
            </Typography>
          </section>
          <section className={"flex flex-row justify-center mt-2"}>
            <button
              className={`w-24 mr-4 min-h-8 h-8 rounded-md text-center shadow ${style.button.colorSet.main}`}
              onClick={confirmBlockOnClick}
            >
            확인
            </button>
            <button
              className={`w-24 min-h-8 h-8 rounded-md text-center shadow ${style.button.colorSet.secondary}`}
              onClick={cansleBlockOnClick}
            >
            취소
            </button>
          </section>
        </Box>
      </Modal>
      {
        isBackVisible ?
          <ArrowUturnLeftIcon
            className={iconClassName}
            onClick={backOnClick}
          /> :
          <div className={iconClassName}/>
      }
      <section className={"flex-auto flex justify-center"}>
        <div
          className={`flex-none text-center m-auto text-lg font-bold ${title === defaultTitle ? "text-pink-500" : "text-black"}`}>{title}</div>
      </section>
      {
        isUserVisible ?
          <UserCircleIcon
            className={iconClassName}
            onClick={settingOnClick}
          /> :
          isFilterVisible ?
            <button
              className={iconClassName}
              onClick={filterOnClick}
            >
              <TuneOutlinedIcon fontSize="large" />
            </button>
            :
            isMoreVisible ?
              <MoreHorizIcon
                className={iconClassName}
                fontSize="large"
                onClick={moreOnClick}
              /> :
              <div className={iconClassName}/>
      }
    </section>
  );
}
