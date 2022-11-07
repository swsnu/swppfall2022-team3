import React, { Dispatch, SetStateAction } from "react";


interface IProps {
  introduction: string,
  setIntroduction: Dispatch<SetStateAction<string>>,
  setStep: Dispatch<SetStateAction<number>>,
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
  );
}
