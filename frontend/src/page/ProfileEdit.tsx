import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AppBar from "../component/AppBar";
import PhotoSlider from "../component/PhotoSlider";
import paths from "../constant/path";
import style from "../constant/style";
import { selectTag } from "../store/slices/tag";
import { selectUser } from "../store/slices/user";
import { getKoreanAge } from "../util/date";


export default function ProfileEdit() {
  const navigate = useNavigate();
  const loginUser = useSelector(selectUser).loginUser;
  const tags = useSelector(selectTag).tags;

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
  }, [navigate, loginUser]);

  return (loginUser) ? (
    // add bottom margin if navigation bar is added
    // <section className={"w-full flex-1 flex flex-col mt-12 mb-16"}>
    <section className={`${style.page.base} ${style.page.margin.top}`}>
      <AppBar title={`${loginUser.nickname}/${getKoreanAge(loginUser.birthday)}`}/>
      <section className={"w-full flex-1 z-0 flex flex-col"}>
        <section className={"relative"}>
          <PhotoSlider
            user={loginUser}
          />
        </section>
        <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
          {loginUser.tags.map((t, index) =>
            <div key={index} className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
              {tags.find((tag) => tag.key === t)?.name}
            </div>
          )}
        </article>
        <article className={"mx-3 mb-6 text-base"}>{loginUser.introduction}</article>
      </section>
    </section>
  ) : <section/>;
}
