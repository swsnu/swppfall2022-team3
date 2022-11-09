import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { pink } from "@mui/material/colors";
import { selectTag } from "../../store/slices/tag";
import { Tag } from "../../types";


interface IProps {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function CreateTag({
  tags,
  setTags,
  setStep,
}: IProps) {
  const existingTags = useSelector(selectTag).tags;
  const [tag, setTag] = useState<Tag | null>(null);
  const [selectedTagKey, setSelectedTagKey] = useState<number>(0);
  const [submittedWithNoTag, setSubmittedWithNoTag] = useState<boolean>(false);

  useEffect(() => {
    const targetTag = existingTags.find((t) => (t.key === selectedTagKey));
    setTag(targetTag ?? null);
  }, [setTag, selectedTagKey, existingTags]);

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
    } else {
      setSubmittedWithNoTag(true);
    }
  }, [setStep, tags]);

  return (
    <section className={"flex flex-col items-center w-full"}>
      <section className={"w-full mt-16 flex-1 flex flex-col items-center"}>
        <p className="text-center text-pink-500/100">
          나를 표현하는 태그를 입력해보세요!<br />
          ex) 취미 (등산, 그림, ...)
        </p>
        <section className={"flex flex-col w-72"}>
          <div className={"flex-none flex flex-row justify-center mt-8"}>
            <article className={"flex flex-col item-center"}>
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
                      .concat(existingTags)
                      .map((t) => ({ name: t.name, value: t.key }))
                      .map(({ name, value }) => (<MenuItem value={value} key={value}>{name}</MenuItem>))
                  }
                </Select>
              </FormControl>
            </article>
            <button
              className={"ml-2"}
              onClick={addTagOnClick}
            >
              <AddCircleIcon
                style={{ color: pink[500] }}
                fontSize="large"
              />
            </button>
          </div>
          <article className={"ml-2 text-red-500 mb-4 text-sm"}>{(submittedWithNoTag) ? "최소한 한 개의 태그가 있어야 해요." : " "}</article>
          <article className={"flex-none w-full flex flex-row flex-wrap text-base font-bold text-pink-500 justify-start"}>
            {tags.map((t) =>
              <div key={t.key} className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
                {t.name}
              </div>
            )}
          </article>
        </section>
      </section>
      <button
        className={"w-36 min-h-12 h-12 mt-12 mb-12 bg-pink-500 text-center text-white rounded-md"}
        onClick={confirmOnClick}
      >
        다음
      </button>
    </section>
  );
}
