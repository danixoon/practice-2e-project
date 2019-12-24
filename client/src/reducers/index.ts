import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer, { IAppState } from "./appReducer";

export interface IRootState {
  app: IAppState;
}

const rootReducer = (history: any) =>
  combineReducers<IRootState>({
    app: appReducer
  });

export default rootReducer;
