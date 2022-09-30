import { AxiosInstance } from "axios";

export enum ActionType {
    LOADING_START,
    LOADING_COMPLETE,
    UPDATE_USER,
    USER_REGISTRATION_START,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_ERROR,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
};
export interface IState {
    token: string,
    user: any,
    axiosWithBearer?: AxiosInstance | undefined,
    isLoading: boolean,
    showError: boolean,
    errorMessage: string,
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
    SetupUser: (type: ActionType, payload: UserSetupPayload, replaceExisting?: boolean) => void,
};