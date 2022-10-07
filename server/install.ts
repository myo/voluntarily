import { MSetting } from "./models/setting"
import { ISetting } from "../common/site";

export const install = async () => {
    const isInstalled = await MSetting.findOne<ISetting>({name:"Installed"});
    if (isInstalled?.active) {
        return;
    }

    console.log("first time start detected, installing");

    await installForms();
    await installTranslations();
    await finishInstallation();

}

export const finishInstallation = async () => {
    await MSetting.create({
        name: "Installed",
        active: true
    });
}

export const installForms = async () => {
    await MSetting.create({
        name: "InterviewForm",
        active: true,
        children: [
            {
                type: "TextBox",
                name: "name",
                required: true,
            },
            {
                type: "TextBox",
                name: "familyName",
                required: true,
            },
            {
                type: "TextBox",
                name: "highschool",
                required: false,
            },
            {
                type: "TextBox",
                name: "faculty",
                required: false,
            },
            {
                type: "TextBox",
                name: "job",
                required: false,
            },
            {
                type: "TextBox",
                name: "facebook",
                required: false,
            },
            {
                type: "TextBox",
                name: "instagram",
                required: false,
            },
            {
                type: "TextBox",
                name: "tiktok",
                required: false,
            },
            {
                type: "RichBox",
                name: "description",
                required: false,
            },
            {
                type: "RichBox",
                name: "previousVolunteering",
                required: false,
            },
        ],
    });
}

export const installTranslations = async () => {
    await MSetting.create({
        name: "Translations",
        props: {
            en: {
                email: "email",
                phone: "phone",
                password: "password",
                connect: "connect",
                signUp: "join us!",
                logOut: "log out",
                name: "name",
                familyName: "family name",
                highschool: "highschool",
                faculty: "faculty",
                job: "job",
                description: "description",
                previousVolunteering: "tell us about your volunteering past",
                signUpForInterview: "sign up for an interview",
                facebook: "facebook",
                instagram: "instagram",
                twitter: "twitter",
                tiktok: "tiktok",
                uploadProfilePicture: "One last thing and we're ready! Please upload a selfie to use as profile picture below.",
            },
            ro: {
                email: "email",
                phone: "telefon",
                password: "parolă",
                connect: "conectează-te",
                signup: "alăturăni-te!",
                logOut: "deconectează-mă",
                name: "nume",
                familyName: "nume de familie",
                highschool: "liceu",
                faculty: "facultate",
                job: "job",
                description: "descriere",
                previousVolunteering: "spune-ne despre experiențele tale de voluntariat din trecut",
                signUpForInterview: "programează-te la interviu",
                facebook: "facebook",
                instagram: "instagram",
                twitter: "twitter",
                tiktok: "tiktok",
                uploadProfilePicture: "Încă un lucru și terminăm! Te rugăm să încarci un selfie mai jos pentru a-l folosi drept poză de profil.",
            }
        }
    })
}