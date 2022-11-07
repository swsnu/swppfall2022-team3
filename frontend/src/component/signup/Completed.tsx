import React, { Dispatch, SetStateAction } from "react";


interface IProps {
  setStep: Dispatch<SetStateAction<number>>,
}

export default function Completed() {
  return (
    <section>
      this is completed page
    </section>
  );
}
