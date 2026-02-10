import { Field, Formik, Form } from "formik"
import TextArea, { createField } from "../common/FormsControl/FormsControl";
import { useSelector } from "react-redux";
import { IsFriend, Search } from "../../redux/selectors/UsersSelector";

type UserFormType = {
    onTermChanged: (changedvalues: changedvalues) => void;
}

export type changedvalues = {
    SearchUser: string,
    friends: null | boolean
}

const UserForm = ({onTermChanged}: UserFormType) => {
    const SearchtermUser = useSelector(Search)
    const isFriend = useSelector(IsFriend)
    return (
        <Formik enableReinitialize={true} initialValues={{SearchUser: SearchtermUser, friends: isFriend as null | boolean | string}} onSubmit={(values) => {
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