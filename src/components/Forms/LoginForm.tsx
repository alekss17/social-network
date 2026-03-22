import React from "react";
import { Form, Formik } from "formik";
import { required, MaxLenghtCreator } from "../../utils/validators/validators";
import TextArea, { createField } from '../common/FormsControl/FormsControl';
import '../../Styles/formControl.css'
import '../../Styles/LoginForm.css'
import { formDataType } from "../../types/Types";

const MaxLenght40 = MaxLenghtCreator(40);

const isEmpty = (value: formDataType) =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && value.length === 0);


interface LoginFormType {
  formError: string | null;
  Submit: (formData: formDataType) => void;
  captchaUrl: string | null;
}

const LoginForm = ({ formError, Submit, captchaUrl }: LoginFormType) => {

  const validate = (value: string) => required(value) || MaxLenght40(value);

  return (
    <div className="login-form-wrapper">
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false, captcha: "" }}
        enableReinitialize={true}
        initialStatus={formError || null}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setStatus(null);
          Submit(values);
          setSubmitting(false);
        }} >
        {({ status }) => (
          <Form className="login-form">
            <div className="login-header">
              <h2>🔐 Login</h2>
              <p>Enter your credentials to access your profile</p>
            </div>

            <div className="login-fields">
              {createField("email", "email", validate, TextArea, "input")}
              {createField("Password", "password", validate, TextArea, "input", "password")}
            </div>

            <div className="login-remember">
              {createField("", "rememberMe", undefined, undefined, undefined, "checkbox", "Remember me")}
            </div>

            {!isEmpty(status) &&
              <div className="login-error">
                <span className="error-icon">⚠️</span>
                <div className="error-content">
                  {Array.isArray(status) ? status.join(", ") : status}
                </div>
              </div>
            }

            {captchaUrl &&
              <div className="login-captcha">
                <img src={captchaUrl} alt="Captcha" />
                {createField("Captcha", "captcha", validate, TextArea, "input")}
              </div>
            }

            <button type="submit" className="login-submit">
              🚀 Login to Account
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
