import React, { Dispatch, SetStateAction, useCallback } from "react";
import style from "../../constant/style";
import ImageUploadIcon from "./ImageUploadIcon";


interface IProps {
  uploadedPhotos: File[];
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ImageUpload({
  uploadedPhotos,
  setUploadedPhotos,
  setStep,
}: IProps) {
  const confirmOnClick = useCallback(() => {
    setStep(6);
  }, [setStep]);

  return (
    <section className={style.page.base}>
      <p className={style.component.signIn.notification}>
        나를 대표할 수 있는<br />
        사진을 올려주세요!
      </p>
      <section className={"flex-1 flex flex-col"}>
        <section className={"grid grid-cols-2 gap-2 px-12"}>
          {uploadedPhotos.map((photo, index) => {
            return <ImageUploadIcon
              key={index}
              src={""}
              disabled={true}
              uploadedPhotos={uploadedPhotos}
              setUploadedPhotos={setUploadedPhotos}
            />;
          })}
          <ImageUploadIcon
            src="plus.jpeg"
            disabled={false}
            uploadedPhotos={uploadedPhotos}
            setUploadedPhotos={setUploadedPhotos}
          />
        </section>
      </section>
      <article className={`text-center text-${style.color.main} mt-6`}>
        ※ 본인의 사진이어야 합니다.
      </article>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main}`}
          onClick={confirmOnClick}
        >
          완료
        </button>
      </section>
    </section>
  );
}
