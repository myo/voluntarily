/* eslint-disable jsx-a11y/img-redundant-alt */
import "./styles/NavBar.scss"
import { Logo } from "./Logo";
import { useAppContext } from "../context/AppContext";
import { userStrings } from "../i18n";
import { ProfilePicture } from "./ProfilePicture";
import { ActionType } from "../context/AppTypes";

export const NavBar = () => {

    const appContext = useAppContext();

    return (
    <header id="NavBar">
        <div id="NavBarTopRibbon"></div>
        <div id="NavBarContainer">
            <a href="/">
                <Logo width="3em" height="3em"/>
            </a>
                {(appContext.state.user && appContext.state.user.name?.length ? 
                    <div id="ConnectedUserArea" onClick={()=>{appContext.dispatch({type: ActionType.TOGGLE_USER_MENU});}}><ProfilePicture portrait={appContext.state.user.portrait}/><div id="UserName">{appContext.state.user.name}<span>&#9660;</span></div></div> 
                : 
                    <div id="ConnectArea">
                        <a id="ConnectButton" href="/login">{userStrings.connect}</a>
                        <span>/</span>
                        <a id="RegisterButton" href="/register">{userStrings.signUp}</a>
                    </div>
                )}
            </div>
        <div id="NavBarBottomRibbon"></div>
    </header>);
}