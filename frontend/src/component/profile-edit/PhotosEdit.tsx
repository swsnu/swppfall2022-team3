import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "../../constant/style";
import { AppDispatch } from "../../store";
import { fetchLoginUser, selectUser } from "../../store/slices/user";
import { photoUrl, userUrl } from "../../store/urls";
import ImageUploadIcon from "../signup/ImageUploadIcon";


type PhotoInfo = {
  type: "url" | "file";
  key: number;
  file: File | null;
  src: string;
}

type RawUserPhoto = {
  key: number;
  name: string;
}

const rawDataToPhotoInfo = (rawData: RawUserPhoto): PhotoInfo => ({
  type: "url",
  key: rawData.key,
  file: null,
  src: rawData.name,
});

type FixedSizePhotoInfoArray = [
  PhotoInfo, PhotoInfo, PhotoInfo,
  PhotoInfo, PhotoInfo, PhotoInfo,
  PhotoInfo, PhotoInfo, PhotoInfo,
]

const initPhotoInfo = (): PhotoInfo => ({
  type: "file",
  key: -1,
  file: null,
  src: "/plus.jpeg",
});

export interface IProps {
  setPhotoEdit: Dispatch<SetStateAction<boolean>>;
}

export default function PhotosEdit({
  setPhotoEdit,
}: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const dispatch = useDispatch<AppDispatch>();
  const [photoInfos, setPhotoInfos] = useState<FixedSizePhotoInfoArray>(
    [
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
    ]
  );
  const [beDeletedPhotoKeys, setBeDeletedPhotoKeys] = useState<number[]>([]);
  const photoNumber = useMemo(
    () => photoInfos.filter((p) => (p.file !== null) || (p.type === "url")).length,
    [photoInfos]
  );

  useEffect(() => {
    axios.get(`${userUrl}${loginUser?.key}/photo/`).then((response) => {
      if (response.status === 200) {
        const rawUserPhotos = response.data as RawUserPhoto[];
        const existingPhotoInfo = rawUserPhotos.map(rawDataToPhotoInfo);
        const newPhotoInfos: FixedSizePhotoInfoArray = [
          initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
          initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
          initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
        ];
        existingPhotoInfo.forEach((photoInfo, idx) => {
          if (idx < 9) {
            newPhotoInfos[idx] = photoInfo;
          }
        });
        setPhotoInfos(newPhotoInfos);
      }
    });
  }, [loginUser, setPhotoInfos]);

  const setIthPhoto = useCallback((i: number, file: File) => {
    const newPhotos: FixedSizePhotoInfoArray = [...photoInfos];
    newPhotos[i] = {
      type: "file",
      key: -1,
      file,
      src: URL.createObjectURL(file)
    };
    setPhotoInfos(newPhotos);
  }, [photoInfos, setPhotoInfos]);

  const removeIthPhoto = useCallback((i: number) => {
    const newFixedSizePhotos: FixedSizePhotoInfoArray = [
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
      initPhotoInfo(), initPhotoInfo(), initPhotoInfo(),
    ];
    photoInfos.forEach((photo, index) => {
      if (index < i) {
        newFixedSizePhotos[index] = photoInfos[index];
      }
      else if (index > i) {
        newFixedSizePhotos[index - 1] = photoInfos[index];
      }
      else {
        if (photo.type === "url") {
          const newBeDeletedPhotoKeys = [...beDeletedPhotoKeys];
          newBeDeletedPhotoKeys.push(photo.key);
          setBeDeletedPhotoKeys(newBeDeletedPhotoKeys);
        }
      }
    });
    setPhotoInfos(newFixedSizePhotos);
  }, [photoInfos, setPhotoInfos, setBeDeletedPhotoKeys, beDeletedPhotoKeys]);

  const confirmOnClick = useCallback(async () => {
    if (!loginUser) {
      return;
    }
    const uploadedPhotos: File[] = photoInfos
      .filter((info) => (info.file !== null) && (info.type === "file"))
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((info) => info.file!);
    for (const photo of uploadedPhotos) {
      const form = new FormData();
      form.append("file", photo);
      await axios.post(`${photoUrl}user/${loginUser.key}/`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Disposition": `form-data; filename=${photo.name};`,
        },
      });
    }
    for (const photoKey of beDeletedPhotoKeys) {
      await axios.delete(`${photoUrl}${photoKey}/`);
    }
    await dispatch(fetchLoginUser(loginUser.key)).then(() => {
      setPhotoEdit(false);
    });
  }, [loginUser, photoInfos, beDeletedPhotoKeys, dispatch, setPhotoEdit]);

  const backOnClick = useCallback(() => {
    setPhotoEdit(false);
  }, [setPhotoEdit]);

  return (
    <section className={style.page.base}>
      <p className={style.component.signIn.notification}>
        나를 대표할 수 있는<br/>
        사진을 올려주세요!
      </p>
      <section className={"flex-1 flex flex-col"}>
        <section className={"grid grid-cols-3 gap-2 px-12"}>
          {
            photoInfos.map((info, index) => (
              info.file || (info.type === "url") ?
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
          className={`${style.button.base} ${style.button.colorSet.secondary} mb-2`}
          onClick={backOnClick}
        >
          뒤로 가기
        </button>
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
