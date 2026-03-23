import axios from "axios";
import { Photos, UserProfile, UsersType } from "../types/Types";

type ApiResponse<D = {}, M = string[]> = {
    data: D;
    resultCode: number;
    messages: M;
};

type GetUsersResponse = {
    items: UsersType[];
    totalCount: number;
    error: string | null;
};

type AuthMeResponse = ApiResponse<{
    id: number;
    email: string;
    login: string;
}>;

type LoginResponse = ApiResponse<{
    userId: number;
    token: string;
}>;

type SavePhotoResponse = ApiResponse<{
    photos: Photos;
}>;

const getAuthToken = () => localStorage.getItem('token');

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a933888c-0740-4c7d-a535-0736ae8e67d5"
    }
});

instance.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const UsersApi = {
    GetUsers(currentPage = 1, pageSize = 5, search = "", friend: boolean | null = null) {
        const friendQuery = friend === null ? '' : `&friend=${friend}`;
        return instance
            .get<GetUsersResponse>(`users?page=${currentPage}&count=${pageSize}&term=${search}${friendQuery}`)
            .then((response) => response.data);
    },

    Follow(userId: number) {
        return instance
            .post<ApiResponse>(`follow/${userId}`)
            .then((response) => response.data);
    },

    UnFollow(userId: number) {
        return instance
            .delete<ApiResponse>(`follow/${userId}`)
            .then((response) => response.data);
    },
};

export const ProfileApi = {
    GetProfile(userId: number | null) {
        return instance
            .get<UserProfile>(`profile/${userId}`)
            .then((response) => response.data);
    },

    GetProfileStatus(userId: number) {
        return instance
            .get<string>(`profile/status/${userId}`)
            .then((response) => response.data);
    },

    UpdateProfileStatus(status: string) {
        return instance
            .put<ApiResponse>('profile/status', { status })
            .then((response) => response.data);
    },

    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance
            .put<SavePhotoResponse>('profile/photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((response) => response.data);
    },

    saveProfile(profile: UserProfile) {
        return instance
            .put<ApiResponse>('profile', profile)
            .then((response) => response.data);
    }
};

export const AuthApi = {
    GetMe() {
        return instance
            .get<AuthMeResponse>('auth/me')
            .then((response) => response.data);
    },

    Login(email: string | null, password: string | null, rememberMe = false, captcha: string | null = null) {
        return instance
            .post<LoginResponse>('auth/login', { email, password, rememberMe, captcha })
            .then((response) => response.data);
    },

    Logout() {
        return instance
            .delete<ApiResponse>('auth/login')
            .then((response) => response.data);
    }
};

export const securityApi = {
    getCaptcha() {
        return instance
            .get<{ url: string }>("security/get-captcha-url")
            .then((response) => response.data);
    }
};
