import { Field, Formik, Form } from "formik"
import TextArea, { createField } from "../common/FormsControl/FormsControl";

type UserFormType = {
    onTermChanged: (changedvalues: changedvalues) => void;
}

export type changedvalues = {
    SearchUser: string,
    friends: null | boolean
}

const UserForm = ({onTermChanged}: UserFormType) => {
    return (
        <Formik initialValues={{SearchUser: "", friends: "null"}} onSubmit={(values) => {
            const changedvalues:changedvalues = {
                SearchUser: values.SearchUser,
                friends: values.friends === "null" ? null : values.friends === "true" ? true : false
            }
            onTermChanged(changedvalues)
        }}>
            <Form>
                <Field name="friends" as="select">
                    <option value={"null"}>All</option>
                    <option value={"true"}>Only followed</option>
                    <option value={"false"}>Only Unfollowed</option>
                </Field>
                {createField('Search', 'SearchUser', undefined, TextArea, 'input')}
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

export default UserForm;