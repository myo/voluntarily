import "../styles/CustomForm.scss"
import { AxiosInstance } from "axios";
import { useAppContext } from "../../context/AppContext"
import { AppContextType } from "../../context/AppTypes";

export const EditInteviewForm = () => {
    const appContext = useAppContext();
    const axios = (appContext.state.axiosWithBearer as AxiosInstance);
    axios.get(process.env.REACT_APP_API_URL + "/api/v1/admin/interview/form/get");
    return <div className="CustomForm">
                <form>
                    
                </form>
            </div>
}