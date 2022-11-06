import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Search from "./page/Search";
import ProfileDetail from "./page/ProfileDetail";
import ChatList from "./page/ChatList";
import ChatDetail from "./page/ChatDetail";
import PitapatRequest from "./page/PitapatRequest";
import Setting from "./page/Setting";
import path from "./constant/path";

function App() {
  return (
    <div className="App flex">
      <BrowserRouter>
        <Routes>
          <Route path={path.signIn} element={<SignIn />} />
          <Route path={path.signUp} element={<SignUp />} />
          <Route path={path.search} element={<Search />} />
          <Route path={path.profile} element={<ProfileDetail />} />
          <Route path={path.chat} element={<ChatList />} />
          <Route path={path.chatDetail} element={<ChatDetail />} />
          <Route path={path.pitapat} element={<PitapatRequest />} />
          <Route path={path.setting} element={<Setting />} />
          <Route path={"/*"} element={<Navigate replace to={path.signIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
