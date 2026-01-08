import { UsersType } from "../types/Types"
import UserPage, { initialStateType, AcceptFollow } from "./UsersReducer"

test("", () => {
    const state: initialStateType = {
        Users: [
            {
                name: "bebe",
                id: 1,
                uniqueUrlName: "bebe",
                photos: {
                    small: null,
                    large: null
                },
                status: "Alekss",
                followed: false
            },
            {
                name: "bebe",
                id: 2,
                uniqueUrlName: "bebe",
                photos: {
                    small: null,
                    large: null
                },
                status: "Alekss",
                followed: false
            },
            {
                name: "bebe",
                id: 3,
                uniqueUrlName: "bebe",
                photos: {
                    small: null,
                    large: null
                },
                status: "Alekss",
                followed: false
            },
            {
                name: "bebe",
                id: 4,
                uniqueUrlName: "bebe",
                photos: {
                    small: null,
                    large: null
                },
                status: "Alekss",
                followed: false
            }
        ],
        TotalUserCount: 0,
        PageSize: 5,
        currentPage: 1,
        isFatching: false,
        FollowingInProgress: [] as number[],
        searchTerm: "" as string,
        friend: null as boolean | null 
    }

   const newState = UserPage(state, AcceptFollow(1))

    // expect(newState.User).toBe()
})