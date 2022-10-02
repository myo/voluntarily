import "./styles/GeneralForm.scss"
import { AxiosInstance } from "axios";
import {useState} from "react";
import { useAppContext } from "../context/AppContext";
import { ActionType } from "../context/AppTypes";
import { useNavigate } from "react-router-dom";

const initialState = {file: new File([], "", undefined)}

export const UploadPortraitPage = () => {
    const appContext = useAppContext();

    const navigator = useNavigate();

    const photoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];

        const formData = new FormData();
        formData.append("file", file);

        (appContext.state.axiosWithBearer as AxiosInstance).post(process.env.REACT_APP_API_URL + "/api/v1/member/uploadPortrait", formData).then((res) => {
            if (res.data) {
                appContext.dispatch({type: ActionType.UPDATE_USER, payload: res.data});
                navigator("/");
            }
        });
    };
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (<form onSubmit={submitHandler}>
        <div className="RichBoxComponent">
            <label>One last thing and we're ready! Please upload a selfie to use as profile picture below.</label>
            <input type="file" accept="image/*" onChange={photoHandler}></input>
        </div>
    </form>);
};