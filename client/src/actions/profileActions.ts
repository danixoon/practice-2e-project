import axios from "axios";
import { IRootState } from "../reducers";

import { IAction, AppPage } from "../types";
import { ThunkAction } from "redux-thunk";

export const fetchProfile: () => ThunkAction<any, IRootState, null, IAction> = () => (dispatch, getState) => {
  axios.get("/api/profile").then(res => {
    dispatch({ type: "PROFILE_FETCH", payload: res.data });
  });
};
