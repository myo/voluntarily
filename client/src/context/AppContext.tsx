import {createContext, useReducer} from "react";
import {IState, AppContextType} from "./AppTypes";
import {reducer} from "./AppReducer";

const initialState : IState = {
    isLoading: false,
    showError: false,
    errorMessage: "",
};

const AppContext = createContext<AppContextType>({state: initialState, dispatch: () => {}});

export const AppProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
    <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
    );
};