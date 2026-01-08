import axios from "axios";
import { UserProfile } from "../types/Types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a933888c-0740-4c7d-a535-0736ae8e67d5"
    }
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


export const UsersApi = {
    GetUsers(currentPage: number = 1, pageSize: number = 5, search: string = "", friend: boolean | null = null) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}&term=${search}&friend=${friend}`)
            .then(res => res.data)
    },

    Follow(userId: number) {
        return instance
            .post(`follow/${userId}`)
            .then(res => res.data)
    },

    UnFollow(userId: number) {
        return instance
            .delete(`follow/${userId}`)
            .then(res => res.data)
    },
}

export const ProfileApi = {
    GetProfile(userId: number | null) {
        return instance
            .get(`profile/${userId}`)
            .then(res => res.data)
    },

    GetProfileStatus(userId: number) {
        return instance
            .get(`profile/status/${userId}`)
            .then(res => res.data)
    },

    UpdateProfileStatus(status: string) {
        return instance
            .put(`profile/status`, { status })
            .then(res => res.data)
    },

    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance
            .put(`profile/photo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => res.data)
    },
    saveProfile(profile: UserProfile) {
        return (
            instance.put('profile', profile)
            .then(res => res.data)
        )
    }
}

export const AuthApi = {
    GetMe() {
        return instance
            .get('auth/me')
            .then(res => res.data)
    },

    Login(email: string | null, password: string | null, rememberMe: boolean = false, captcha: string | null = null) {
        return instance
            .post('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data)
    },

    Logout() {
        return instance
            .delete('auth/login')
            .then(res => res.data)
    }
}


export const securityApi = {
    getCaptcha() {
        return instance.get("security/get-captcha-url")
        .then(res => res.data)
    }
}