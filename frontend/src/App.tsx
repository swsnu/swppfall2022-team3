import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import path from "./constant/path";
import ChatDetail from "./page/ChatDetail";
import ChatList from "./page/ChatList";
import PitapatList from "./page/PitapatList";
import ProfileDetail from "./page/ProfileDetail";
import ProfileUpdate from "./page/ProfileUpdate";
import Search from "./page/Search";
import Setting from "./page/Setting";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";


function App() {
  return (
    <div className={"App flex"}>
      <BrowserRouter>
        <Routes>
          <Route path={path.signIn} element={<SignIn/>}/>
          <Route path={path.signUp} element={<SignUp/>}/>
          <Route path={path.search} element={<Search/>}/>
          <Route path={path.profile} element={<ProfileDetail/>}/>
          <Route path={path.chat} element={<ChatList/>}/>
          <Route path={path.chatDetail} element={<ChatDetail/>}/>
          <Route path={path.pitapat} element={<PitapatList/>}/>
          <Route path={path.setting} element={<Setting/>}/>
          <Route path={path.profileEdit} element={<ProfileUpdate/>}/>
          <Route path={"/*"} element={<Navigate replace to={path.signIn}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
