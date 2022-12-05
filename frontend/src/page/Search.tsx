import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
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
import { Gender } from "../types";
import { savePageYPosition, scrollToPrevPosition } from "../util/pageScroll";


export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const users = useSelector(selectUser).users;
  const filter = useSelector(selectUser).filter;
  const urlPath = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
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
  }, [loginUser, navigate]);

  useEffect(() => {
    if (filter) {
      dispatch(getUsers(filter));
    } else {
      dispatch(getUsers({
        page: 1,
        gender: loginUser?.interestedGender ? loginUser.interestedGender : Gender.ALL,
      }));
    }
  }, [dispatch, filter, loginUser?.interestedGender]);

  useEffect(() => {
    scrollToPrevPosition(pageBody, urlPath);
  }, [pageBody, urlPath]);

  // const getMoreUsers = useCallback(async () => {
  //   setIsLoaded(true);

  //   setIsLoaded(false);
  // }, []);

  const Wrapper = forwardRef((props: {children: JSX.Element}, ref: React.LegacyRef<HTMLSpanElement>) => (
    <span {...props} ref={ref}>
      {props.children}
    </span>
  ));

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
        <NavigationBar saveYPosition={saveYPosition}/>
        <Modal
          open={isModalOpen}
          onClose={onModalClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wrapper>
            <UserFilter onModalClose={onModalClose}/>
          </Wrapper>
        </Modal>
      </section> : <section/>
  );
}
