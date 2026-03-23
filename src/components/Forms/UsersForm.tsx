import { Field, Formik, Form } from "formik"
import TextArea, { createField } from "../common/FormsControl/FormsControl";
import { useSelector } from "react-redux";
import { IsFriend, Search } from "../../redux/selectors/UsersSelector";
import '../../styles/UsersForm.css'

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
    const initialFriendValue = isFriend === null ? "null" : String(isFriend)
    return (
        <Formik enableReinitialize={true} initialValues={{SearchUser: SearchtermUser, friends: initialFriendValue}} onSubmit={(values) => {
            const changedvalues:changedvalues = {
                SearchUser: values.SearchUser,
                friends: values.friends === "null" ? null : values.friends === "true" ? true : false
            }
            onTermChanged(changedvalues)
        }}>
            <Form className="users-filter-form">
                <div className="filter-group">
                    <label htmlFor="friends-filter">Filter:</label>
                    <Field id="friends-filter" name="friends" as="select" className="filter-select">
                        <option value={"null"}>All Users</option>
                        <option value={"true"}>Only Followed</option>
                        <option value={"false"}>Only Unfollowed</option>
                    </Field>
                </div>
                <div className="filter-group">
                    <label htmlFor="search-user">Search:</label>
                    {createField('', 'SearchUser', undefined, TextArea, 'input')}
                </div>
                <button type='submit' className="filter-submit">🔍 Apply Filter</button>
            </Form>
        </Formik>
    )
}

export default UserForm;
