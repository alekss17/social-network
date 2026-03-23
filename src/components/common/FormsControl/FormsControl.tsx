import React from "react";
import { Field, FieldProps, getIn } from "formik";
import "../../../styles/formControl.css";

type AsTag = "textarea" | "input" | "select";

export type Validator = (value: string) => string | undefined;

interface TextAreaProps extends FieldProps {
  astag?: AsTag;
}

const TextArea = ({ field, form, astag = "textarea", ...props}: TextAreaProps) => {
  const error = getIn(form.touched, field.name) && getIn(form.errors, field.name);

  const Tag = astag;

  return (
    <div className={"formControl" + (error ? " error" : "")}>
      <Tag {...field} {...props} />
      {error && <span>{error}</span>}
    </div>
  );
};

export const createField = (
  placeholder = "",
  name = "",
  validate?: Validator,
  component: React.ComponentType<FieldProps> | undefined = undefined,
  astag: AsTag = "textarea",
  type?: string,
  text = "",
  className = ""
) => {
  return (
    <div>
      <Field
        className={className}
        placeholder={placeholder}
        name={name}
        validate={validate}
        component={component}
        astag={astag}
        type={type}
      />
      {text}
    </div>
  );
};

export default TextArea;
