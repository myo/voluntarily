import "./styles/GeneralForm.scss"
import { AxiosInstance } from "axios";
import {useState} from "react";
import { useAppContext } from "../context/AppContext";

const initialState = {file: new File([], "", undefined)}

export const UploadPortraitPage = () => {
    const [profileData, setProfileData] = useState(initialState);

    const appContext = useAppContext();

    const photoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({...profileData, file: (e.target.files as FileList)[0]});
    };
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        for (const [key, val] of Object.entries(profileData)) {
            formData.append(key, val);
        }

        (appContext.state.axiosWithBearer as AxiosInstance).post(process.env.REACT_APP_API_URL + "/api/v1/member/uploadPortrait", formData).then((res) => {
            console.log(res.data);
        });
    };
    return (<form onSubmit={submitHandler}>
        <div className="RichBoxComponent">
            <label>One last thing and we're ready! Please upload a selfie below.</label>
            <input type="file" accept="image/*" onChange={photoHandler}></input>
        </div>
    </form>);
};