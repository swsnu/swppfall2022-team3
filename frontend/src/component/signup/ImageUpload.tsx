import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import style from "../../constant/style";
import ImageUploadIcon from "./ImageUploadIcon";


type nullableFile = File | null;
type FixedSizePhotoArray = [
  nullableFile, nullableFile, nullableFile, nullableFile, nullableFile,
  nullableFile, nullableFile, nullableFile, nullableFile, nullableFile,
]

export interface IProps {
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ImageUpload({
  setUploadedPhotos,
  setStep,
}: IProps) {
  const [fixedSizePhotos, setFixedSizePhotos] = useState<FixedSizePhotoArray>(
    [
      null, null, null, null, null,
      null, null, null, null, null,
    ]
  );
  const photoNumber = useMemo(
    () => fixedSizePhotos.filter((p) => p !== null).length,
    [fixedSizePhotos]
  );

  const setIthPhoto = useCallback((i: number, file: File) => {
    const newPhotos: FixedSizePhotoArray = [...fixedSizePhotos];
    newPhotos[i] = file;
    setFixedSizePhotos(newPhotos);
  }, [fixedSizePhotos, setFixedSizePhotos]);

  const confirmOnClick = useCallback(() => {
    setUploadedPhotos(fixedSizePhotos.filter((p) => (p !== null)) as File[]);
    setStep(6);
  }, [fixedSizePhotos, setUploadedPhotos, setStep]);

  return (
    <section className={style.page.base}>
      <p className={style.component.signIn.notification}>
        나를 대표할 수 있는<br/>
        사진을 올려주세요!
      </p>
      <section className={"flex-1 flex flex-col"}>
        <section className={"grid grid-cols-2 gap-2 px-12"}>
          {
            fixedSizePhotos.map((photo, index) => (
              photo ?
                (
                  <ImageUploadIcon
                    key={index}
                    index={index}
                    setIthPhoto={setIthPhoto}
                  />
                ) :
                index === photoNumber ?
                  <ImageUploadIcon
                    key={index}
                    index={photoNumber}
                    setIthPhoto={setIthPhoto}
                  /> :
                  null
            ))
          }
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
