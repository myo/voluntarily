import {IState, IAction, ActionType} from "./AppTypes";

export const reducer = (state: IState, action: IAction) : IState => {
    switch(action.type) {
        case (ActionType.LOADING_COMPLETE): {
            return {...state, isLoading: false};
        }
        case (ActionType.USER_REGISTRATION_START):
        case (ActionType.USER_LOGIN_START): {
            return {...state, isLoading: true, showError: false};
        }
        case (ActionType.USER_REGISTRATION_ERROR):
        case (ActionType.USER_LOGIN_ERROR): {
            return {...state, isLoading: false, showError: true, errorMessage: action.payload};
        }
    }
    return state;
}