import React from 'react'
import { connect } from 'react-redux';
import Users from './Users';
import { AcceptUnFollow, AcceptFollow, GetUsers, ToggleIsFollowing, UnFollow, Follow} from '../../redux/UsersReducer';
import Preloader from '../common/Preloader/Prelooader'
import { FollowingInProgress, GetCurrentPage, GetFatching, GetPageSize, GetTotalUserCount, GetUsersSuper, IsFriend, Search } from '../../redux/selectors/UsersSelector';
import { GetIsAuth, GetisAuthChecking } from '../../redux/selectors/authSelector';
import { compose } from 'redux';
import AuthRedirectComponent from '../../hoc/WithAuthNavigate';
import { RootState } from '../../redux/redux-store';
import { UsersType } from '../../types/Types';
import { changedvalues } from '../Forms/UsersForm';

interface UserApiContainerProps {
    currentPage: number;
    PageSize: number;
    Users: UsersType[];
    TotalUserCount: number;
    isFatching: boolean;
    FollowingInProgress: number[];
    isAuth: boolean;
    isAuthChecking: boolean;
    SearchtermUser: string | null;
    isFriend: boolean | null

    GetUsers: (currentPage: number, PageSize: number, search: string | null, isFriend: boolean | null) => void;
    AcceptFollow: (id: number) => void;
    AcceptUnFollow: (id: number) => void;
    Follow: (UserId: number) => void;
    UnFollow: (UserId: number) => void;
    ToggleIsFollowing: (isFollowing: boolean, UserId: number) => void
}

class UsersApiContainer extends React.Component<UserApiContainerProps> {

    componentDidMount() {
        const {currentPage, PageSize, SearchtermUser, isFriend, GetUsers} = this.props;

        GetUsers(currentPage, PageSize, SearchtermUser, isFriend);
    }

    OnePageChanged = (p: number) => {
        const {PageSize, SearchtermUser, isFriend} = this.props;

        this.props.GetUsers(p, PageSize, SearchtermUser, isFriend);
    }

    onTermChanged = (changedvalues: changedvalues) => {
        const {PageSize} = this.props;

        this.props.GetUsers(1, PageSize, changedvalues.SearchUser, changedvalues.friends)
    }

    render() {
        return <>
            {this.props.isFatching ? <Preloader /> : null}
            <Users
               {...this.props}
                OnePageChanged={this.OnePageChanged}
                onTermChanged={this.onTermChanged}
            />
        </>
    }
}

let MapStateToProps = (state: RootState) => {
    return {
        Users: GetUsersSuper(state),
        TotalUserCount: GetTotalUserCount(state),
        PageSize: GetPageSize(state),
        currentPage: GetCurrentPage(state),
        isFatching: GetFatching(state),
        FollowingInProgress: FollowingInProgress(state),
        isAuth: GetIsAuth(state),
        isAuthChecking: GetisAuthChecking(state),
        SearchtermUser: Search(state),
        isFriend: IsFriend(state)
    }
}

export default compose<React.ComponentType>(
    connect(MapStateToProps, { AcceptFollow, AcceptUnFollow, Follow, UnFollow, GetUsers, ToggleIsFollowing}),
    AuthRedirectComponent
)(UsersApiContainer);