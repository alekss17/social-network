import React from 'react';
import '../../styles/Myposts.css'
import Post from './Post';
import AddMessageForm from '../Forms/AddMessageForm'
import { AddMessageFormValues } from '../../types/Types';

interface postData {
  id: string;
  message: string;
  likescount: number;
}

interface MypostsProps {
  postData: postData[];
  DeletePost: (PostId: string) => void;
  addPost: (newMessageBody: string) => void
}

const Myposts = React.memo((props: MypostsProps) => {
  const postMapping = props.postData.map((d) => (
    <Post id={d.id} DeletePost={props.DeletePost} key={d.id} message={d.message} likescount={d.likescount} />
));

  let addNewMessage = (values: AddMessageFormValues) => {
    props.addPost(values.newMessageBody)
}

    return (
      <section className='posts-section'>
        <div className='posts-section-header'>
          <h3 className='posts-section-title'>My posts</h3>
          <p className='posts-section-subtitle'>Write something and it will stay inside the profile card.</p>
        </div>
        <AddMessageForm onSubmit={addNewMessage} />
        <div className='posts-list'>
          {postMapping}
        </div>
      </section>
    );
});

  
  export default Myposts;
  
