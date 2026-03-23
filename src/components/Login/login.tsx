import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../Forms/LoginForm";
import { login } from "../../redux/authReducer";
import { formErrorSelector, getCaptcha, GetIsAuth } from "../../redux/selectors/authSelector";
import { AppDispatch } from "../../redux/redux-store";
import { FormDataType } from "../../types/Types";

const Login = () => {
    const isAuth = useSelector(GetIsAuth);
    const formError = useSelector(formErrorSelector);
    const captchaUrl = useSelector(getCaptcha);
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    };

    if (isAuth) {
        return <Navigate to={"/profile"} replace />;
    }

    return (
        <>
            <h1>LOGIN</h1>
            <p>(test account Email: free@samuraijs.com, Password: free)</p>
            <LoginForm captchaUrl={captchaUrl} formError={formError} Submit={handleSubmit} />
        </>
    );
};

export default Login;
