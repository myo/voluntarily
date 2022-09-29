import "./styles/GeneralForm.scss"
import { TextBox } from "../components/TextBox";
import {useState, useContext} from "react";
import axios from "axios";
import { AppContext } from '../context/AppContext';
import { ActionType } from "../context/AppTypes";
import { RichBox } from "../components/RichBox";

const initialState = { name: "", familyName: "", job: "", facebook: "", instagram: "", description: "", previousVolunteering: "" };

export const CreateProfilePage = () => { 
    const [profileData, setprofileData] = useState(initialState);
    
    const appContext = useContext(AppContext);
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setprofileData({...profileData, [e.target.name]: e.target.value});
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/login", profileData).then((res) => {
            if (res.data.token) {
                appContext.dispatch({type: ActionType.USER_LOGIN_SUCCESS, payload: res.data.token});
                appContext.state.axiosWithBearer?.get("http://localhost:9001/api/v1/member/create/");
            }
        });
    };

    return (
    <form onSubmit={submitHandler}>
        <TextBox name="name" label="Name" placeholder="John" value={profileData.name} onChange={changeHandler}></TextBox>
        <TextBox name="familyName" label="Family name" placeholder="Smith" value={profileData.familyName} onChange={changeHandler}></TextBox>
        <TextBox name="job" label="Faculty" placeholder="Medical Faculty" value={profileData.job} onChange={changeHandler}></TextBox>
        <TextBox name="facebook" label="Facebook" placeholder="https://fb.me/zuck" value={profileData.facebook} onChange={changeHandler}></TextBox>
        <TextBox name="instagram" label="Instagram" placeholder="https://www.instagram.com/zuck" value={profileData.instagram} onChange={changeHandler}></TextBox>
        <RichBox name="description" label="Tell us about you" value={profileData.description} onChange={changeHandler}/>
        <RichBox name="previousVolunteering" label="Tell us about your volunteering past" value={profileData.previousVolunteering} onChange={changeHandler}/>
        <input type="submit" value="sign up for an interview"></input>
    </form>
    );
};