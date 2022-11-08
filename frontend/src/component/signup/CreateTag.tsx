import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { selectTag } from "../../store/slices/tag";
import { Tag } from "../../types";


interface IProps {
  tags: Tag[],
  setTags: Dispatch<SetStateAction<Tag[]>>,
  setStep: Dispatch<SetStateAction<number>>,
}

export default function CreateTag({
  tags,
  setTags,
  setStep,
}: IProps) {
  const variousTags = useSelector(selectTag).tags;
  const [tag, setTag] = useState<Tag | null>(null);
  const [selectedTagKey, setSelectedTagKey] = useState<number>(0);
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);

  useEffect(() => {
    const targetTag = variousTags.find((t) => (t.key === selectedTagKey));
    setTag(targetTag ?? null);
  }, [setTag, selectedTagKey, variousTags]);

  const addTagOnClick = useCallback(() => {
    if (tag) {
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
    }
  }, [tag, tags, setTags]);

  const confirmOnClick = useCallback(() => {
    if (tags.length !== 0) {
      setStep(4);
    }
    else {
      setHasSubmit(true);
    }
  }, [setStep, tags]);

  return (
    <section className={"h-screen w-full mt-12 mb-16"}>
      <section className={"h-screen w-full h-[36rem] flex flex-col"}>
        <p className="text-center text-pink-500/100 mt-6">
          나를 표현하는 태그를 입력해보세요!<br />
          ex) 취미 (등산, 그림, ...)
        </p>
        <div className={"flex flex-row justify-center mt-12 mb-6"}>
          <article className={"flex flex-col item-center mb-6"}>
            <FormControl
              sx={{
                maxWidth: 320,
                minWidth: 240,
              }}
              size={"small"}
              required
            >
              <InputLabel id={`input-label-${"태그"}`}>
                {"태그"}
              </InputLabel>
              <Select
                label={"태그"}
                variant={"outlined"}
                value={selectedTagKey}
                onChange={(e) => {
                  (setSelectedTagKey as Dispatch<SetStateAction<string | number>>)(e.target.value as (string | number));
                }}
              >
                {
                  ([{ key: 0, name: "", type: "" }] as Tag[])
                    .concat(variousTags)
                    .map((t) => ({ name: t.name, value: t.key }))
                    .map(({ name, value }) => (<MenuItem value={value} key={value}>{name}</MenuItem>))
                }
              </Select>
            </FormControl>
          </article>
          <button onClick={addTagOnClick}>
            <PlusCircleIcon className="h-8 w-8 mb-6 stroke-1 stroke-white fill-pink-500" />
          </button>
        </div>
        <article className={"ml-12 text-red-500 text-sm"}>{(hasSubmit) ? "최소한 한 개의 태그가 있어야 해요." : " "}</article>
        <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
          {tags.map((t) =>
            <div key={t.key} className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
              {t.name}
            </div>
          )}
        </article>
      </section>
      <section className={"text-center mt-8"}>
        <button
          className={"bg-pink-500 text-center text-white w-36 h-12 rounded-md"}
          onClick={confirmOnClick}
        >
          다음
        </button>
      </section>
    </section>
  );
}
