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
  const pageIndex = useSelector(selectUser).searchPageIndex;
  const urlPath = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [target, setTarget] = useState<HTMLDivElement | null>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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
    scrollToPrevPosition(pageBody, urlPath);
  }, [pageBody, urlPath]);

  const getMoreUsers = useCallback(async () => {
    setIsLoaded(true);
    const defaultFilter = { gender: loginUser?.interestedGender ? loginUser.interestedGender : Gender.ALL };
    const nextPageFilter = {
      ...(filter ? filter : defaultFilter),
      pageIndex: pageIndex + 1,
    };
    dispatch(getUsers(nextPageFilter)).then(() => {
      setIsLoaded(false);
    });
  }, [dispatch, filter, loginUser, pageIndex]);

  const onIntersect = useCallback(async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreUsers();
      observer.observe(entry.target);
    }
  }, [getMoreUsers, isLoaded]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  const Wrapper = forwardRef((props: {children: JSX.Element}, ref: React.LegacyRef<HTMLDivElement>) => (
    <div {...props} ref={ref}>
      {props.children}
    </div>
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
          <div ref={setTarget}>loading...</div>
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
