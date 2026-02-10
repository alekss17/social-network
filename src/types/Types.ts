export type Photos = {
    small: string | null;
    large: string | null;
}

export type Contacts = {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
}

export type UserProfile = {
    aboutMe: string | null;
    contacts: Contacts;
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    fullName: string;
    userId: number;
    photos: Photos;
}

export type ProfileFormValue = {
    fullName: string;
    aboutMe: string | null;
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    contacts: Contacts;
}
export type ProfileTypeProps = {
    UpdateProfileStats: (status: string) => void;
    isOwner: boolean;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileFormValue) => Promise<any>
}

export type UsersType = {
    name: string,
    id: number,
    uniqueUrlName: null | string,
    photos: {
        small: null | string,
        large: null | string
    },
    status: null | string,
    followed: boolean
}

export type HeaderPropsTypes = {
    isAuth: boolean;
    login: string | null;
    logout: () => void;
}
export type MessagesType = {
    id: string,
    messages: string,
    userId: string | number
}

export type DialogType = {
    id: number,
    name: string
  }

  export type DialogFormValues = {
    onDialogBody: string;
  }

  export type AddMessageFormValues = {
    newMessageBody: string;
  }

  export type formDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
}



// enums
export enum ResultCodeEnum {
    Succes = 0, 
    Error = 1,
}

export enum ResultCodeForCaptcha {
    Captcha = 10
}