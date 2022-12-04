import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import paths from "../constant/path";
import { AppDispatch } from "../store";
import { getUser } from "../store/slices/user";


export function ProfileOnClick(userKey: number) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profileOnClick = useCallback(async () => {
    dispatch(getUser(userKey)).then(() => {
      navigate(paths.profile);
    });
  }, [navigate, userKey, dispatch]);
  return profileOnClick;
}

