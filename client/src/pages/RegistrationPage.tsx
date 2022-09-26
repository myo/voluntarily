import "./styles/ConnectPage.scss"
import { TextBox } from "../components/TextBox";

export const RegistrationPage = () => { return (
    <form action={process.env.REACT_APP_API_URL + "/register"} method="POST">
        <TextBox name="name" placeholder="John Smith"></TextBox>
        <TextBox name="email" placeholder="youremail@gmail.com"></TextBox>
        <TextBox name="phone" placeholder="0720123456"></TextBox>
        <TextBox type="password" name="password"></TextBox>
        <input type="submit" value="join us!"></input>
    </form>
    );
};