import React from "react"
import { Formik, Form } from "formik"
import TextArea, { createField } from "../common/FormsControl/FormsControl"
import '../../Styles/ProfileDataF.css'
import { Button } from "antd"
import { ProfileFormValue, UserProfile } from "../../types/Types"

interface ProfileDataFormTypes {
  profile: UserProfile
  handleSubmit: (values: ProfileFormValue) => Promise<any>
  onLeaveSubmit: () => void
}

const ProfileDataForm = ({ profile, handleSubmit, onLeaveSubmit }: ProfileDataFormTypes) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: profile.contacts
      }}
      onSubmit={async (values: ProfileFormValue, { setErrors, setSubmitting }) => {
        const errors = await handleSubmit(values)

        if (errors) {
          setErrors(errors)
        }

        setSubmitting(false)
      }}
    >
      {() => (
        <Form>
          <div className="form-actions">
            <button className="btn-save" type="submit">💾 Save</button>
            <button className="btn-cancel" type="button" onClick={onLeaveSubmit}>✕ Cancel</button>
          </div>

          <div>
            <p>fullName:</p>
            {createField("Full Name", "fullName", undefined, TextArea, "input")}
          </div>

          <div>
            <p>About Me</p>
            {createField("About Me", "aboutMe", undefined, TextArea, "input")}
          </div>

          <div className="LookingForAJob">
            <p>lookingForAJob</p>
            {createField("", "lookingForAJob", undefined, TextArea, "input", "checkbox")}
          </div>

          <div>
            <p>My skills</p>
            {createField("My skills", "lookingForAJobDescription", undefined, TextArea)}
          </div>

          <b>Contacts</b>
          {Object.keys(profile.contacts).map(key => (
            <div key={key}>
              {createField(key, `contacts.${key}`, undefined, TextArea)}
            </div>
          ))}

        </Form>
      )}
    </Formik>
  )
}

export default ProfileDataForm