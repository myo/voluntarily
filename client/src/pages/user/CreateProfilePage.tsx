import "../styles/GeneralForm.scss"
import { TextBox } from "../../components/TextBox";
import {useState, useContext, useEffect} from "react";
import { AppContext } from '../../context/AppContext';
import { ActionType } from "../../context/AppTypes";
import { RichBox } from "../../components/RichBox";
import { useNavigate } from 'react-router-dom'
import { userStrings } from "../../i18n";
import { AxiosInstance } from "axios";
import Loading from "../../components/Loading";


export interface IFormElement {
    type: string,
    name: string,
    required: boolean,
}

export interface ISetting {
    name: string,
    active: boolean,
    props: object,
    children: IFormElement[]
}

export const CreateProfilePage = () => {
    //settings received from server
    const [formFields, setFormFields]  = useState<ISetting>({name: "", active: false, props: {}, children: []});

    //user input to send to server
    const [profileData, setProfileData] = useState({});
    
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const axios = (appContext.state.axiosWithBearer as AxiosInstance);
    
    useEffect(() => {
        if (!formFields.name.length)
        {
            appContext.dispatch({type:ActionType.LOADING_START})
            axios.get(process.env.REACT_APP_API_URL + "/api/v1/setting/get/InterviewForm").then(
                (data) => {
                    setFormFields(data.data);
                }).finally(() => {
                    appContext.dispatch({type: ActionType.LOADING_COMPLETE});
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, formFields]);

    if (appContext.state.isLoading) {
        return <Loading text="Loading..."></Loading>
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({...profileData, [e.target.name]: e.target.value});
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

    

    const fieldElements = [];
    
    for (let i = 0; i < formFields.children.length; i++) {
        const currentElement = formFields.children[i];
        if (!Object.keys(profileData).includes(currentElement.name)) {
            setProfileData({...profileData, [currentElement.name]: ""});
        }
        switch (currentElement.type) {
            case "TextBox": {
                fieldElements.push(
                    <TextBox
                    key={currentElement.name}
                    name={currentElement.name}
                    label={userStrings.getString(currentElement.name)} 
                    required={currentElement.required} 
                    value={profileData[currentElement.name as keyof object]}
                    onChange={changeHandler}/>)
                break;
            }
            case "RichBox": {
                fieldElements.push(
                    <RichBox
                    key={currentElement.name}
                    name={currentElement.name}
                    label={userStrings.getString(currentElement.name)} 
                    required={currentElement.required} 
                    value={profileData[currentElement.name as keyof object]}
                    onChange={changeHandler}/>);
                break;
            }
        }
    }



    return (<div className="GeneralForm">
        <form onSubmit={submitHandler}>
            {fieldElements}
            <input type="submit" value={userStrings.signUpForInterview}></input>
        </form>
    </div>);
};