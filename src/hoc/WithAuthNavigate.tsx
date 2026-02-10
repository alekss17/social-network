import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../redux/redux-store";
import Preloader from "../components/common/Preloader/Prelooader";

interface InjectedProps {
  isAuth: boolean;
  isAuthChecking: boolean;
}
const mapStateToPropsForRedirect = (state: RootState): InjectedProps => ({
  isAuth: state.auth.isAuth,
  isAuthChecking: state.auth.isAuthChecking,
});

const AuthRedirectComponent = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthRedirect = (props: InjectedProps) => {
    const { isAuthChecking, isAuth, ...restProps } = props;

    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...restProps} />;
  };

  return connect(mapStateToPropsForRedirect)(WithAuthRedirect);
};

export default AuthRedirectComponent;