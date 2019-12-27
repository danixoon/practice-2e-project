import { IAction, AppPage } from "../types";
import { Reducer } from "redux";

export interface IAccountState {
  token: null | string;
  role: null | "admin" | "user";
  userId: null | string;
}

const initalState: () => IAccountState = () => ({
  token: null,
  role: null,
  userId: null
});

const reducer: Reducer<IAccountState, IAction> = function(state = initalState(), { type, payload }: IAction) {
  switch (type) {
    case "ACCOUNT_TOKEN":
      return { ...state, token: payload.token };
    case "ACCOUNT_DATA": {
      return { ...state, ...payload };
    }
    case "ACCOUNT_LOGOUT":
      return initalState();
    default:
      return state;
  }
};

export default reducer;
