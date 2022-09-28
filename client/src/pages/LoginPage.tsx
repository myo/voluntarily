import "./styles/ConnectPage.scss"
import { TextBox } from "../components/TextBox";
import {useState, useContext} from "react";
import axios, {AxiosInstance} from "axios";
import { AppContext } from '../context/AppContext';
import { ActionType } from "../context/AppTypes";

const initialState = { email: "", password: "" };

export const LoginPage = () => { 
    const [connectData, setConnectData] = useState(initialState);
    
    const appContext = useContext(AppContext);
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnectData({...connectData, [e.target.name]: e.target.value});
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/login", connectData).then((res) => {
            if (res.data.token) {
                appContext.dispatch({type: ActionType.USER_LOGIN_SUCCESS, payload: res.data.token});
                appContext.state.axiosWithBearer?.get("http://localhost:9001/api/v1/member/create/");
            }
        });
    };

    return (
    <form onSubmit={submitHandler}>
        <TextBox name="email" placeholder="youremail@gmail.com" value={connectData.email} onChange={changeHandler}></TextBox>
        <TextBox type="password" name="password" value={connectData.password} onChange={changeHandler}></TextBox>
        <input type="submit" value="connect"></input>
    </form>
    );
};