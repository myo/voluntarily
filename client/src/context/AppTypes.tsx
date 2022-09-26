export enum ActionType {
    USER_REGISTRATION_START,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_ERROR,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR
}
export interface IState {
    isLoading: boolean,
    showError: boolean,
    errorMessage: string,
}
export interface IAction {
    type: ActionType,
    payload: any
}
export type AppContextType = {
    state: IState, 
    dispatch: React.Dispatch<any>;
}