import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";


interface IProps {
  title?: string,
}
const iconClassName = "h-8 w-8 mx-2";
const defaultTitle = "두근두근 캠퍼스";

export default function AppBar({ title = defaultTitle}: IProps) {
  const pathName = window.location.pathname;
  const navigate = useNavigate();
  const [isBackVisible, setIsBackVisible] = useState<boolean>(false);

  const backOnClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const settingOnClick = useCallback(() => {

  }, []);

  useEffect(() => {
    const shouldBAckVisible: boolean =
      (pathName.startsWith("/profile/")) ||
      (pathName.startsWith("/chat/")) ||
      (pathName.startsWith("/setting"))
    setIsBackVisible(shouldBAckVisible);
  }, [setIsBackVisible, pathName])

  return (
    <section className="w-full flex justify-center p-2 fixed top-0 bg-white border-b-2 border-b-pink-300 z-10">
      {
        isBackVisible ?
          <ArrowUturnLeftIcon
            className={iconClassName}
            onClick={backOnClick}
          /> :
          <div className={iconClassName}/>
      }
      <section className={"flex-auto flex justify-center"}>
        <div className={`flex-none text-center m-auto text-lg font-bold ${title === defaultTitle ? "text-pink-500" : ""}`}>{title}</div>
      </section>
      <UserCircleIcon
        className={iconClassName}
        onClick={settingOnClick}
      />
    </section>
  );
}
