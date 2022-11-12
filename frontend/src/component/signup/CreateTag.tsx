import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { pink } from "@mui/material/colors";
import style from "../../constant/style";
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
    <section className={style.page.base}>
      <p className={style.component.signIn.notification}>
        나를 표현하는 태그를 입력해보세요!<br />
        ex) 취미 (등산, 그림, ...)
      </p>
      <section className={"w-full flex-1 flex flex-col items-center"}>
        <div className={"flex flex-row justify-center mt-8"}>
          <article className={"flex flex-col item-center"}>
            <FormControl
              sx={{
                maxWidth: 320,
                minWidth: 240,
              }}
              size={"small"}
              required
            >
              <InputLabel>
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
              fontSize={"large"}
            />
          </button>
        </div>
        <article className={"ml-2 text-red-500 mb-4 text-sm"}>{(submittedWithNoTag) ? "최소한 한 개의 태그가 있어야 해요." : " "}</article>
        <article className={`w-4/5 max-w-xs flex flex-row flex-wrap text-base font-bold text-${style.color.main} justify-start`}>
          {tags.map((t) =>
            <div key={t.key} className={`flex-none px-2.5 py-0.5 m-1 rounded-2xl border-2 border-${style.color.main}`}>
              {t.name}
            </div>
          )}
        </article>
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main}`}
          onClick={confirmOnClick}
        >
          다음
        </button>
      </section>
    </section>
  );
}
