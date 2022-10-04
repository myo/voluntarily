import "./styles/UserMenu.scss";
import { userStrings } from "../i18n";
import { useAppContext } from "../context/AppContext";
import { ActionType } from "../context/AppTypes";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {

    const appContext = useAppContext();
    const navigate = useNavigate();

    return <div id="UserMenu" 
                style={{display: appContext.state.userMenuOpen ? "block" : "none"}}
                onClick={() => {}}>
        <p onClick={() => {
            appContext.dispatch({type: ActionType.USER_LOGOUT, payload:undefined});
            navigate("/");
            }}>{userStrings.logOut}</p>
    </div>
}