export const ProfilePicture = ({portrait} : {portrait: string}) => {
    return (
        <img 
            id="ProfilePicture" 
            src={process.env.REACT_APP_SITE_URL + (portrait?.length > 0 ? "/uploads/" + portrait : "/logo192.png")} 
            alt="you"
        />
    );
};