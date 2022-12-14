import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import paths from "./constant/path";
import ChatDetail from "./page/ChatDetail";
import ChatList from "./page/ChatList";
import PitapatList from "./page/PitapatList";
import ProfileDetail from "./page/ProfileDetail";
import ProfileEdit from "./page/ProfileEdit";
import Search from "./page/Search";
import Setting from "./page/Setting";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.signIn} element={<SignIn/>}/>
        <Route path={paths.signUp} element={<SignUp/>}/>
        <Route path={paths.search} element={<Search/>}/>
        <Route path={paths.profile} element={<ProfileDetail/>}/>
        <Route path={paths.chat} element={<ChatList/>}/>
        <Route path={paths.chatDetail} element={<ChatDetail/>}/>
        <Route path={paths.pitapat} element={<PitapatList/>}/>
        <Route path={paths.setting} element={<Setting/>}/>
        <Route path={paths.profileEdit} element={<ProfileEdit/>}/>
        <Route path={"/*"} element={<Navigate replace to={paths.signIn}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
