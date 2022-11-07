import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { Gender } from "../../types";


const dateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
};

interface IProps {
  label: string,
  value: string | Date,
  type: HTMLInputTypeAttribute | "select",
  onChange: ChangeEventHandler,
  shouldWarn?: boolean,
  placeholder?: string,
  options?: { name: string, value: string | Gender | number }[],
}

export default function InformationInput({
  label,
  value,
  type,
  onChange,
  placeholder,
  options,
  shouldWarn = false,
}: IProps) {
  return (
    <article className={`flex flex-col mx-12 item-center ${shouldWarn ? "" : "mb-6"}`}>
      <article className={"font-bold"}>
        {label}
      </article>
      {
        type === "select" ?
          <select
            className={"w-64 h-10 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
            value={value as string}
            onChange={onChange}
          >
            {
              options?.map(({ name, value }) => (
                <option
                  key={value}
                  value={value}
                >
                  { name }
                </option>
              ))
            }
          </select> :
          <input
            className={"w-64 h-10 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
            placeholder={placeholder}
            type={type}
            value={(typeof value === "string") ? value : dateToString(value)}
            onChange={onChange}
          />
      }
      {
        shouldWarn ?
          <article className={"h-6 ml-8 text-red-500 text-xs"}>필수 작성 항목입니다.</article>:
          null
      }
    </article>
  );
}
