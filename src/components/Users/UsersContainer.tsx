import React from 'react';
import { useSelector } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Prelooader';
import { getIsFetching } from '../../redux/selectors/UsersSelector';
import AuthRedirectComponent from '../../hoc/WithAuthNavigate';

const UsersPage = () => {
    const isFetching = useSelector(getIsFetching);

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    );
};

export default AuthRedirectComponent(UsersPage);
