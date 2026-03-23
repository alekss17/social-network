import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Preloader from "../components/common/Preloader/Prelooader";
import { RootState } from "../redux/redux-store";

const AuthRedirectComponent = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthRedirect = (props: P) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAuthChecking = useSelector((state: RootState) => state.auth.isAuthChecking);

    if (isAuthChecking) {
      return <Preloader />;
    }

    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirect;
};

export default AuthRedirectComponent;
