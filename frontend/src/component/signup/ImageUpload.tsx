import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import style from "../../constant/style";
import ImageUploadIcon from "./ImageUploadIcon";


type PhotoInfo = {
  file: File | null;
  src: string;
}
type FixedSizePhotoInfoArray = [
  PhotoInfo, PhotoInfo, PhotoInfo, PhotoInfo, PhotoInfo,
  PhotoInfo, PhotoInfo, PhotoInfo, PhotoInfo, PhotoInfo,
]
const initPhotoInfo = (): PhotoInfo => (
  {
    file: null,
    src: "plus.jpeg",
  }
);

export interface IProps {
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ImageUpload({
  setUploadedPhotos,
  setStep,
}: IProps) {
  const [photoInfos, setPhotoInfos] = useState<FixedSizePhotoInfoArray>(
    [
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
    ]
  );
  const photoNumber = useMemo(
    () => photoInfos.filter((p) => p.file !== null).length,
    [photoInfos]
  );

  const setIthPhoto = useCallback((i: number, file: File) => {
    const newPhotos: FixedSizePhotoInfoArray = [...photoInfos];
    newPhotos[i] = { file, src: URL.createObjectURL(file) };
    setPhotoInfos(newPhotos);
  }, [photoInfos, setPhotoInfos]);

  const removeIthPhoto = useCallback((i: number) => {
    const newFixedSizePhotos: FixedSizePhotoInfoArray = [
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
    ];
    photoInfos.forEach((photo, index) => {
      if (index < i) {
        newFixedSizePhotos[index] = photoInfos[index];
      }
      else if (index > i) {
        newFixedSizePhotos[index - i] = photoInfos[index];
      }
    });
    setPhotoInfos(newFixedSizePhotos);
  }, [photoInfos, setPhotoInfos]);

  const confirmOnClick = useCallback(() => {
    setUploadedPhotos(
      photoInfos
        .filter((info) => (info.file !== null))
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((info) => info.file!)
    );
    setStep(6);
  }, [photoInfos, setUploadedPhotos, setStep]);

  return (
    <section className={style.page.base}>
      <p className={style.component.signIn.notification}>
        나를 대표할 수 있는<br/>
        사진을 올려주세요!
      </p>
      <section className={"flex-1 flex flex-col"}>
        <section className={"grid grid-cols-2 gap-2 px-12"}>
          {
            photoInfos.map((info, index) => (
              info.file ?
                (
                  <ImageUploadIcon
                    key={index}
                    index={index}
                    src={info.src}
                    setIthPhoto={setIthPhoto}
                    removeIthPhoto={removeIthPhoto}
                  />
                ) :
                index === photoNumber ?
                  <ImageUploadIcon
                    key={index}
                    index={photoNumber}
                    src={info.src}
                    setIthPhoto={setIthPhoto}
                    removeIthPhoto={removeIthPhoto}
                    showDeleteButton={false}
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
