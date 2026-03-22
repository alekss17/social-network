import { Field, Form, Formik } from 'formik';
import { required, MaxLenghtCreator } from '../../utils/validators/validators';
import TextArea, { createField } from '../common/FormsControl/FormsControl';
import { AddMessageFormValues } from '../../types/Types';
import { SendOutlined } from '@ant-design/icons';
import '../../Styles/MessageForm.css';

const MaxLength100 = MaxLenghtCreator(100)

interface FormTypes {
  onSubmit: (values: AddMessageFormValues) => void
}

const AddMessageForm = (props: FormTypes) => {
  const validate = (value: string) => required(value) || MaxLength100(value)
    return (
    <Formik initialValues={{ newMessageBody: "" }} onSubmit={props.onSubmit}>
    <Form className='message-form' >
     {createField('', "newMessageBody", undefined, TextArea, "textarea", "Type a message...")}
    <button type="submit" className='message-submit-btn'>
      <SendOutlined /> Send
    </button>
  </Form>
  </Formik>
)}

export default AddMessageForm; 