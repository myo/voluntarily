import Loading from "../components/Loading";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext";
import { ActionType } from "../context/AppTypes";

export const HomePage = () => {
    const appContext = useAppContext();
    const navigator = useNavigate();
    useEffect(() => {
        if (appContext.state.token?.length > 0)
        {
            if (!appContext.state.user?.username?.length)
            {
                navigator("/members/create-profile");
            }
        }
    });
    return <div><Loading text="Loading..." opacity={0} height="calc(100% - 3em)"/></div>
};