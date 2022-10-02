import { userStrings } from "./user";
import { appStrings } from "./app";

const getLanguage = () => {
    return appStrings.getLanguage();
};

const setLanguage = (language: string) => {
    appStrings.setLanguage(language);
    userStrings.setLanguage(language);
};

export {appStrings, userStrings, getLanguage, setLanguage};