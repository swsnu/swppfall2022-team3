import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon, UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import path from "../constant/path";


/**
 * -1 is the index for the page that doesn't have navigation bar
 */
type TabIndex = 0 | 1 | 2 | -1;

const tabColor = "white";
const defaultIconClassName = `h-8 w-8 stroke-1 stroke-${tabColor}`;
const tabClassName = "flex-1 flex items-center justify-center";

const NavigationBar = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const [selectedTab, setSelectedTab] = useState<TabIndex>(-1);

  const tabOnClickListener = useCallback((tabIndex: TabIndex) => {
    let targetPath: string = "";

    if (tabIndex === 0) {
      targetPath = "/search";
    }
    else if (tabIndex === 1) {
      targetPath = "/pitapat";
    }
    else if (tabIndex === 2) {
      targetPath = "/chat";
    }

    if (selectedTab !== tabIndex) {
      navigate(targetPath);
    }

  }, [navigate, selectedTab]);

  useEffect(() => {
    let newSelectedTab: TabIndex = -1;
    if (pathName.startsWith(path.search)) {
      newSelectedTab = 0;
    }
    else if (pathName.startsWith(path.pitapat)) {
      newSelectedTab = 1;
    }
    else if (pathName.startsWith(path.chat)) {
      newSelectedTab = 2;
    }
    setSelectedTab(newSelectedTab)
  }, [pathName])

  return (
    <div className="w-full h-16 bg-pink-300 fixed bottom-0 flex flex-row align-center">
      <button
        className={tabClassName}
        onClick={(() => { tabOnClickListener(0) })}
      >
        <UserIcon
          className={`${defaultIconClassName} ${selectedTab === 0 ? `fill-${tabColor}` : "fill-none"}`}
          stroke={selectedTab === 0 ? `fill-${tabColor}` : undefined}
        />
      </button>
      <button
        className={tabClassName}
        onClick={(() => { tabOnClickListener(1) })}
      >
        <HeartIcon
          className={`${defaultIconClassName} ${selectedTab === 1 ? `fill-${tabColor}` : "fill-none"}`}
          stroke={selectedTab === 1 ? `fill-${tabColor}` : undefined}
        />
      </button>
      <button
        className={tabClassName}
        onClick={(() => { tabOnClickListener(2) })}
      >
        <ChatBubbleLeftIcon
          className={`${defaultIconClassName} ${selectedTab === 2 ? `fill-${tabColor}` : "fill-none"}`}
          stroke={selectedTab === 2 ? `fill-${tabColor}` : undefined}
        />
      </button>
    </div>
  );
};
export default NavigationBar;
