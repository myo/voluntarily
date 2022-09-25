import "./styles/NavBar.scss"
import { Logo } from "./Logo";

export const NavBar = () => {
    return (
    <header id="NavBar">
        <a href="/">
            <Logo width="3em" height="3em"/>
        </a>
        <div id="ConnectArea">
            <a id="ConnectButton" href="/login">connect</a>
            &nbsp;/&nbsp; 
            <a id="RegisterButton" href="/register">join us!</a>
        </div>
    </header>);
}