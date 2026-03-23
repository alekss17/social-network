import { Form, Formik } from 'formik';
import TextArea, { createField } from '../common/FormsControl/FormsControl';
import { AddMessageFormValues } from '../../types/Types';
import { SendOutlined } from '@ant-design/icons';
import '../../styles/MessageForm.css';

interface FormTypes {
  onSubmit: (values: AddMessageFormValues) => void
}

const AddMessageForm = (props: FormTypes) => {
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
