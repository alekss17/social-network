import React from "react";
import { Form, Formik } from "formik";
import { MaxLenghtCreator, required } from "../../utils/validators/validators";
import TextArea, { createField } from '../common/FormsControl/FormsControl';
import '../../styles/formControl.css';
import '../../styles/LoginForm.css';
import { FormDataType } from "../../types/Types";

const maxLength40 = MaxLenghtCreator(40);

const isEmpty = (value: unknown) =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && value.length === 0) ||
  value === '';

interface LoginFormType {
  formError: string | null;
  Submit: (formData: FormDataType) => void;
  captchaUrl: string | null;
}

const LoginForm = ({ formError, Submit, captchaUrl }: LoginFormType) => {
  const validate = (value: string) => required(value) || maxLength40(value);

  return (
    <div className="login-form-wrapper">
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false, captcha: "" }}
        enableReinitialize
        initialStatus={formError || null}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setStatus(null);
          Submit(values);
          setSubmitting(false);
        }}
      >
        {({ status }) => (
          <Form className="login-form">
            <div className="login-header">
              <h2>Login</h2>
              <p>Enter your credentials to access your profile</p>
            </div>

            <div className="login-fields">
              {createField("Email", "email", validate, TextArea, "input")}
              {createField("Password", "password", validate, TextArea, "input", "password")}
            </div>

            <div className="login-remember">
              {createField("", "rememberMe", undefined, undefined, undefined, "checkbox", "Remember me")}
            </div>

            {!isEmpty(status) && (
              <div className="login-error">
                <span className="error-icon">!</span>
                <div className="error-content">
                  {Array.isArray(status) ? status.join(", ") : status}
                </div>
              </div>
            )}

            {captchaUrl && (
              <div className="login-captcha">
                <img src={captchaUrl} alt="Captcha" />
                {createField("Captcha", "captcha", validate, TextArea, "input")}
              </div>
            )}

            <button type="submit" className="login-submit">
              Login to Account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
