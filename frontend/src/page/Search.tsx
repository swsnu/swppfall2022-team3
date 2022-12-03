import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AppBar from "../component/AppBar";
import NavigationBar from "../component/NavigationBar";
import Profile from "../component/Profile";
import UserFilter from "../component/UserFilter";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getUsers, selectUser } from "../store/slices/user";
import { savePageYPosition, scrollToPrevPosition } from "../util/pageScroll";


export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;
  const urlPath = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ageRange, setAgeRange] = useState<number[]>([19, 30]);
  const [college, setCollege] = useState<number>(0);
  const [major, setMajor] = useState<number>(0);
  const [tag, setTag] = useState<number>(0);
  const pageBody = useRef<HTMLDivElement>(null);

  const saveYPosition = useCallback(() => {
    savePageYPosition(pageBody, urlPath);
  }, [pageBody, urlPath]);

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
    else {
      dispatch(getUsers(1));
    }

  }, [navigate, loginUser, dispatch]);

  useEffect(() => {
    scrollToPrevPosition(pageBody, urlPath);
  }, [pageBody, urlPath]);

  return (
    loginUser ?
      <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
        <AppBar setIsModalOpen={setIsModalOpen} />
        <section
          className={"h-fit overflow-y-scroll w-full"}
          role={"presentation"}
          ref={pageBody}
          onClick={saveYPosition}
        >
          {
            users.map((user, index) => (
              <Profile
                key={user.key}
                user={user}
                showRejectButton={false}
                isLastElement={(index === users.length - 1)}
              />
            ))
          }
        </section>
        <NavigationBar/>
        <Modal
          open={isModalOpen}
          onClose={onModalClose}
          style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
          }}
        >
          <UserFilter
            college={college}
            setCollege={setCollege}
            major={major}
            setMajor={setMajor}
            tag={tag}
            setTag={setTag}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
          />
        </Modal>
      </section> : <section/>
  );
}
