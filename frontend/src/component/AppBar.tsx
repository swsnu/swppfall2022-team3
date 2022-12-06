import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";


export interface IProps {
  title?: string;
  // saveYPosition?: () => void;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const iconClassName = "h-8 w-8 mx-2";
const defaultTitle = "두근두근 캠퍼스";

export default function AppBar({
  title=defaultTitle,
  setIsModalOpen,
  // saveYPosition,
}: IProps) {
  const pathName = window.location.pathname;
  const navigate = useNavigate();
  const [isBackVisible, setIsBackVisible] = useState<boolean>(false);
  const [isUserVisible, setIsUserVisible] = useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const backOnClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const settingOnClick = useCallback(() => {
    // if (saveYPosition) {
    //   saveYPosition();
    // }
    navigate("/setting");
  }, [navigate]);

  const filterOnClick = useCallback(() => {
    if (setIsModalOpen !== undefined) {
      setIsModalOpen(true);
    }
  }, [setIsModalOpen]);

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

  return (
    <section className={"w-full z-20 flex justify-center p-2 fixed top-0 bg-white border-b-2 border-b-pink-300 z-10"}>
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
            : <div className={iconClassName}/>
      }
    </section>
  );
}
