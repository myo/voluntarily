import "./styles/NavBar.scss"
import { Logo } from "./Logo";
import { redirect } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const NavBar = () => {

    const appContext = useAppContext();

    return (
    <header id="NavBar">
        <div id="NavBarTopRibbon"></div>
        <div id="NavBarContainer">
            <a href="/">
                <Logo width="3em" height="3em"/>
            </a>
                {(appContext.state.user.name ? 
                    <div id="ConnectArea">Hi {appContext.state.user.name}!</div> 
                : 
                    <div id="ConnectArea">
                        <a id="ConnectButton" href="/login">connect</a>
                        &nbsp;/&nbsp; 
                        <a id="RegisterButton" href="/register">join us!</a>
                    </div>
                )}
            </div>
        <div id="NavBarBottomRibbon"></div>
    </header>);
}