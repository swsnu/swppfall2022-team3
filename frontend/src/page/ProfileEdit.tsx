import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AppBar from "../component/AppBar";
import PhotoSlider from "../component/PhotoSlider";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getColleges, selectCollege } from "../store/slices/college";
import { getMajors, selectMajor } from "../store/slices/major";
import { getTags, selectTag } from "../store/slices/tag";
import { selectUser } from "../store/slices/user";
import { getKoreanAge } from "../util/date";


export default function ProfileEdit() {
  const navigate = useNavigate();
  const loginUser = useSelector(selectUser).loginUser;
  const tags = useSelector(selectTag).tags;
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
    else {
      dispatch(getTags());
      dispatch(getColleges(loginUser.university));
      dispatch(getMajors(loginUser.college));
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
          <div className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
            {colleges.find((college) => college.key === loginUser.college)?.name}
          </div>
          <div className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
            {majors.find((major) => major.key === loginUser.major)?.name}
          </div>
        </article>
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
