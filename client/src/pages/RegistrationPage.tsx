import { TextBox } from "../components/TextBox";

export const RegistrationPage = () => { return (
    <form>
        <TextBox name="email" placeholder="youremail@gmail.com"></TextBox>
        <TextBox name="phone" placeholder="0720123456"></TextBox>
        <TextBox type="password" name="password"></TextBox>
    </form>
    );
};