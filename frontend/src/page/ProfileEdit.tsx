import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Modal from "@mui/material/Modal";
import AppBar from "../component/AppBar";
import PhotoSlider from "../component/PhotoSlider";
import CollegeMajorEdit from "../component/pitapat-edit/CollegeMajorEdit";
import EditButton from "../component/pitapat-edit/EditButton";
import IntroEdit from "../component/pitapat-edit/IntroEdit";
import TagsEdit from "../component/pitapat-edit/TagsEdit";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getColleges, selectCollege } from "../store/slices/college";
import { getMajorsByUniversity, selectMajor } from "../store/slices/major";
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
  const [isPhotoEdit, setPhotoEdit] = useState<boolean>(false);
  const [isCollegeMajorModalOpen, setCollegeMajorModalOpen] = useState<boolean>(false);
  const [isTagsModalOpen, setTagsModalOpen] = useState<boolean>(false);
  const [isIntroModalOpen, setIntroModalOpen] = useState<boolean>(false);
  const [selectedCollegeKey, setSelectedCollegeKey] = useState<number>(loginUser?.college ?? 0);

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
    else {
      dispatch(getTags());
      dispatch(getColleges(loginUser.university));
      dispatch(getMajorsByUniversity(loginUser.university));
    }
  }, [navigate, loginUser, dispatch]);

  // useEffect(() => {
  //   if (selectedCollegeKey) {
  //     dispatch(getMajorsByUniversity(selectedCollegeKey));
  //   }
  // }, [dispatch, selectedCollegeKey]);

  const onCollegeMajorModalClose = useCallback(() => {
    setSelectedCollegeKey(loginUser?.college ?? 0);
    setCollegeMajorModalOpen(false);
  }, [loginUser?.college]);

  const onTagsModalClose = useCallback(() => {
    setTagsModalOpen(false);
  }, [setTagsModalOpen]);

  const onIntroModalClose = useCallback(() => {
    setIntroModalOpen(false);
  }, [setIntroModalOpen]);

  const Wrapper = forwardRef((props: {children: JSX.Element}, ref: React.LegacyRef<HTMLSpanElement>) => (
    <span {...props} ref={ref}>
      {props.children}
    </span>
  ));

  return (!loginUser) ? <section/> :
    (!isPhotoEdit) ? (
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
                onClick={() => setPhotoEdit(true)}
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
              setOption={setCollegeMajorModalOpen}
            />
          </article>
          <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
            {loginUser.tags.map((t, index) =>
              <div key={index} className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
                {tags.find((tag) => tag.key === t)?.name}
              </div>
            )}
            <EditButton
              setOption={setTagsModalOpen}
            />
          </article>
          <article className={"mx-3 mb-6 text-base"}>
            {loginUser.introduction}
            <EditButton
              setOption={setIntroModalOpen}
            />
          </article>
        </section>

        <Modal
          open={isCollegeMajorModalOpen}
          onClose={onCollegeMajorModalClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wrapper>
            <CollegeMajorEdit
              onModalClose={onCollegeMajorModalClose}
              setSelectedCollegeKey={setSelectedCollegeKey}
              selectedCollegeKey={selectedCollegeKey}
            />
          </Wrapper>
        </Modal>

        <Modal
          open={isTagsModalOpen}
          onClose={onTagsModalClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wrapper>
            <TagsEdit onModalClose={onTagsModalClose}/>
          </Wrapper>
        </Modal>

        <Modal
          open={isIntroModalOpen}
          onClose={onIntroModalClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wrapper>
            <IntroEdit onModalClose={onIntroModalClose}/>
          </Wrapper>
        </Modal>

      </section>
    ) : (
      <section/>
    );
}

