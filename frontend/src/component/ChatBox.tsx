import React from "react";


interface IProps {
  content: string,
}

export default function ChatBox({ content }: IProps) {
  return (
    <article className={"p-2"}>{
      content
    }</article>
  )
}
