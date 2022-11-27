import { RefObject } from "react";


const savePageYPosition = (ref: RefObject<HTMLDivElement>, urlPath: string) => {
  if (ref.current) {
    const prevYOffset = ref.current.scrollTop;
    sessionStorage.setItem("prevYOffset", `${prevYOffset}`);
    sessionStorage.setItem("prevUrlPath", urlPath);
  }
};

const scrollToPrevPosition = (ref: RefObject<HTMLDivElement>, urlPath: string) => {
  const prevUrlPath = sessionStorage.getItem("prevUrlPath");
  if (prevUrlPath === urlPath) {
    const yOffset = parseInt(sessionStorage.getItem("prevYOffset") as string);
    if (ref.current && !isNaN(yOffset)) {
      ref.current.scrollTop = yOffset;
    }
  }
};


export {
  savePageYPosition,
  scrollToPrevPosition,
};
