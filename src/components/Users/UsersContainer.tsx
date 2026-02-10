import React from 'react'
import { useSelector } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Prelooader'
import { GetFatching } from '../../redux/selectors/UsersSelector';
import AuthRedirectComponent from '../../hoc/WithAuthNavigate';

const UserPage = () => {
    const isFatching = useSelector(GetFatching)
    return (
        <>
            {isFatching ? <Preloader /> : null}
            <Users />
        </>
    )
}

export default AuthRedirectComponent(UserPage);