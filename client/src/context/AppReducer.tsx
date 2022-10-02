import axios from "axios";
import {IState, IAction, ActionType} from "./AppTypes";
import { setLanguage } from "../i18n";

export const reducer = (state: IState, action: IAction) : IState => {
    switch(action.type) {
        case (ActionType.LOADING_START): {
            return {...state, isLoading: true};
        }
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
        case (ActionType.UPDATE_USER): {
            const newUser = {...state.user, ...action.payload.user};
            localStorage.setItem("user", JSON.stringify(newUser));

            const result = {...state, user: newUser, isLoading: false, showError: false};
            if (action.payload.token)
            {
                localStorage.setItem("token", action.payload.token);
                result.token = action.payload.token;
                result.axiosWithBearer = axios.create({headers: {"Authorization": "Bearer " + action.payload.token}});
            }
            return result;
        }
        case (ActionType.SET_LANGUAGE): {
            setLanguage(action.payload.language);
            return {...state, language: action.payload.language}
        }
    }
    return state;
}