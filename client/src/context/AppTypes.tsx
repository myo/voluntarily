import { AxiosInstance } from "axios";
import { IUser } from "../../../common/user";

export enum ActionType {
    LOADING_START,
    LOADING_COMPLETE,
    UPDATE_USER,
    USER_REGISTRATION_START,
    USER_REGISTRATION_ERROR,
    USER_LOGIN_START,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    SET_LANGUAGE,
    TOGGLE_USER_MENU,
};
export interface IState {
    language: string,
    token?: string,
    user?: IUser,
    axiosWithBearer?: AxiosInstance | undefined,
    isLoading: boolean,
    showError: boolean,
    errorMessage: string,
    userMenuOpen: boolean,
};
export interface IAction {
    type: ActionType,
    payload?: any | undefined
};
export type UserSetupPayload = {
    token: string,
    user: any
}
export type AppContextType = {
    state: IState, 
    dispatch: React.Dispatch<any>,
};