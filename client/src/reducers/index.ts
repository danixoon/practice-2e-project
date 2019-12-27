import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";

import appReducer, { IAppState } from "./appReducer";
import accountReducer, { IAccountState } from "./accountReducer";

export interface IRootState {
  app: IAppState;
  account: IAccountState;
  router: RouterState;
}

const rootReducer = (history: any) =>
  combineReducers<IRootState>({
    app: appReducer,
    account: accountReducer,
    router: connectRouter(history)
  });

export default rootReducer;
