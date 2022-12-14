import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "../../constant/style";
import { AppDispatch } from "../../store";
import { selectCollege } from "../../store/slices/college";
import { selectMajor } from "../../store/slices/major";
import { getLoginUser, selectUser } from "../../store/slices/user";
import { userUrl } from "../../store/urls";
import InformationInput from "../signup/InformationInput";


interface IProps {
  onModalClose: () => void;
  setSelectedCollegeKey: Dispatch<SetStateAction<number>>;
  selectedCollegeKey: number;
}

export default function CollegeMajorEdit({ onModalClose, setSelectedCollegeKey, selectedCollegeKey }: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMajorKey, setSelectedMajorKey] = useState<number>(majors.length === 0 ? 0 : majors[0].key);


  const cancelOnClickHandler = useCallback( () => {
    onModalClose();
  },
  [onModalClose]);

  const confirmHandler = useCallback( async () => {
    if (!loginUser) {
      return;
    }
    await axios.put(`${userUrl}/${loginUser.key}/`, {
      email: loginUser?.email,
      nickname: loginUser?.nickname,
      gender: loginUser?.gender,
      interested_gender: loginUser?.interestedGender,
      birthday: loginUser?.birthday,
      university: loginUser?.university,
      college: selectedCollegeKey,
      major: selectedMajorKey,
      introduction: loginUser?.introduction,
      tags: loginUser?.tags,
    }).then(() => {
      dispatch(getLoginUser(loginUser.key));
    });
    onModalClose();
  },
  [dispatch, loginUser, onModalClose, selectedCollegeKey, selectedMajorKey]);

  return (
    <section className={"h-fit w-fit flex flex-col items-center bg-white p-4 space-y-8"}>
      <section className={"space-y-4"}>
        <div>
          ????????? ????????? ????????? ?????????.
        </div>
        <InformationInput
          label={"?????????"}
          value={selectedCollegeKey}
          setValue={setSelectedCollegeKey}
          type={"select"}
          required={true}
          options={
            colleges.map((col) => ({ name: col.name, value: col.key }))
          }
        />
        <InformationInput
          label={"??????"}
          value={selectedMajorKey}
          setValue={setSelectedMajorKey}
          type={"select"}
          required={true}
          options={
            majors
              .filter((m) => m.college === selectedCollegeKey)
              .map((m) => ({ name: m.name, value: m.key }))
          }
        />
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main} mt-16`}
          onClick={confirmHandler}
        >
          ?????? ??????
        </button>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary} mt-8`}
          onClick={cancelOnClickHandler}
        >
          ??????
        </button>
      </section>
    </section>
  );
}
