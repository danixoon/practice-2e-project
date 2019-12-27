import { Action } from "redux";

export type AppPage = "login" | "admin" | "user";

export interface IAction extends Action<ActionType> {
  payload?: any;
}

export type ActionType = "APP_PAGE" | "ACCOUNT_TOKEN" | "ACCOUNT_DATA" | "ACCOUNT_LOGOUT" | "PROFILE_FETCH";
