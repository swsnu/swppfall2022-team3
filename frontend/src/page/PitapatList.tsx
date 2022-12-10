import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import AppBar from "../component/AppBar";
import NavigationBar from "../component/NavigationBar";
import PitapatReceived from "../component/pitapat/PitapatReceived";
import PitapatSent from "../component/pitapat/PitapatSent";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getPitapatReceivers, getPitapatSenders, selectUser, userActions } from "../store/slices/user";
import { savePageYPosition, scrollToPrevPosition } from "../util/pageScroll";


const theme = createTheme({
  palette: {
    primary: {
      main: "#F48FB1",
    }
  }
});

export default function PitapatList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const pitapatListTabIndex = useSelector(selectUser).pitapatListTabIndex;
  const urlPath = useLocation().pathname;
  const pageBody = useRef<HTMLDivElement>(null);

  const saveYPositionFromReceived = useCallback(() => {
    savePageYPosition(pageBody, urlPath, true, true);
  }, [pageBody, urlPath]);

  const saveYPositionFromSent = useCallback(() => {
    savePageYPosition(pageBody, urlPath, true, false);
  }, [pageBody, urlPath]);

  useEffect(() => {
    if (pitapatListTabIndex === 0) {
      scrollToPrevPosition(pageBody, urlPath, true, true);
    }
    else {
      scrollToPrevPosition(pageBody, urlPath, true, false);
    }
  }, [pageBody, pitapatListTabIndex, urlPath]);

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
    else {
      dispatch(getPitapatSenders(loginUser.key));
      dispatch(getPitapatReceivers(loginUser.key));
    }
  }, [navigate, loginUser, dispatch]);

  return (
    <section className={`${style.page.base} ${style.page.margin.topWithTab} ${style.page.margin.bottom}`}>
      <AppBar saveYPosition={pitapatListTabIndex === 0? saveYPositionFromReceived : saveYPositionFromSent}/>
      <ThemeProvider theme={theme}>
        <Tabs
          className={"top-12 w-full flex flex-row h-12 z-10 fixed"}
          value={pitapatListTabIndex}
          onChange={(_, newValue) => dispatch(userActions.setPitapatListTabIndex(newValue))}
          sx={{
            backgroundColor: "white",
          }}
          textColor={"primary"}
          variant={"fullWidth"}
          onClick={pitapatListTabIndex === 0? saveYPositionFromReceived : saveYPositionFromSent}
        >
          <Tab label={"받은 두근"}/>
          <Tab label={"보낸 두근"}/>
        </Tabs>
      </ThemeProvider>
      <section
        className={style.page.body}
        role={"presentation"}
        ref={pageBody}
        onClick={pitapatListTabIndex === 0? saveYPositionFromReceived : saveYPositionFromSent}
      >
        {
          pitapatListTabIndex === 0 ?
            (<PitapatReceived/>) :
            (<PitapatSent/>)
        }
      </section>
      <NavigationBar saveYPosition={pitapatListTabIndex === 0? saveYPositionFromReceived : saveYPositionFromSent}/>
    </section>
  );
}
