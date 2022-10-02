import "./styles/ConnectForm.scss"
import { TextBox } from "../components/TextBox";
import {useState} from "react";
import axios from "axios";
import { useAppContext } from '../context/AppContext';
import { ActionType } from "../context/AppTypes";
import { useNavigate } from 'react-router-dom'

const initialState = { email: "", password: "" };

export const LoginPage = () => { 
    const [connectData, setConnectData] = useState(initialState);
    
    const appContext = useAppContext();

    const navigate = useNavigate();
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnectData({...connectData, [e.target.name]: e.target.value});
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/login", connectData).then((res) => {
            if (res.data.token) {
                appContext.dispatch({type: ActionType.UPDATE_USER, payload: res.data});
                navigate("/");
            }
        });
    };

    return (
    <div className="connect">
        <form onSubmit={submitHandler}>
            <TextBox name="email" placeholder="youremail@gmail.com" value={connectData.email} onChange={changeHandler}></TextBox>
            <TextBox type="password" name="password" value={connectData.password} onChange={changeHandler}></TextBox>
            <input type="submit" value="connect"></input>
        </form>
    </div>
    );
};