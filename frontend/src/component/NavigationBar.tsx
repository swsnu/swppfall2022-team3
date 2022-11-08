import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon, UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import path from "../constant/path";


/**
 * -1 is the index for the page that doesn't have navigation bar
 */
type TabIndex = 0 | 1 | 2 | -1;

const tabClassName = "flex-1 flex items-center justify-center";

export default function NavigationBar() {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const [selectedTab, setSelectedTab] = useState<TabIndex>(-1);

  const tabOnClickListener = useCallback((tabIndex: TabIndex) => {
    let targetPath = "";

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

  const getIconClassName = useCallback((index: TabIndex): string => {
    // const defaultIconClassName = `h-8 w-8 stroke-1 stroke-${tabColor}`;
    if (selectedTab === index) {
      return "h-8 w-8 stroke-1 stroke-white fill-white";
    }
    else {
      return "h-8 w-8 stroke-1 stroke-white fill-none";
    }
  }, [selectedTab]);

  const getStroke = useCallback(
    (index: TabIndex): string => selectedTab === index ? "fill-white" : "",
    [selectedTab]
  );

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
    setSelectedTab(newSelectedTab);
  }, [pathName]);

  return (
    <div className={"w-full z-20 h-16 bg-pink-300 fixed bottom-0 flex flex-row align-center"}>
      <button
        className={tabClassName}
        onClick={(() => {
          tabOnClickListener(0);
        })}
      >
        <UserIcon
          className={getIconClassName(0)}
          stroke={getStroke(0)}
        />
      </button>
      <button
        className={tabClassName}
        onClick={(() => {
          tabOnClickListener(1);
        })}
      >
        <HeartIcon
          className={getIconClassName(1)}
          stroke={getStroke(1)}
        />
      </button>
      <button
        className={tabClassName}
        onClick={(() => {
          tabOnClickListener(2);
        })}
      >
        <ChatBubbleLeftIcon
          className={getIconClassName(2)}
          stroke={getStroke(2)}
        />
      </button>
    </div>
  );
}
