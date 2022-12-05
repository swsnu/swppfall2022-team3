import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AppBar from "../component/AppBar";
import PhotoSlider from "../component/PhotoSlider";
import EditButton from "../component/pitapat-edit/EditButton";
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
  const [option, setOption] = useState<number>(0);

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
    else {
      dispatch(getTags());
      dispatch(getColleges(loginUser.university));
      dispatch(getMajors(loginUser.college));
    }
  }, [navigate, loginUser, dispatch]);

  return (!loginUser) ? <section/> :
    (option === 0) ? (
      // add bottom margin if navigation bar is added
      // <section className={"w-full flex-1 flex flex-col mt-12 mb-16"}>
      <section className={`${style.page.base} ${style.page.margin.top}`}>
        <AppBar title={`${loginUser.nickname}/${getKoreanAge(loginUser.birthday)}`}/>
        <section className={"w-full flex-1 z-0 flex flex-col"}>
          <section className={"relative"}>
            <PhotoSlider
              user={loginUser}
            />
            <div className={"absolute h-14 bottom-0 left-0 right-0 px-4 py-2 flex flex-col justify-center"}>
              <button
                className={"absolute right-4 w-16 h-8 z-10 bg-white rounded-lg border border-pink-600 flex items-center justify-center"}
                onClick={() => setOption(1)}
              >
                <div className={"flex-none mx-0.5 font-bold text-pink-600"}>
                  수정
                </div>
              </button>
            </div>
          </section>
          <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
            <div className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
              {colleges.find((college) => college.key === loginUser.college)?.name}
            </div>
            <div className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
              {majors.find((major) => major.key === loginUser.major)?.name}
            </div>
            <EditButton
              option={2}
              setOption={setOption}
            />
          </article>
          <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
            {loginUser.tags.map((t, index) =>
              <div key={index} className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
                {tags.find((tag) => tag.key === t)?.name}
              </div>
            )}
            <EditButton
              option={3}
              setOption={setOption}
            />
          </article>
          <article className={"mx-3 mb-6 text-base"}>
            {loginUser.introduction}
            <EditButton
              option={4}
              setOption={setOption}
            />
          </article>
        </section>
      </section>
    ) : (
      <section/>
    );
}
