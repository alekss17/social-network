import { UsersApi } from "../DAL/api";
import { ResultCodeEnum, UsersType } from "../types/Types";
import { UpdateObjectInArray } from "../utils/object-helpers";
import { alertError } from "../utils/errorHandling";
import { AppDispatch } from "./redux-store";

const FOLLOW = 'UsersReducer/FOLLOW' as const;
const UNFOLLOW = 'UsersReducer/UNFOLLOW' as const;
const SET_USERS = 'UsersReducer/SET_USERS' as const;
const SET_CURRENT_PAGE = 'UsersReducer/SET_CURRENT_PAGE' as const;
const SET_TOTAL_COUNT = 'UsersReducer/SET_TOTAL_COUNT' as const;
const TOGGLE_IS_FETCHING = 'UsersReducer/TOGGLE_IS_FETCHING' as const;
const TOGGLE_IS_FOLLOWING = 'UsersReducer/TOGGLE_IS_FOLLOWING' as const;
const SET_SEARCH_TERM = 'UsersReducer/SET_SEARCH_TERM' as const;
const SET_FRIEND_FILTER = 'UsersReducer/SET_FRIEND_FILTER' as const;

const initialState = {
    Users: [] as UsersType[],
    TotalUserCount: 0,
    PageSize: 5,
    currentPage: 1,
    isFetching: false,
    FollowingInProgress: [] as number[],
    searchTerm: "",
    friend: null as boolean | null
};

export type initialStateType = typeof initialState;
export type searchtype = typeof initialState.searchTerm;

const usersReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                Users: UpdateObjectInArray(state.Users, action.id, "id", { followed: true })
            };

        case UNFOLLOW:
            return {
                ...state,
                Users: UpdateObjectInArray(state.Users, action.id, "id", { followed: false })
            };

        case SET_USERS:
            return { ...state, Users: action.users };

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };

        case SET_TOTAL_COUNT:
            return { ...state, TotalUserCount: action.total };

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };

        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                FollowingInProgress: action.isFollowing
                    ? [...state.FollowingInProgress, action.userId]
                    : state.FollowingInProgress.filter((id) => id !== action.userId)
            };

        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.search };

        case SET_FRIEND_FILTER:
            return { ...state, friend: action.isFriend };

        default:
            return state;
    }
};

export const acceptFollow = (id: number) => ({ type: FOLLOW, id } as const);
export const acceptUnfollow = (id: number) => ({ type: UNFOLLOW, id } as const);
export const setUsers = (users: UsersType[]) => ({ type: SET_USERS, users } as const);
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const);
export const setTotalUserCount = (total: number) => ({ type: SET_TOTAL_COUNT, total } as const);
export const setIsFetching = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const);
export const toggleFollowingProgress = (isFollowing: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId } as const);
export const setSearchTerm = (search: string) => ({ type: SET_SEARCH_TERM, search } as const);
export const setFriendFilter = (isFriend: boolean | null) => ({ type: SET_FRIEND_FILTER, isFriend } as const);

export const AcceptFollow = acceptFollow;
export const AcceptUnFollow = acceptUnfollow;
export const SetUsers = setUsers;
export const SetCurrentPage = setCurrentPage;
export const SetTotalUserCount = setTotalUserCount;
export const ToggleIsFatching = setIsFetching;
export const ToggleIsFollowing = toggleFollowingProgress;
export const SearchTerm = setSearchTerm;
export const FriendSearch = setFriendFilter;

export type ActionType =
    | ReturnType<typeof acceptFollow>
    | ReturnType<typeof acceptUnfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUserCount>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setSearchTerm>
    | ReturnType<typeof setFriendFilter>;

type ApiMethodType = (userId: number) => Promise<{ resultCode: number }>;

export const getUsers = (currentPage: number, pageSize: number, search: string, isFriend: boolean | null) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsFetching(true));

        try {
            const data = await UsersApi.GetUsers(currentPage, pageSize, search, isFriend);

            dispatch(setUsers(data.items));
            dispatch(setCurrentPage(currentPage));
            dispatch(setTotalUserCount(data.totalCount));
            dispatch(setSearchTerm(search));
            dispatch(setFriendFilter(isFriend));
        } catch (error) {
            alertError(error);
        } finally {
            dispatch(setIsFetching(false));
        }
    };
};

export const GetUsers = getUsers;

const followUnfollowFlow = async (
    dispatch: AppDispatch,
    userId: number,
    apiMethod: ApiMethodType,
    actionCreator: (id: number) => ReturnType<typeof acceptFollow> | ReturnType<typeof acceptUnfollow>
) => {
    dispatch(toggleFollowingProgress(true, userId));

    try {
        const data = await apiMethod(userId);

        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actionCreator(userId));
        }
    } catch (error) {
        alertError(error);
    } finally {
        dispatch(toggleFollowingProgress(false, userId));
    }
};

export const unfollow = (userId: number) => async (dispatch: AppDispatch) => {
    await followUnfollowFlow(dispatch, userId, UsersApi.UnFollow.bind(UsersApi), acceptUnfollow);
};

export const follow = (userId: number) => async (dispatch: AppDispatch) => {
    await followUnfollowFlow(dispatch, userId, UsersApi.Follow.bind(UsersApi), acceptFollow);
};

export const UnFollow = unfollow;
export const Follow = follow;

export default usersReducer;
