import { Action } from "redux";

export type AppPage = "login";

export interface IAction extends Action<ActionType> {
  payload?: any;
}

export type ActionType = "APP_PAGE";
