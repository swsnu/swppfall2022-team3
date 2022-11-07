import React, { Dispatch, SetStateAction } from "react";


// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
