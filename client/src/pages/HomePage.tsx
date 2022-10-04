import Loading from "../components/Loading";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext";
import { appStrings } from "../i18n";

export const HomePage = () => {
    const appContext = useAppContext();
    const navigator = useNavigate();
    useEffect(() => {
        if (appContext.state.token?.length)
        {
            if (!appContext.state.user?.username?.length) {
                navigator("/members/create-profile");
            }
            else if (!appContext.state.user?.portrait.length) {
                navigator("/members/upload-portrait");
            }
            
        }
    });
    return <div><Loading text={appStrings.loading} opacity={0} height="calc(100% - 3em)"/></div>
};