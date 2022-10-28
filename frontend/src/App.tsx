import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Search from './page/Search';
import ProfileDetail from './page/ProfileDetail';
import ChatList from './page/ChatList';
import ChatDetail from './page/ChatDetail';
import PitapatRequest from './page/PitapatRequest';
import Setting from './page/Setting';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile/:id' element={<ProfileDetail />} />
          <Route path='/chat' element={<ChatList />} />
          <Route path='/chat/:id' element={<ChatDetail />} />
          <Route path='/pitapat' element={<PitapatRequest />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/*' element={<Navigate replace to={"/signin"}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
