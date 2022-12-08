import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { pink } from "@mui/material/colors";
import axios from "axios";
import paths from "../../constant/path";
import style from "../../constant/style";
import { AppDispatch } from "../../store";
import { selectTag } from "../../store/slices/tag";
import { fetchLoginUser, selectUser } from "../../store/slices/user";
import { userUrl } from "../../store/urls";
import { Tag } from "../../types";
import TagElement from "../signup/TagElement";


interface IProps {
  onModalClose: () => void;
}

export default function TagsEdit({ onModalClose }: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const loadedTags = useSelector(selectTag).tags;
  const dispatch = useDispatch<AppDispatch>();
  const [newTags, setNewTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [selectedTagKey, setSelectedTagKey] = useState<number>(1);


  const cancelOnClickHandler = useCallback( () => {
    onModalClose();
  },
  [onModalClose]);

  const confirmHandler = useCallback( async () => {
    if (newTags.length !== 0) {
      await axios.delete(`${userUrl}/${loginUser?.key}${paths.tag}/`);
      await axios.post(`${userUrl}/${loginUser?.key}${paths.tag}/`, { tags: newTags.map((tag) => tag.key) });
      dispatch(fetchLoginUser(loginUser?.key ?? 0));
    }
    else {
      alert("최소한 한 개의 태그가 있어야 해요.");
    }
    onModalClose();
  },
  [dispatch, loginUser?.key, onModalClose, newTags]);

  useEffect(() => {
    const targetTag = loadedTags.find((t) => (t.key === selectedTagKey));
    setSelectedTag(targetTag);
  }, [loadedTags, selectedTagKey, dispatch]);

  const addTagOnClick = useCallback(() => {
    if (selectedTag) {
      if (!newTags.includes(selectedTag)) {
        setNewTags([...newTags, selectedTag]);
      }
    }
  }, [selectedTag, newTags, setNewTags]);

  const deleteTag = useCallback((tagKey: number) => {
    const tagElements = newTags.filter((t) => t.key !== tagKey);
    setNewTags(tagElements);
  }, [newTags, setNewTags]);

  return (
    <section className={"h-fit w-fit flex flex-col items-center bg-white p-4 space-y-8"}>
      <section className={"space-y-4"}>
        <div>
          테그들을 선택해 주세요.
        </div>
        <section className={"w-full flex-1 flex flex-col items-center"}>
          <div className={"flex flex-row justify-center mt-8"}>
            <article className={"flex flex-col item-center"}>
              <FormControl
                sx={{
                  maxWidth: 320,
                  minWidth: 240,
                }}
                size={"small"}
                required
              >
                <InputLabel>
                  {"태그"}
                </InputLabel>
                <Select
                  label={"태그"}
                  variant={"outlined"}
                  value={selectedTagKey}
                  onChange={(e) => {
                    (setSelectedTagKey as Dispatch<SetStateAction<string | number>>)(e.target.value);
                  }}
                >
                  {
                    loadedTags
                      .map((t) => ({ name: t.name, value: t.key }))
                      .map(({ name, value }) => (<MenuItem value={value} key={value}>{name}</MenuItem>))
                  }
                </Select>
              </FormControl>
            </article>
            <button
              className={"ml-2"}
              onClick={addTagOnClick}
            >
              <AddCircleIcon
                style={{ color: pink[500] }}
                fontSize={"large"}
              />
            </button>
          </div>
          <article
            className={"w-4/5 max-w-xs flex flex-row flex-wrap text-base font-bold justify-start mt-4"}
          >
            {
              newTags.map((tag) => (
                <TagElement
                  key={tag.key}
                  name={tag.name}
                  onDelete={() => { deleteTag(tag.key); }}
                />
              ))
            }
          </article>
        </section>
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main} mt-16`}
          onClick={confirmHandler}
        >
          정보 수정
        </button>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary} mt-8`}
          onClick={cancelOnClickHandler}
        >
          취소
        </button>
      </section>
    </section>
  );
}
