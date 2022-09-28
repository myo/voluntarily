import "./styles/ConnectPage.scss"
import { TextBox } from "../components/TextBox";
import {useState, useContext} from "react";
import axios, {AxiosInstance} from "axios";
import { AppContext } from '../context/AppContext';
import { ActionType } from "../context/AppTypes";

const initialState = { name: "", email: "", phone: "", password: "" };

export const RegistrationPage = () => { 
    const [connectData, setConnectData] = useState(initialState);
    
    const appContext = useContext(AppContext);
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnectData({...connectData, [e.target.name]: e.target.value});
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/register", connectData).then((res) => {
            if (res.data.token) {
                appContext.dispatch({type: ActionType.USER_LOGIN_SUCCESS, payload: res.data.token});
                console.log(appContext.state.token);
            }
        });
    };

    return (
    <form onSubmit={submitHandler}>
        <TextBox name="name" placeholder="John Smith" value={connectData.name} onChange={changeHandler}></TextBox>
        <TextBox name="email" placeholder="youremail@gmail.com" value={connectData.email} onChange={changeHandler}></TextBox>
        <TextBox name="phone" placeholder="0720123456" value={connectData.phone} onChange={changeHandler}></TextBox>
        <TextBox type="password" name="password" value={connectData.password} onChange={changeHandler}></TextBox>
        <input type="submit" value="join us!"></input>
    </form>
    );
};