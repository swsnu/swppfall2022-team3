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
import { selectUser } from "../store/slices/user";


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
                  []
                }
              />
            ) :
            <PitapatSent
              pitapats={
                []
              }
            />
        }
      </section>
      <NavigationBar/>
    </section>
  );
}
