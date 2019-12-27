import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";

import appReducer, { IAppState } from "./appReducer";
import accountReducer, { IAccountState } from "./accountReducer";
import profileReducer, { IProfileState } from "./profileReducer";

export interface IRootState {
  app: IAppState;
  account: IAccountState;
  profile: IProfileState;
  router: RouterState;
}

const rootReducer = (history: any) =>
  combineReducers<IRootState>({
    app: appReducer,
    account: accountReducer,
    profile: profileReducer,
    router: connectRouter(history)
  });

export default rootReducer;
