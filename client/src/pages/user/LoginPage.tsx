import "../styles/ConnectForm.scss"
import { TextBox } from "../../components/TextBox";
import {useState} from "react";
import axios from "axios";
import { useAppContext } from '../../context/AppContext';
import { ActionType } from "../../context/AppTypes";
import { useNavigate } from 'react-router-dom'
import { userStrings } from "../../i18n";

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
    <div className="ConnectForm">
        <form autoComplete="off" onSubmit={submitHandler}>
            <TextBox name="email" label={userStrings.email} placeholder="youremail@gmail.com" value={connectData.email} onChange={changeHandler}></TextBox>
            <TextBox type="password" name="password" label={userStrings.password} value={connectData.password} onChange={changeHandler}></TextBox>
            <input type="submit" value={userStrings.connect}></input>
        </form>
    </div>
    );
};