import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Modal from "@mui/material/Modal";
import AppBar from "../component/AppBar";
import BlockedUserList from "../component/BlockedUserList";
import LoginInfoChanger from "../component/LoginInfoChanger";
import RemoveAccount from "../component/RemoveAccount";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { chatAction } from "../store/slices/chat";
import { fetchSignout, getBlockedUsers, selectUser } from "../store/slices/user";


export default function Setting() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const [isBlockedEdit, setBlockedEdit] = useState<boolean>(false);
  const [isLoginChangeModalOpen, setLoginChangeModalOpen] = useState<boolean>(false);
  const [isRemoveAccModalOpen, setRemoveAccModalOpen] = useState<boolean>(false);

  const onLoginChangeModalClose = useCallback(() => {
    setLoginChangeModalOpen(false);
  }, [setLoginChangeModalOpen]);

  const onRemoveAccModalClose = useCallback(() => {
    setRemoveAccModalOpen(false);
  }, [setRemoveAccModalOpen]);


  const Wrapper = forwardRef((props: {children: JSX.Element}, ref: React.LegacyRef<HTMLSpanElement>) => (
    <span {...props} ref={ref}>
      {props.children}
    </span>
  ));

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
  }, [navigate, loginUser]);

  const getReprPhotoPath = useCallback(() => {
    const photoPath = loginUser?.photos[0];
    return photoPath ?? "";
  }, [loginUser]);

  return (
    (!isBlockedEdit) ?
      <section className={`${style.page.base} ${style.page.margin.top} mb-16`}>
        <AppBar/>
        <section className={style.page.body}>
          <article className={"flex flex-row items-center w-full h-24 border-b-2"}>
            <img
              src={getReprPhotoPath()}
              alt={"프로필 이미지"}
              className={"flex-none object-cover h-16 w-16 mx-4"}
            />
            <div className={"flex-auto flex flex-col"}>
              <div className={"w-fit mb-0.5 text-xl font-bold"}>
                {loginUser?.nickname}
              </div>
              <button
                className={"flex-none w-fit text-left text-base"}
                onClick={() => navigate("/profile/edit/")}
              >
                프로필 수정
              </button>
            </div>
          </article>

          <article
            className={"flex items-center h-12 border-b ml-4 text-left text-lg"}
            role={"presentation"}
            onClick={() => {
              setBlockedEdit(true);
              dispatch(getBlockedUsers(loginUser?.key ?? 0));
            } }
          >
            차단 유저 관리
          </article>

          <article
            className={"flex items-center h-12 border-b ml-4 text-left text-lg"}
            role={"presentation"}
            onClick={() => {
              setLoginChangeModalOpen(true);
              dispatch(getBlockedUsers(loginUser?.key ?? 0));
            } }
          >
            회원정보 변경
          </article>
          <article
            className={"flex items-center h-12 border-b ml-4 text-left text-lg"}
            role={"presentation"}
            onClick={() => {
              dispatch(chatAction.setChatroomEmpty());
              dispatch(fetchSignout());
            }}
          >
            로그아웃
          </article>
          <article
            className={"flex items-center h-12 border-b ml-4 text-left text-lg"}
            role={"presentation"}
            onClick={() => setRemoveAccModalOpen(true)}
          >
            회원 탈퇴
          </article>
        </section>

        <Modal
          open={isLoginChangeModalOpen}
          onClose={onLoginChangeModalClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wrapper>
            <LoginInfoChanger onModalClose={onLoginChangeModalClose}/>
          </Wrapper>
        </Modal>

        <Modal
          open={isRemoveAccModalOpen}
          onClose={onRemoveAccModalClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wrapper>
            <RemoveAccount onModalClose={onRemoveAccModalClose}/>
          </Wrapper>
        </Modal>
      </section>
      :
      <BlockedUserList setBlockedEdit={setBlockedEdit} />
  );
}
