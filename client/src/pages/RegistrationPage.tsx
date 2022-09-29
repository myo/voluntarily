import "./styles/ConnectForm.scss"
import { TextBox } from "../components/TextBox";
import {useState, useContext} from "react";
import axios from "axios";
import { AppContext } from '../context/AppContext';
import { ActionType } from "../context/AppTypes";
import { useNavigate } from 'react-router-dom'

const initialState = { email: "", phone: "", password: "" };

export const RegistrationPage = () => { 
    const [connectData, setConnectData] = useState(initialState);
    
    const appContext = useContext(AppContext);

    const navigate = useNavigate();
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnectData({...connectData, [e.target.name]: e.target.value});
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/register", connectData).then((res) => {
            if (res.data.token) {
                appContext.SetupUser(ActionType.USER_REGISTRATION_SUCCESS, res.data);
                navigate("/");
            }
        });
    };

    return (
    <div className="connect">
        <form onSubmit={submitHandler}>
            <TextBox name="email" placeholder="youremail@gmail.com" value={connectData.email} onChange={changeHandler}></TextBox>
            <TextBox name="phone" placeholder="0720123456" value={connectData.phone} onChange={changeHandler}></TextBox>
            <TextBox type="password" name="password" value={connectData.password} onChange={changeHandler}></TextBox>
            <input type="submit" value="join us!"></input>
        </form>
    </div>
    );
};