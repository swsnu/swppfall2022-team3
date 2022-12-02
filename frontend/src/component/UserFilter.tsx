import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { getColleges, selectCollege } from "../store/slices/college";
import { getMajors, selectMajor } from "../store/slices/major";
import { selectUser } from "../store/slices/user";
import InformationInput from "./signup/InformationInput";


interface IProps {
  college: number;
  setCollege: Dispatch<SetStateAction<number>>;
  major: number;
  setMajor: Dispatch<SetStateAction<number>>;
}

export default function UserFilter({
  college,
  setCollege,
  major,
  setMajor,
}: IProps) {
  const university = useSelector(selectUser).loginUser?.university;
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (university) {
      dispatch(getColleges(university));
    }
  }, [dispatch, university]);

  useEffect(() => {
    if (college) {
      dispatch(getMajors(college));
    }
  }, [dispatch, college]);

  return (
    <section className="h-full flex items-center justify-center">
      <article className="h-fit bg-white p-4">
        <InformationInput
          label={"단과대"}
          value={college}
          setValue={setCollege}
          type={"select"}
          options={
            colleges.map((col) => ({ name: col.name, value: col.key }))
          }
        />
        <InformationInput
          label={"학과"}
          value={major}
          setValue={setMajor}
          type={"select"}
          options={
            majors.map((m) => ({ name: m.name, value: m.key }))
          }
        />
      </article>
    </section>
  );
}
