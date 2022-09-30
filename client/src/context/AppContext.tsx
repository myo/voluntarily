import {createContext, useContext, useReducer} from "react";
import {IState, AppContextType, ActionType} from "./AppTypes";
import {reducer} from "./AppReducer";
import axios from "axios";

let storedToken = localStorage.getItem("token") || "";
let storedUser = JSON.parse(localStorage.getItem("user") || "{}");
let axiosWithBearer = storedToken.length > 0 ? axios.create({headers: {"Authorization": "Bearer " + storedToken}}) : undefined;

const initialState : IState = {
    token: storedToken,
    user: storedUser,
    axiosWithBearer: axiosWithBearer,
    isLoading: true,
    showError: false,
    errorMessage: "",
};

export const AppContext = createContext<AppContextType>({state: initialState, dispatch: () => {}, SetupUser: () => {}});

export const AppProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const SetupUser = (type: ActionType, payload: any, replaceExisting: boolean = true) => {
        if (payload.token)
        {
            localStorage.setItem("token", payload.token);
        }
        if (replaceExisting)
        {
            const existingUser = JSON.parse(localStorage.getItem("user") || "false");
            if (existingUser) {
                const result = {...existingUser, ...payload.user};
                localStorage.setItem("user", JSON.stringify(result));
                dispatch({type: ActionType.UPDATE_USER, payload: {user: result}});
                return;
            }
        }
        localStorage.setItem("user", JSON.stringify(payload.user));
        dispatch({type: type, payload: payload});
    }

    return (
    <AppContext.Provider value={{state, dispatch, SetupUser}}>
        {children}
    </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};