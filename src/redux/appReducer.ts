import { getMe, setAuthChecking } from './authReducer';
import { alertError } from '../utils/errorHandling';
import { AppDispatch } from './redux-store';

const INITIALIZED = 'appReducer/INITIALIZED' as const;
const TOGGLE_ERROR = 'appReducer/TOGGLE_ERROR' as const;

const initialState = {
    initialized: false,
    globalError: null as string | null
};

type initialStateType = typeof initialState;

const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case INITIALIZED:
            return { ...state, initialized: true };

        case TOGGLE_ERROR:
            return { ...state, globalError: action.error };

        default:
            return state;
    }
};

export const setInitialized = () => ({ type: INITIALIZED } as const);
export const toggleError = (error: string | null) => ({ type: TOGGLE_ERROR, error } as const);

export const SetInitialized = setInitialized;
export const ToogleError = toggleError;

type ActionType =
    | ReturnType<typeof setInitialized>
    | ReturnType<typeof toggleError>;

export const initializeApp = () => async (dispatch: AppDispatch) => {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            await dispatch(getMe());
        } else {
            dispatch(setAuthChecking(false));
        }
    } catch (error) {
        dispatch(setAuthChecking(false));
        alertError(error);
    } finally {
        dispatch(setInitialized());
    }
};

export const showGlobalError = (error: string | null) => (dispatch: AppDispatch) => {
    dispatch(toggleError(error));

    setTimeout(() => {
        dispatch(toggleError(null));
    }, 10000);
};

export const InitializeApp = initializeApp;
export const ToogleErrorTH = showGlobalError;

export default appReducer;
