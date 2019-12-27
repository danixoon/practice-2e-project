import axios from "axios";
import { IRootState } from "../reducers";

import { IAction, AppPage } from "../types";
import { ThunkAction } from "redux-thunk";

export const setAccountToken: (token: string) => ThunkAction<any, IRootState, null, IAction> = token => (dispatch, getState) => {
  axios.defaults.headers.common["Authorization"] = token;
  localStorage.setItem("token", token);
  dispatch({ type: "ACCOUNT_TOKEN", payload: { token } });
};

export const setAccountData: (data: { role: "admin" | "user"; userId: string }) => ThunkAction<any, IRootState, null, IAction> = data => (dispatch, getState) => {
  dispatch({ type: "ACCOUNT_DATA", payload: data });
};

export const accountLogout: () => ThunkAction<any, IRootState, null, IAction> = () => (dispatch, getState) => {
  dispatch({ type: "ACCOUNT_LOGOUT" });
};
