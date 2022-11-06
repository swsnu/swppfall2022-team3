import React, { ChangeEvent, useCallback, useState } from "react";
import { selectTag } from "../../store/slices/tag";
import { Tag } from "../../types";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";


interface IProps {
  tags: Tag[],
  setTags: Function,
  setStep: Function,
}

export default function CreateTag({
  tags,
  setTags,
  setStep,
}: IProps) {
  const variousTags = useSelector(selectTag).tags;
  const [tag, setTag] = useState<Tag | null>(null);

  const changeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setTag(variousTags.find((targetTag) => (targetTag.name === event.target.value))!);
  }, [variousTags]);

  const clickHandler = () => {
    if (tag) {
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
    }
  };

  const clickConfirmHandler = useCallback(() => {
    setStep(4);
  }, [setStep]);

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
          disabled={tags.length === 0}
        >
          확인
        </button>
      </div>
    </section>
  );
}
