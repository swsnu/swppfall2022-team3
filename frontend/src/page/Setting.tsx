import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AppBar from "../component/AppBar";
import paths from "../constant/path";
import { AppDispatch } from "../store";
import { selectPhoto } from "../store/slices/photo";
import { selectUser, userActions } from "../store/slices/user";


export default function Setting() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const photos = useSelector(selectPhoto).photos;

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
  }, [navigate, loginUser]);

  function getReprPhotoPath(): string {
    const photo = photos.find((p) => p.key === loginUser?.photos[0]);
    return photo ? photo.path : "";
  }

  return (
    <section className={"flex-1 flex flex-col mt-12 mb-16"}>
      <AppBar/>
      <article className={"flex-none flex flex-row items-center w-full h-24 border-b-2"}>
        <img
          src={getReprPhotoPath()}
          alt={"프로필 이미지"}
          className={"flex-none object-cover h-16 w-16 mx-4"}
        />
        <div className={"flex-auto flex flex-col"}>
          <div className={"w-fit mb-0.5 text-xl font-bold"}>
            {loginUser?.username}
          </div>
          <button
            className={"flex-none w-fit text-left text-base"}
            onClick={() => navigate("/profile/edit/")}
          >
            프로필 수정
          </button>
        </div>
      </article>
      <article className={"flex items-center h-12 border-b"}>
        <button
          className={"w-fit ml-4 text-left text-lg"}
          onClick={() => dispatch(userActions.logout())}
        >
          로그아웃
        </button>
      </article>
    </section>
  );
}
