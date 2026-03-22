import { Field, Form, Formik } from 'formik';
import { required, MaxLenghtCreator } from '../../utils/validators/validators';
import TextArea from '../common/FormsControl/FormsControl';
import { DialogFormValues } from '../../types/Types';

const MaxLength50 = MaxLenghtCreator(50)

interface addDialogForm {
    onSubmit: (values: DialogFormValues) => void
}

const AddDialogForm = (props: addDialogForm) => {
    const validate = (value: string) => required(value) || MaxLength50(value)
    return (
        <>
        <Formik initialValues={{ onDialogBody: "" }} onSubmit={props.onSubmit}>
            <Form className="dopRef">
                <Field className="TextAreaDialogs" name={"onDialogBody"}
                 validate={validate}
                  component={TextArea} placeholder="📝 Type a message..."
                  astag={"textarea"} />
                <button className="GetPostButton" type={"submit"}>✉️ Send</button>
            </Form>
        </Formik>
        </>
    )
}


export default AddDialogForm;