import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { photos, fakeBaseUsers, pitapats, fakeBaseUser } from '../DummyData';
import { getKoreanAge } from '../types';
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
//import { fetchUsers, fetchUser } from "../store/slices/user";
// import { AppDispatch } from "../store";

export default function PitapatRequest() {
  const navigate = useNavigate();
  // when Req is true -> 내가 받은 두근
  // when Req is false -> 내가 보낸 두근
  const [isItReq, setIsItReq] = useState<boolean>(true);

  const showReqHandler = () => {
    setIsItReq(true);
  };

  const showSentHandler = () => {
    setIsItReq(false);
  };

  const clickUserHandler = (key : number) => {
    navigate("/profile/" + key);
  };

  return (
    <div id='pitapat'>
      <AppBar title={'두근두근 캠퍼스'}/>
      <div>
        <button id="show-req-button"
                disabled={isItReq}
                onClick={() => showReqHandler()}>
          내가 받은 두근
        </button>
        <button id="show-sent-button"
                disabled={!isItReq}
                onClick={() => showSentHandler()}>
          내가 보낸 두근
        </button>
      </div>
      {
        isItReq ?
        <div id="requested-list">
          {pitapats.filter(pitapat => pitapat.to === 1).map((pitapat) => {
            const fromUser = fakeBaseUsers.find(user => user.key === pitapat.from);
            if(fromUser) {
              return (
                <Profile key={fromUser.key}
                         username={fromUser.username}
                         koreanAge={getKoreanAge(fromUser.birthday)}
                         photo={photos.find((p) => p.key === fromUser.reprPhoto)?.path}
                         clickDetail={() => clickUserHandler(fromUser.key)}
                />
              )
            }
            else
              return null;
          })}
        </div>
        :
        <div id="sent-list">
          {pitapats.filter(pitapat => pitapat.from === 1).map((pitapat) => {
            const toUser = fakeBaseUsers.find(user => user.key === pitapat.to);
            if(toUser) {
              return (
                <Profile key={toUser.key}
                         username={toUser.username}
                         koreanAge={getKoreanAge(toUser.birthday)}
                         photo={photos.find((p) => p.key === toUser.reprPhoto)?.path}
                         clickDetail={() => clickUserHandler(toUser.key)}
                />
              )
            }
            else
              return null;
          })}
        </div>
      }
      <NavigationBar/>
    </div>
  );
}
