import React from "react";


interface IProps {
  introduction: string,
  setIntroduction: Function,
  setStep: Function,
}

export default function Introduction({
  introduction,
  setIntroduction,
  setStep,
}: IProps) {
  return (
    <section>
      this is introduction page
    </section>
  )
}
