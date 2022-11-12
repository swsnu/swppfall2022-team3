import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import AppBar from "../component/AppBar";
import NavigationBar from "../component/NavigationBar";
import PitapatReceived from "../component/pitapat/PitapatReceived";
import PitapatSent from "../component/pitapat/PitapatSent";
import paths from "../constant/path";
import style from "../constant/style";
import { selectPitapat } from "../store/slices/pitapat";
import { selectUser } from "../store/slices/user";
import { PitapatStatus } from "../types";
import { getPitapatStatus } from "../util/getPitapatStatus";


type TabIndex = 0 | 1;

const theme = createTheme({
  palette: {
    primary: {
      main: "#F48FB1",
    }
  }
});

export default function PitapatList() {
  const navigate = useNavigate();
  const loginUser = useSelector(selectUser).loginUser;
  const pitapats = useSelector(selectPitapat).pitapats;
  const [selectedTabIndex, setSelectedTabIndex] = useState<TabIndex>(0);

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
  }, [navigate, loginUser]);

  return (
    <section className={`${style.page.base} ${style.page.margin.topWithTab} ${style.page.margin.bottom}`}>
      <AppBar/>
      <ThemeProvider theme={theme}>
        <Tabs
          className={"top-12 w-full flex flex-row h-12 z-10 fixed"}
          value={selectedTabIndex}
          onChange={(_, newValue) => setSelectedTabIndex(newValue)}
          sx={{
            backgroundColor: "white",
          }}
          textColor={"primary"}
          variant={"fullWidth"}
        >
          <Tab label={"받은 두근"}/>
          <Tab label={"보낸 두근"}/>
        </Tabs>
      </ThemeProvider>
      <section className={style.page.body}>
        {
          selectedTabIndex === 0 ?
            (
              <PitapatReceived
                pitapats={
                  pitapats.filter((p) =>
                    (p.to === loginUser?.key) &&
                      (getPitapatStatus(loginUser?.key, p.from, pitapats) !== PitapatStatus.MATCHED)
                  )
                }
              />
            ) :
            <PitapatSent
              pitapats={
                pitapats.filter((p) =>
                  (p.from === loginUser?.key) &&
                    (getPitapatStatus(loginUser?.key, p.to, pitapats) !== PitapatStatus.MATCHED)
                )
              }
            />
        }
      </section>
      <NavigationBar/>
    </section>
  );
}
