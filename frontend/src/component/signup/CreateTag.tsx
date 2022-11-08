import * as React from "react";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
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
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);

  const changeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const toAddedTag = variousTags.find((targetTag) => (targetTag.name === event.target.value));
    setTag((toAddedTag) ? (toAddedTag) : null);
  }, [variousTags]);

  const clickHandler = () => {
    if (tag) {
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
    }
  };

  const clickConfirmHandler = useCallback(() => {
    if (tags.length !== 0) {
      setStep(4);
    }
    else {
      setHasSubmit(true);
    }
  }, [setStep, tags]);

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <p className="text-center text-pink-500/100 mt-6">
        나를 표현하는 태그를 입력해보세요!<br />
        ex) 취미 (등산, 그림, ...)
      </p>
      <div className={"flex flex-row justify-center mt-12"}>
        <select
          className={"w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          value={undefined}
          onChange={changeHandler}
        >{
            ([{ key: 0, name: "", type: "" }] as Tag[])
              .concat(variousTags)
              .map((targetTag) => (
                <option
                  key={targetTag.key}
                  value={targetTag.name}
                  className={"text-center"}
                >{
                    targetTag.name
                  }</option>
              ))
          }</select>
        <button onClick={() => clickHandler()}>
          <PlusCircleIcon className="h-8 w-8 stroke-1 stroke-white fill-pink-500" />
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
      <div className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-48 w-36 h-12 rounded-md"}
          onClick={() => clickConfirmHandler()}
        >
          다음
        </button>
      </div>
    </section>
  );
}
