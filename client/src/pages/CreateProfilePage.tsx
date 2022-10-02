import "./styles/GeneralForm.scss"
import { TextBox } from "../components/TextBox";
import {useState, useContext} from "react";
import axios from "axios";
import { AppContext } from '../context/AppContext';
import { ActionType } from "../context/AppTypes";
import { RichBox } from "../components/RichBox";
import { useNavigate } from 'react-router-dom'

const initialState = { name: "", familyName: "", job: "", highschool: "", faculty: "", facebook: "", instagram: "", description: "", previousVolunteering: "" };

export const CreateProfilePage = () => { 
    const [profileData, setprofileData] = useState(initialState);
    
    const appContext = useContext(AppContext);

    const navigate = useNavigate();
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setprofileData({...profileData, [e.target.name]: e.target.value});
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        appContext.state.axiosWithBearer?.post(process.env.REACT_APP_API_URL + "/api/v1/member/create", profileData).then((res) => {
            if (res.data.user) {
                appContext.dispatch({type: ActionType.UPDATE_USER, payload: res.data});
                navigate("/");
            }
        });
    };

    return (
    <form onSubmit={submitHandler}>
        <TextBox name="name" required={true} label="Name" placeholder="John" value={profileData.name} onChange={changeHandler}></TextBox>
        <TextBox name="familyName" required={true} label="Family name" placeholder="Smith" value={profileData.familyName} onChange={changeHandler}></TextBox>
        <TextBox name="faculty" label="Faculty" placeholder="Medical Faculty" value={profileData.faculty} onChange={changeHandler}></TextBox>
        <TextBox name="facebook" label="Facebook" placeholder="https://fb.me/zuck" value={profileData.facebook} onChange={changeHandler}></TextBox>
        <TextBox name="instagram" label="Instagram" placeholder="https://www.instagram.com/zuck" value={profileData.instagram} onChange={changeHandler}></TextBox>
        <RichBox name="description" label="Tell us about you" value={profileData.description} onChange={changeHandler}/>
        <RichBox name="previousVolunteering" label="Tell us about your volunteering past" value={profileData.previousVolunteering} onChange={changeHandler}/>
        <input type="submit" value="sign up for an interview"></input>
    </form>
    );
};