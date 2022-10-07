import "../styles/GeneralForm.scss"
import { AxiosInstance } from "axios";
import { useAppContext } from "../../context/AppContext";
import { ActionType } from "../../context/AppTypes";
import { useNavigate } from "react-router-dom";
import { userStrings } from "../../i18n";
import { useEffect, useState } from "react";

export const UploadPortraitPage = () => {
    const appContext = useAppContext();

    const navigator = useNavigate();

    const [uploadedFile, setUploadedFile] = useState<any>(undefined);

    useEffect(() => {
        if (uploadedFile) {
            (appContext.state.axiosWithBearer as AxiosInstance).post(process.env.REACT_APP_API_URL + "/api/v1/member/edit", 
            {
                changes: {
                    portrait: uploadedFile
                }
            }).then((res) => {
                if (res.data) {
                    appContext.dispatch({type: ActionType.UPDATE_USER, payload: res.data});
                    navigator("/");
                }
            });
        }
    }, [uploadedFile]);

    const photoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];

        const formData = new FormData();
        formData.append("file", file);

        (appContext.state.axiosWithBearer as AxiosInstance).post(process.env.REACT_APP_API_URL + "/api/v1/member/uploadFile", formData).then((res) => {
            if (res.data) {
                setUploadedFile(res.data.file.filename);
            }
        });
    };


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
    <div className="GeneralForm">
        <form onSubmit={submitHandler}>
            <div className="RichBoxComponent">
            <label>{userStrings.uploadProfilePicture}</label>
            <input type="file" accept="image/*" onChange={photoHandler}></input>
            </div>
        </form>
    </div>);
};