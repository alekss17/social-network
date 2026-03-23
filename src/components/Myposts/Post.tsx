import '../../styles/Post.css'
import React from 'react';

interface PostProps {
    likescount: number;
    message: string;
    DeletePost: (ID: string) => void;
    id: string;
}


const Post = ({ likescount, message, DeletePost, id }: PostProps) => {
    return (
        <article className="post-card">
            <div className="item">
                <img className="post-img" src="https://www.meme-arsenal.com/memes/9e68a78a292b4ed1555a338561dca8c3.jpg" alt="Post author avatar" />
                <p className='post-message'>{message}</p>
            </div>
            <div className='post-card-footer'>
                <p className='post-likes'>Likes: {likescount}</p>
                <button className='post-delete-btn' onClick={() => DeletePost(id)}>Delete post</button>
            </div>
        </article>
    )
}

export default Post;
