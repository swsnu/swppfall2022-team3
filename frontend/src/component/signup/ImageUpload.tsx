import React, { Dispatch, SetStateAction } from "react";


interface IProp {
  images: File[],
  setImages: Dispatch<SetStateAction<File[]>>,
  setStep: Dispatch<SetStateAction<number>>,
}

export default function ImageUpload({
  images,
  setImages,
  setStep,
}: IProp) {
  return (
    <section>
      this is image upload page
    </section>
  );
}
