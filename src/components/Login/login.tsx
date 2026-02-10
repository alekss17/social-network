import LoginForm from "../Forms/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import { formErrorSelector, getCaptcha, GetIsAuth } from "../../redux/selectors/authSelector";
import { AppDispatch } from "../../redux/redux-store";
import { formDataType } from "../../types/Types";

const Login = () => {
    const isAuth = useSelector(GetIsAuth)
    const formError = useSelector(formErrorSelector)
    const captchaUrl = useSelector(getCaptcha)

    const dispatch: AppDispatch = useDispatch()

    const Submit = (formData: formDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

       if (isAuth) {
        return <Navigate to={"/profile"} replace />
       }  
    return (
        <>
        <h1>LOGIN</h1>
        <p>(test account Email: free@samuraijs.com, Password: free)</p>
        <LoginForm captchaUrl={captchaUrl} formError={formError} Submit={Submit} />
        </>
    )
}

export default Login;