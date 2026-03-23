import { createSelector } from "reselect";
import { RootState } from "../redux-store";

export const getUsers = (state: RootState) => state.UserPageReducer.Users;
export const getUsersSuper = createSelector([getUsers], (users) => users);
export const getTotalUserCount = (state: RootState) => state.UserPageReducer.TotalUserCount;
export const getPageSize = (state: RootState) => state.UserPageReducer.PageSize;
export const getCurrentPage = (state: RootState) => state.UserPageReducer.currentPage;
export const getIsFetching = (state: RootState) => state.UserPageReducer.isFetching;
export const getFollowingInProgress = (state: RootState) => state.UserPageReducer.FollowingInProgress;
export const getSearchTerm = (state: RootState) => state.UserPageReducer.searchTerm;
export const getFriendFilter = (state: RootState) => state.UserPageReducer.friend;

export const GetUsersSuper = getUsersSuper;
export const GetTotalUserCount = getTotalUserCount;
export const GetPageSize = getPageSize;
export const GetCurrentPage = getCurrentPage;
export const GetFatching = getIsFetching;
export const FollowingInProgress = getFollowingInProgress;
export const Search = getSearchTerm;
export const IsFriend = getFriendFilter;
