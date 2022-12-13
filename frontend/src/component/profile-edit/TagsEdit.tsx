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
import { getLoginUser, selectUser } from "../../store/slices/user";
import { userUrl } from "../../store/urls";
import { Tag } from "../../types";
import AlertModal from "../AlertModal";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<JSX.Element>(<div/>);

  const cancelOnClick = useCallback( () => {
    onModalClose();
  },
  [onModalClose]);

  const confirmOnClick = useCallback( async () => {
    if (!loginUser) {
      return;
    }
    if (newTags.length === 0) {
      setModalMessage(<p>최소한 한 개의 태그가 있어야 해요.</p>);
      setModalOpen(true);
      return;
    }

    await axios.delete(`${userUrl}/${loginUser.key}${paths.tag}/`);
    await axios.post(`${userUrl}/${loginUser.key}${paths.tag}/`, { tags: newTags.map((tag) => tag.key) });
    await dispatch(getLoginUser(loginUser.key));
    onModalClose();
  },
  [dispatch, loginUser, onModalClose, newTags]);

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
    <section>
      <AlertModal
        description={modalMessage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <section className={"h-fit w-80 max-w-xs max flex flex-col items-center bg-white p-4 space-y-8"}>
        <section className={"space-y-4"}>
          <p>수정할 태그를 선택해 주세요.</p>
          <section className={"w-full flex-1 flex flex-col"}>
            <div className={"flex flex-row justify-center mt-2"}>
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
                        .map(({ name, key }) => (<MenuItem value={key} key={key}>{name}</MenuItem>))
                    }
                  </Select>
                </FormControl>
              </article>
              <button
                className={"add-tag-button ml-2"}
                onClick={addTagOnClick}
              >
                <AddCircleIcon
                  style={{ color: pink[500] }}
                  fontSize={"large"}
                />
              </button>
            </div>
            <article
              className={"flex flex-row flex-wrap text-base font-bold justify-start mt-4"}
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
        <article className={"flex flex-col mt-8"}>
          <button
            className={`${style.button.base} ${style.button.colorSet.main}`}
            onClick={confirmOnClick}
          >
          적용
          </button>
          <button
            className={`${style.button.base} ${style.button.colorSet.secondary} mt-4`}
            onClick={cancelOnClick}
          >
          취소
          </button>
        </article>
      </section>
    </section>
  );
}
