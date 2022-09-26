import "./styles/NavBar.scss"
import { Logo } from "./Logo";
import { redirect } from "react-router-dom";

export const NavBar = () => {
    return (
    <header id="NavBar">
        <div id="NavBarTopRibbon"></div>
        <div id="NavBarContainer">
            <a href="/">
                <Logo width="3em" height="3em"/>
            </a>
            <div id="ConnectArea">
                <a id="ConnectButton" href="/login">connect</a>
                &nbsp;/&nbsp; 
                <a id="RegisterButton" href="/register">join us!</a>
            </div>
        </div>
        <div id="NavBarBottomRibbon"></div>
    </header>);
}