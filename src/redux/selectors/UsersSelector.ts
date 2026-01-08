import { createSelector } from "reselect"
import { RootState } from "../redux-store"

export const getUsers = (state: RootState) => {
    return (
         state.UserPageReducer.Users
    )
}
export const GetUsersSuper = createSelector(getUsers, (Users) => {
    return Users.filter(() => true)
})


export const GetTotalUserCount = (state: RootState) => {
    return (
         state.UserPageReducer.TotalUserCount
    )
}


export const GetPageSize = (state: RootState) => {
    return (
         state.UserPageReducer.PageSize
    )
}


export const GetCurrentPage = (state: RootState) => {
    return (
         state.UserPageReducer.currentPage
    )
}


export const GetFatching = (state: RootState) => {
    return (
         state.UserPageReducer.isFatching
    )
}


export const FollowingInProgress = (state: RootState) => {
    return (
         state.UserPageReducer.FollowingInProgress
    )
}

export const Search = (state: RootState) => {
    return (
        state.UserPageReducer.searchTerm
    )
}
export const IsFriend = (state: RootState) => {
    return (
        state.UserPageReducer.friend
    )
}