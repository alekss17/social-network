import usersReducer, { acceptFollow, initialStateType } from "./UsersReducer";

jest.mock('../DAL/api', () => ({
    UsersApi: {
        GetUsers: jest.fn(),
        Follow: jest.fn(),
        UnFollow: jest.fn(),
    }
}));

test("follow action should mark the correct user as followed", () => {
    const state: initialStateType = {
        Users: [
            { name: "bebe", id: 1, uniqueUrlName: "bebe", photos: { small: null, large: null }, status: "Alekss", followed: false },
            { name: "bebe", id: 2, uniqueUrlName: "bebe", photos: { small: null, large: null }, status: "Alekss", followed: false },
            { name: "bebe", id: 3, uniqueUrlName: "bebe", photos: { small: null, large: null }, status: "Alekss", followed: false },
            { name: "bebe", id: 4, uniqueUrlName: "bebe", photos: { small: null, large: null }, status: "Alekss", followed: false }
        ],
        TotalUserCount: 0,
        PageSize: 5,
        currentPage: 1,
        isFetching: false,
        FollowingInProgress: [],
        searchTerm: "",
        friend: null
    };

    const newState = usersReducer(state, acceptFollow(1));

    expect(newState.Users[0].followed).toBe(true);
    expect(newState.Users[1].followed).toBe(false);
});
