import React from "react";


interface IProp {
  images: File[],
  setImages: Function,
  setStep: Function,
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
  )
}
