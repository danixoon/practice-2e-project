
import { IRootState } from "../reducers";

import { IAction, AppPage } from "../types";
import { ThunkAction } from "redux-thunk";

export const setPage: (page: AppPage, message?: string) => ThunkAction<any, IRootState, null, IAction> = (page, message) => (dispatch, getState) => {
  
  dispatch({ type: "APP_PAGE", payload: { page, message } });
};
