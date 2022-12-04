import React, { useCallback, useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { pink, blue } from "@mui/material/colors";
import Slider from "@mui/material/Slider";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getColleges, selectCollege } from "../store/slices/college";
import { getMajors, selectMajor } from "../store/slices/major";
import { getTags, selectTag } from "../store/slices/tag";
import { selectUser } from "../store/slices/user";
import { Tag } from "../types";
import InformationInput from "./signup/InformationInput";
import TagElement from "./signup/TagElement";


export default function UserFilter() {
  const university = useSelector(selectUser).loginUser?.university;
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const tags = useSelector(selectTag).tags;
  const [college, setCollege] = useState<number | "">("");
  const [major, setMajor] = useState<number | "">("");
  const [tag, setTag] = useState<number | "">("");
  // const [includedColleges, setincludedColleges] = useState<number[]>([]);
  // const [includedMajors, setincludedMajors] = useState<number[]>([]);
  const [includedTags, setIncludedTags] = useState<Tag[]>([]);
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

  const addTag = useCallback(() => {
    if (tag) {
      const addedTag = tags.filter((t) => t.key === tag)[0];
      if (!includedTags.includes(addedTag)) {
        setIncludedTags([...includedTags, addedTag]);
      }
    }
  }, [tag, tags, includedTags, setIncludedTags]);

  const deleteTag = useCallback((tagKey: number) => {
    setIncludedTags(includedTags.filter((t) => t.key !== tagKey));
  }, [includedTags]);

  return (
    <section className={"h-fit w-fit flex flex-col items-center bg-white p-4"}>
      <section>
        <div className={"flex flex-row"}>
          <p className={"text-left pr-1"}>나이</p>
          <p className={"text-gray-500"}>({ageRange[0]}~{ageRange[1] < 30 ? ageRange[1] : "30+"})</p>
        </div>
        <div className="flex flex-col items-center">
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
        <p>단과대</p>
        <article className={"flex flex-row mb-4"}>
          <InformationInput
            label={""}
            value={college}
            setValue={setCollege}
            type={"select"}
            required={false}
            options={
              colleges.map((col) => ({ name: col.name, value: col.key }))
            }
          />
          <button
            className={"ml-2"}
          // onClick={}
          >
            <AddCircleIcon
              style={{ color: pink[400] }}
              fontSize={"large"}
            />
          </button>
          <button
            className={"ml-2"}
          // onClick={}
          >
            <RemoveCircleIcon
              style={{ color: blue[400] }}
              fontSize={"large"}
            />
          </button>
        </article>
        <p>학과</p>
        <article className={"flex flex-row mb-4"}>
          <InformationInput
            label={""}
            value={major}
            setValue={setMajor}
            type={"select"}
            required={false}
            options={
              majors.map((m) => ({ name: m.name, value: m.key }))
            }
          />
          <button
            className={"ml-2"}
          // onClick={}
          >
            <AddCircleIcon
              style={{ color: pink[400] }}
              fontSize={"large"}
            />
          </button>
          <button
            className={"ml-2"}
          // onClick={}
          >
            <RemoveCircleIcon
              style={{ color: blue[400] }}
              fontSize={"large"}
            />
          </button>
        </article>
        <p>태그</p>
        <article className={"flex flex-row mb-4"}>
          <InformationInput
            label={""}
            value={tag}
            setValue={setTag}
            type={"select"}
            required={false}
            options={
              tags.map((t) => ({ name: t.name, value: t.key }))
            }
          />
          <button
            className={"ml-2"}
            onClick={addTag}
          >
            <AddCircleIcon
              style={{ color: pink[400] }}
              fontSize={"large"}
            />
          </button>
          <button
            className={"ml-2"}
          // onClick={}
          >
            <RemoveCircleIcon
              style={{ color: blue[400] }}
              fontSize={"large"}
            />
          </button>
        </article>
        <article
          className={"w-4/5 max-w-xs flex flex-row flex-wrap text-base font-bold justify-start"}
        >
          {
            includedTags.map((tag) => (
              <TagElement
                key={tag.key}
                tagName={tag.name}
                onDelete={() => { deleteTag(tag.key); }}
              />
            ))
          }
        </article>
      </section>
      <button
        className={`${style.button.base} ${style.button.colorSet.main} mt-4`}
        // onClick={}
      >
        적용
      </button>
    </section>
  );
}
