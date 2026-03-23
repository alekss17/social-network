import { AuthApi, securityApi } from '../DAL/api';
import { ResultCodeEnum, ResultCodeForCaptcha } from '../types/Types';
import { alertError } from '../utils/errorHandling';
import { AppDispatch } from './redux-store';

const SET_USER_DATA = 'authReducer/SET_USER_DATA' as const;
const SET_AUTH_CHECKING = 'authReducer/SET_AUTH_CHECKING' as const;
const SET_FORM_ERROR = 'authReducer/SET_FORM_ERROR' as const;
const SET_CAPTCHA_URL = 'authReducer/SET_CAPTCHA_URL' as const;

const initialState = {
    email: null as string | null,
    login: null as string | null,
    userId: null as number | null,
    isAuth: false,
    isAuthChecking: true,
    formError: null as string | null,
    captchaUrl: null as string | null,
};

type initialStateType = typeof initialState;

const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload };

        case SET_AUTH_CHECKING:
            return { ...state, isAuthChecking: action.value };

        case SET_FORM_ERROR:
            return { ...state, formError: action.error };

        case SET_CAPTCHA_URL:
            return { ...state, captchaUrl: action.captchaUrl };

        default:
            return state;
    }
};

export const setAuthUserData = (email: string | null, login: string | null, userId: number | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: { email, login, userId, isAuth }
} as const);

export const setAuthChecking = (value: boolean) => ({
    type: SET_AUTH_CHECKING,
    value
} as const);

export const setFormError = (error: string | null) => ({
    type: SET_FORM_ERROR,
    error
} as const);

const setCaptchaUrl = (captchaUrl: string) => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
} as const);

export const SetAuthUserData = setAuthUserData;
export const isAuthChecking = setAuthChecking;
export const SetFormError = setFormError;

type ActionType =
| ReturnType<typeof setAuthUserData>
| ReturnType<typeof setAuthChecking>
| ReturnType<typeof setFormError>
| ReturnType<typeof setCaptchaUrl>;

export const getMe = () => async (dispatch: AppDispatch) => {
    dispatch(setAuthChecking(true));

    try {
        const data = await AuthApi.GetMe();

        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuthUserData(
                data.data.email,
                data.data.login,
                data.data.id,
                true
            ));
        }
    } catch (error) {
        alertError(error);
    } finally {
        dispatch(setAuthChecking(false));
    }
};

export const GetMe = getMe;

export const login = (email: string, password: string, rememberMe = false, captcha = '') => async (dispatch: AppDispatch) => {
    try {
        const data = await AuthApi.Login(email, password, rememberMe, captcha);

        if (data.resultCode === ResultCodeEnum.Success) {
            localStorage.setItem('token', data.data.token);
            dispatch(getMe());
            dispatch(setFormError(null));
            return;
        }

        if (data.resultCode === ResultCodeForCaptcha.Captcha) {
            dispatch(getCaptchaUrl());
        }

        dispatch(setFormError(data.messages[0] || 'Login error'));
    } catch (error) {
        alertError(error);
    }
};

export const getCaptchaUrl = () => async (dispatch: AppDispatch) => {
    try {
        const data = await securityApi.getCaptcha();
        dispatch(setCaptchaUrl(data.url));
    } catch (error) {
        alertError(error);
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setAuthChecking(true));

    try {
        const data = await AuthApi.Logout();

        if (data.resultCode === ResultCodeEnum.Success) {
            localStorage.removeItem('token');
            dispatch(setAuthUserData(null, null, null, false));
            dispatch(setFormError(null));
        }
    } catch (error) {
        alertError(error);
    } finally {
        dispatch(setAuthChecking(false));
    }
};

export default authReducer;
