import { IAction, AppPage } from "../types";
import { Reducer } from "redux";

export interface IProfileState {
  firstname: null | string;
  lastname: null | string;
  middlename: null | string;
  dob: null | Date;
}

const initalState: () => IProfileState = () => ({
  firstname: null,
  lastname: null,
  middlename: null,
  dob: null
});

const reducer: Reducer<IProfileState, IAction> = function(state = initalState(), { type, payload }: IAction) {
  switch (type) {
    case "PROFILE_FETCH":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
