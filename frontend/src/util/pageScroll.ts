import { RefObject } from "react";


const savePageYPosition = (
  ref: RefObject<HTMLDivElement>,
  urlPath: string,
  isFromPitapatList=false,
  isItReceivedPitapat=false) => {
  if (isFromPitapatList) {
    urlPath = `${urlPath}-${isItReceivedPitapat ? "received" : "sent"}`;
  }
  if (ref.current) {
    const prevYOffset = ref.current.scrollTop;
    sessionStorage.setItem(`prevYOffset-${urlPath}`, `${prevYOffset}`);
  }
};

const scrollToPrevPosition = (
  ref: RefObject<HTMLDivElement>,
  urlPath: string,
  isFromPitapatList=false,
  isItReceivedPitapat=false) => {
  if (isFromPitapatList) {
    urlPath = `${urlPath}-${isItReceivedPitapat ? "received" : "sent"}`;
  }
  const prevYOffset = sessionStorage.getItem(`prevYOffset-${urlPath}`);
  if (prevYOffset) {
    const yOffset = parseInt(sessionStorage.getItem(`prevYOffset-${urlPath}`) as string);
    if (ref.current && !isNaN(yOffset)) {
      ref.current.scrollTop = yOffset;
    }
  }
};

export {
  savePageYPosition,
  scrollToPrevPosition,
};
