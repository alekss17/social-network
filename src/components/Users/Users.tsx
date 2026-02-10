import React, { useEffect } from 'react';
import '../../Styles/Users.css';
import Paginator from '../common/Paginator/Pagination';
import User from './User';
import { UsersType } from '../../types/Types';
import UserForm, { changedvalues } from '../Forms/UsersForm';
import { useDispatch, useSelector } from 'react-redux';
import { FollowingInProgress, GetCurrentPage, GetPageSize, GetTotalUserCount, GetUsersSuper, IsFriend, Search } from '../../redux/selectors/UsersSelector';
import { AppDispatch } from '../../redux/redux-store';
import { Follow, UnFollow, GetUsers } from '../../redux/UsersReducer';
import { useNavigate } from 'react-router';

const Users = React.memo( () => {
    const currentPage = useSelector(GetCurrentPage)
    const TotalUserCount = useSelector(GetTotalUserCount)
    const PageSize = useSelector(GetPageSize)
    const Users = useSelector(GetUsersSuper)
    const FollowingInProgres = useSelector(FollowingInProgress)
    const SearchtermUser = useSelector(Search)
    const isFriend = useSelector(IsFriend)
    const dispatch: AppDispatch = useDispatch()
    let Navigate = useNavigate()

    useEffect(() => {
        const hash = window.location.hash
        const queryString = hash.includes('?')
          ? hash.substring(hash.indexOf('?') + 1)
          : ''
      
        const params = new URLSearchParams(queryString)
      
        let actualPage = currentPage
        let actualTerm = SearchtermUser
        let actualFriend: boolean | null = isFriend
      
        if (params.get('page')) {
          actualPage = Number(params.get('page'))
        }
      
        if (params.get('term')) {
          actualTerm = params.get('term')!
        }
      
        const friend = params.get('friend')
        if (friend === 'true') actualFriend = true
        if (friend === 'false') actualFriend = false
        if (friend === 'null') actualFriend = null
      
        dispatch(GetUsers(actualPage, PageSize, actualTerm, actualFriend))
      }, [])
      

    useEffect(() => {
        const params = new URLSearchParams()
      
        if (SearchtermUser) params.set('term', SearchtermUser)
        if (isFriend !== null) params.set('friend', String(isFriend))
        if (currentPage !== 1) params.set('page', String(currentPage))
      
        Navigate(
          {
            pathname: '/developers',
            search: params.toString()
          },
          { replace: true }
        )
      }, [SearchtermUser, isFriend, currentPage])
      
      

    const FollowU = (UserId: number) => {
        dispatch(Follow(UserId))
    }
    const UnFollowU = (UserId: number) => {
        dispatch(UnFollow(UserId))
    }

    const OnePageChanged = (p: number) => {
        dispatch(GetUsers(p, PageSize, SearchtermUser, isFriend))
    }

    const onTermChanged = (changedvalues: changedvalues) => {
        dispatch(GetUsers(1, PageSize, changedvalues.SearchUser, changedvalues.friends))
    }
    return (
        <div>
            <UserForm onTermChanged={onTermChanged} />
            <Paginator currentPage={currentPage} TotalItemsCount={TotalUserCount} PageSize={PageSize} OnePageChanged={OnePageChanged} portionSize={10} />
            <p>(Click on user and select it)</p>
            {Users.map((u: UsersType) => <User User={u} FollowingInProgress={FollowingInProgres} Follow={FollowU} UnFollow={UnFollowU} key={u.id}/> )}
        </div>
    );
})

export default Users