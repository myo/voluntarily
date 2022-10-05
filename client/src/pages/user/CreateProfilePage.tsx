import "../styles/GeneralForm.scss"
import { TextBox } from "../../components/TextBox";
import {useState, useContext} from "react";
import { AppContext } from '../../context/AppContext';
import { ActionType } from "../../context/AppTypes";
import { RichBox } from "../../components/RichBox";
import { useNavigate } from 'react-router-dom'
import { userStrings } from "../../i18n";

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
        <TextBox name="name" label={userStrings.name} required={true} placeholder="John" value={profileData.name} onChange={changeHandler}></TextBox>
        <TextBox name="familyName" label={userStrings.familyName} required={true} placeholder="Smith" value={profileData.familyName} onChange={changeHandler}></TextBox>
        <TextBox name="faculty" label={userStrings.faculty} placeholder="Medical Faculty" value={profileData.faculty} onChange={changeHandler}></TextBox>
        <TextBox name="facebook" label={userStrings.facebook} placeholder="https://fb.me/zuck" value={profileData.facebook} onChange={changeHandler}></TextBox>
        <TextBox name="instagram" label={userStrings.instagram} placeholder="https://www.instagram.com/zuck" value={profileData.instagram} onChange={changeHandler}></TextBox>
        <RichBox name="description" label={userStrings.description} value={profileData.description} onChange={changeHandler}/>
        <RichBox name="previousVolunteering" label={userStrings.previousVolunteering} value={profileData.previousVolunteering} onChange={changeHandler}/>
        <input type="submit" value={userStrings.signUpForInterview}></input>
    </form>
    );
};