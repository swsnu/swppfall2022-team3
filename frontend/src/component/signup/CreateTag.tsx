import React from "react";
import { Tag } from "../../types";


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
  return (
    <section>
      this is create tag page
    </section>
  )
}
