import React from 'react';
import '../../Styles/Users.css';
import Paginator from '../common/Paginator/Pagination';
import User from './User';
import { UsersType } from '../../types/Types';
import UserForm from '../Forms/UsersForm';

interface UserTypeProps {
    currentPage: number;
    TotalUserCount: number;
    PageSize: number;
    Users: UsersType[];
    OnePageChanged: (p: number) => void;
    FollowingInProgress: number[];
    Follow: (UserId: number) => void;
    UnFollow: (UserId: number) => void;
    onTermChanged: (values: string) => void;
}

const Users = React.memo(({currentPage, TotalUserCount, PageSize, Users, OnePageChanged, FollowingInProgress, Follow, UnFollow, onTermChanged}: UserTypeProps) => {
    return (
        <div>
            <UserForm onTermChanged={onTermChanged} />
            <Paginator currentPage={currentPage} TotalItemsCount={TotalUserCount} PageSize={PageSize} OnePageChanged={OnePageChanged} portionSize={10} />
            <p>(Click on user and select it)</p>
            {Users.map((u: UsersType) => <User User={u} FollowingInProgress={FollowingInProgress} Follow={Follow} UnFollow={UnFollow} key={u.id}/> )}
        </div>
    );
})

export default Users