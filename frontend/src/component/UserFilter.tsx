import React, { useCallback, useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { pink } from "@mui/material/colors";
import Slider from "@mui/material/Slider";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getColleges, selectCollege } from "../store/slices/college";
import { getMajors, selectMajor } from "../store/slices/major";
import { getTags, selectTag } from "../store/slices/tag";
import { selectUser } from "../store/slices/user";
import { College, Major, Tag } from "../types";
import UserFilterElement from "./UserFilterElement";


export default function UserFilter() {
  const university = useSelector(selectUser).loginUser?.university;
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const tags = useSelector(selectTag).tags;
  const [college, setCollege] = useState<number | "">("");
  const [major, setMajor] = useState<number | "">("");
  const [tag, setTag] = useState<number | "">("");
  const [includedColleges, setIncludedColleges] = useState<College[]>([]);
  const [excludedColleges, setExcludedColleges] = useState<College[]>([]);
  const [includedMajors, setIncludedMajors] = useState<Major[]>([]);
  const [excludedMajors, setExcludedMajors] = useState<Major[]>([]);
  const [includedTags, setIncludedTags] = useState<Tag[]>([]);
  const [excludedTags, setExcludedTags] = useState<Tag[]>([]);
  const [ageRange, setAgeRange] = useState<number[]>([19, 30]);
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

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const onAgeChange = useCallback((_: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  }, [setAgeRange]);

  return (
    <section className={"h-fit w-fit flex flex-col items-center bg-white p-4"}>
      <section>
        <div className={"flex flex-row"}>
          <p className={"text-left pr-1"}>나이</p>
          <p className={"text-gray-500"}>({ageRange[0]}~{ageRange[1] < 30 ? ageRange[1] : "30+"})</p>
        </div>
        <div className="flex flex-col items-center mb-4">
          <Slider
            value={ageRange}
            onChange={onAgeChange}
            min={19}
            max={30}
            style={{ color: pink[400] }}
            sx={{
              maxWidth: 300,
              minWidth: 300,
            }}
          />
        </div>
        <UserFilterElement<College>
          title="단과대"
          value={college}
          values={colleges}
          includedValues={includedColleges}
          excludedValues={excludedColleges}
          setValue={setCollege}
          setIncludedValues={setIncludedColleges}
          setExcludedValues={setExcludedColleges}
        />
        <UserFilterElement<Major>
          title="학과"
          value={major}
          values={majors}
          includedValues={includedMajors}
          excludedValues={excludedMajors}
          setValue={setMajor}
          setIncludedValues={setIncludedMajors}
          setExcludedValues={setExcludedMajors}
        />
        <UserFilterElement<Tag>
          title="태그"
          value={tag}
          values={tags}
          includedValues={includedTags}
          excludedValues={excludedTags}
          setValue={setTag}
          setIncludedValues={setIncludedTags}
          setExcludedValues={setExcludedTags}
        />
      </section>
      <button
        className={`${style.button.base} ${style.button.colorSet.main} mt-2`}
        // onClick={}
      >
        적용
      </button>
    </section>
  );
}
