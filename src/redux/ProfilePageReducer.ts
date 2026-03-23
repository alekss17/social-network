import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { ProfileApi } from '../DAL/api';
import { ProfileFormErrors, ProfileFormValue, ResultCodeEnum, SaveProfileResult, UserProfile } from '../types/Types';
import { alertError } from '../utils/errorHandling';
import { AppDispatch, RootState } from './redux-store';

const ADD_POST = 'ProfilePage/ADD_POST' as const;
const SET_USER_PROFILE = 'ProfilePage/SET_USER_PROFILE' as const;
const SET_PROFILE_STATUS = 'ProfilePage/SET_PROFILE_STATUS' as const;
const DELETE_POST = 'ProfilePage/DELETE_POST' as const;
const SAVE_PHOTO = 'ProfilePage/SAVE_PHOTO' as const;
const SET_PROFILE_LOADING = 'ProfilePage/SET_PROFILE_LOADING' as const;
const SET_PROFILE_FORM_ERROR = 'ProfilePage/SET_PROFILE_FORM_ERROR' as const;

const initialState = {
  postData: [
    { id: uuidv4(), message: "Hi, how are you", likescount: 0 },
    { id: uuidv4(), message: "Hi", likescount: 0 },
    { id: uuidv4(), message: "Hohoho", likescount: 0 }
  ],
  profile: null as UserProfile | null,
  ProfileStatus: "",
  ProfileLoading: false,
  ProfileDataFormError: null as string | null
};

type initialStateType = typeof initialState;

const profilePageReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postData: [...state.postData, { id: uuidv4(), message: action.newMessageBody, likescount: 0 }]
      };

    case DELETE_POST:
      return {
        ...state,
        postData: state.postData.filter((post) => post.id !== action.postId)
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_PROFILE_STATUS:
      return { ...state, ProfileStatus: action.status };

    case SAVE_PHOTO:
      return {
        ...state,
        profile: state.profile ? { ...state.profile, photos: action.photo } : state.profile
      };

    case SET_PROFILE_LOADING:
      return { ...state, ProfileLoading: action.isLoaded };

    case SET_PROFILE_FORM_ERROR:
      return { ...state, ProfileDataFormError: action.error };

    default:
      return state;
  }
};

export const addPostActionCreator = (newMessageBody: string) => ({ type: ADD_POST, newMessageBody } as const);
export const setUserProfile = (profile: UserProfile) => ({ type: SET_USER_PROFILE, profile } as const);
export const setProfileStatus = (status: string) => ({ type: SET_PROFILE_STATUS, status } as const);
export const deletePost = (postId: string) => ({ type: DELETE_POST, postId } as const);
export const savePhotoSuccess = (photo: UserProfile['photos']) => ({ type: SAVE_PHOTO, photo } as const);
export const setProfileLoading = (isLoaded: boolean) => ({ type: SET_PROFILE_LOADING, isLoaded } as const);
export const setProfileDataFormError = (error: string | null) => ({ type: SET_PROFILE_FORM_ERROR, error } as const);

export const SetUserProfile = setUserProfile;
export const SetProfileStatus = setProfileStatus;
export const SavePhotoSucess = savePhotoSuccess;
export const ToggleIsLoadingProfile = setProfileLoading;
export const ProfileDataFormErrorAC = setProfileDataFormError;

type ActionType =
  | ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setProfileStatus>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof savePhotoSuccess>
  | ReturnType<typeof setProfileLoading>
  | ReturnType<typeof setProfileDataFormError>;

export const DeletePost = (id: string) => (dispatch: Dispatch) => {
  dispatch(deletePost(id));
};

export const getProfile = (userId: number | null) => async (dispatch: Dispatch) => {
  dispatch(setProfileLoading(false));

  try {
    const profile = await ProfileApi.GetProfile(userId);
    dispatch(setUserProfile(profile));
  } catch (error) {
    alertError(error);
  } finally {
    dispatch(setProfileLoading(true));
  }
};

export const GetProfile = getProfile;

export const getProfileStatus = (userId: number) => async (dispatch: Dispatch) => {
  try {
    const status = await ProfileApi.GetProfileStatus(userId);
    dispatch(setProfileStatus(status));
  } catch (error) {
    alertError(error);
  }
};

export const GetProfilStatus = getProfileStatus;

export const updateProfileStatus = (status: string) => async (dispatch: Dispatch) => {
  try {
    const data = await ProfileApi.UpdateProfileStatus(status);

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(setProfileStatus(status));
    }
  } catch (error) {
    alertError(error);
  }
};

export const UpdateProfileStats = updateProfileStatus;

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
  try {
    const data = await ProfileApi.savePhoto(file);

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  } catch (error) {
    alertError(error);
  }
};

const buildProfileFormErrors = (messages: string[]): ProfileFormErrors => {
  const errors: ProfileFormErrors = { contacts: {} };

  messages.forEach((message) => {
    if (!message.includes("Contacts->")) {
      return;
    }

    const key = message.split("Contacts->")[1].replace(")", "").toLowerCase() as keyof ProfileFormErrors['contacts'];
    errors.contacts[key] = message;
  });

  return errors;
};

export const saveProfile = (profile: ProfileFormValue) => async (
  dispatch: AppDispatch,
  getState: () => RootState
): Promise<SaveProfileResult> => {
  try {
    const state = getState();
    const userId = state.auth.userId;
    const currentPhotos = state.ProfileReducer.profile?.photos || { small: null, large: null };

    if (!userId) {
      return null;
    }

    const fullProfile: UserProfile = {
      ...profile,
      userId,
      photos: currentPhotos
    };

    const data = await ProfileApi.saveProfile(fullProfile);

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(getProfile(userId));
      return null;
    }

    return buildProfileFormErrors(data.messages);
  } catch (error) {
    alertError(error);
    return undefined;
  }
};

export default profilePageReducer;
