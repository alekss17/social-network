import React from 'react';
import '../../styles/Users.css';
import userPhoto from '../../assets/images/user.jpg'
import { NavLink } from 'react-router-dom';
import { UsersType } from '../../types/Types';

interface UserProps {
    User: UsersType;
    FollowingInProgress: number[];
    Follow: (UserId: number) => void;
    UnFollow: (UserId: number) => void;
}

const User = React.memo(({User, FollowingInProgress, Follow, UnFollow}: UserProps) => {
    return (
        <div className="user-card">
            <div>
                <NavLink to={'/profile/' + User.id}>
                    <img className="ManPhoto" src={User.photos.small || userPhoto} alt={User.name} />
                </NavLink>
            </div>
            <div style={{ flex: 1 }}>
                <div>{User.name}</div>
                <div>{User.status}</div>
            </div>
            <div className="user-actions">
                {User.followed
                    ? <button 
                        disabled={FollowingInProgress.some(id => id === User.id)} 
                        onClick={() => UnFollow(User.id)}
                      >
                        Unfollow
                      </button>
                    : <button 
                        disabled={FollowingInProgress.some(id => id === User.id)} 
                        onClick={() => Follow(User.id)}
                      >
                        Follow
                      </button>
                }
            </div>
        </div>
    );
})

export default User
