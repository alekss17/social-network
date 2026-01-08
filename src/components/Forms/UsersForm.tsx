import { Field, Formik, Form } from "formik"
import TextArea, { createField } from "../common/FormsControl/FormsControl";

type UserFormType = {
    onTermChanged: (valuesSearchUser: string, valuesFriendUser: boolean | null) => void;
}

const UserForm = ({onTermChanged}: UserFormType) => {
    return (
        <Formik initialValues={{SearchUser: "", friends: null as boolean | null}} onSubmit={(values) => {
            onTermChanged(values.SearchUser, values.friends)
        }}>
            <Form>
                <Field name="friends" as="select">
                    <option>All</option>
                    <option>Only followed</option>
                    <option>Only Unfollowed</option>
                </Field>
                {createField('Search', 'SearchUser', undefined, TextArea, 'input')}
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

export default UserForm;