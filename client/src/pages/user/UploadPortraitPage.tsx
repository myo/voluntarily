import "../styles/GeneralForm.scss";
import { AxiosInstance } from "axios";
import { useAppContext } from "../../context/AppContext";
import { ActionType } from "../../context/AppTypes";
import { useNavigate } from "react-router-dom";
import { userStrings } from "../../i18n";

export const UploadPortraitPage = () => {
  const appContext = useAppContext();

  const navigator = useNavigate();

  const photoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const axios = appContext.state.axiosWithBearer as AxiosInstance;
    const file = (e.target.files as FileList)[0];

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/v1/member/uploadFile",
        formData
      )
      .then((res) => {
        if (res.data) {
          axios
            .post(process.env.REACT_APP_API_URL + "/api/v1/member/edit", {
              changes: {
                portrait: res.data.file.filename,
              },
            })
            .then((res) => {
              if (res.data) {
                appContext.dispatch({
                  type: ActionType.UPDATE_USER,
                  payload: res.data,
                });
                navigator("/");
              }
            });
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
    </div>
  );
};
