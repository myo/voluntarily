import "./styles/ConnectPage.scss"
import { TextBox } from "../components/TextBox";

export const LoginPage = () => { return (
    <form action={process.env.REACT_APP_API_URL + "/login"} method="POST">
        <TextBox name="email" placeholder="youremail@gmail.com"></TextBox>
        <TextBox type="password" name="password"></TextBox>
        <input type="submit" value="connect"></input>
    </form>
    );
};