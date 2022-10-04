export const ProfilePicture = ({portrait} : {portrait: string}) => {
    return (
        <img id="ProfilePicture" src={process.env.REACT_APP_SITE_URL + "/uploads/" + portrait} alt="your profile picture"/>
    );
};