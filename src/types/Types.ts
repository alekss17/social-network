export type Photos = {
    small: string | null;
    large: string | null;
};

export type Contacts = {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
};

export type UserProfile = {
    aboutMe: string | null;
    contacts: Contacts;
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    fullName: string;
    userId: number;
    photos: Photos;
};

export type ProfileFormValue = {
    fullName: string;
    aboutMe: string | null;
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    contacts: Contacts;
};

export type ProfileFormErrors = {
    contacts: Partial<Record<keyof Contacts, string>>;
};

export type SaveProfileResult = ProfileFormErrors | null | undefined;

export type ProfileTypeProps = {
    UpdateProfileStats: (status: string) => void;
    isOwner: boolean;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileFormValue) => Promise<SaveProfileResult>;
};

export type UsersType = {
    name: string;
    id: number;
    uniqueUrlName: string | null;
    photos: Photos;
    status: string | null;
    followed: boolean;
};

export type MessagesType = {
    id: string;
    messages: string;
    userId: string | number;
};

export type DialogType = {
    id: number;
    name: string;
};

export type DialogFormValues = {
    onDialogBody: string;
};

export type AddMessageFormValues = {
    newMessageBody: string;
};

export type FormDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

export enum ResultCodeEnum {
    Success = 0,
    Succes = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    Captcha = 10
}
