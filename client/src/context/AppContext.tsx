import {createContext, useContext, useReducer} from "react";
import {IState, AppContextType} from "./AppTypes";
import {reducer} from "./AppReducer";
import axios from "axios";
import {getLanguage} from "../i18n";

let storedToken = localStorage.getItem("token") || "";
let storedUser = JSON.parse(localStorage.getItem("user") || "{}");
let axiosWithBearer = storedToken.length > 0 ? axios.create({headers: {"Authorization": "Bearer " + storedToken}}) : undefined;

const initialState : IState = {
    language: getLanguage(),
    token: storedToken,
    user: storedUser,
    axiosWithBearer: axiosWithBearer,
    isLoading: true,
    showError: false,
    errorMessage: "",
    userMenuOpen: false
};

export const AppContext = createContext<AppContextType>({state: initialState, dispatch: () => {}});

export const AppProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
    <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};