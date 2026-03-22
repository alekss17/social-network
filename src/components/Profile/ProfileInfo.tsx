import '../../Styles/Myposts.css'
import React from 'react';
import Preloader from '../common/Preloader/Prelooader';
import ProfileStatus from './ProfileStatus'
import UserImg from '../../assets/images/user.jpg'
import { useState } from 'react';
import ProfileDataForm from '../Forms/ProfileDataForm';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ProfileTypeProps, UserProfile, Contacts, ProfileFormValue } from '../../types/Types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/redux-store';

const ProfileInfo = ({UpdateProfileStats, isOwner, savePhoto, saveProfile }: ProfileTypeProps) => {
    const profile = useSelector((state: RootState) => state.ProfileReducer.profile);
    const profileStatus = useSelector((state: RootState) => state.ProfileReducer.ProfileStatus);
    const ProfileLoading = useSelector((state: RootState) => state.ProfileReducer.ProfileLoading);

    const [editMode, setEditMode] = useState<boolean>(false)

    if (!ProfileLoading || !profile) return <Preloader />

    const handleSubmit = async (values: ProfileFormValue) => {
        const errors = await saveProfile(values)

        if (!errors) {
            setEditMode(false)
        }

        return errors
    }
    const onLeaveSubmit = () => setEditMode(false)

    const uploadProps: UploadProps = {
        accept: 'image/*',
        showUploadList: false,
        beforeUpload: (file) => {
            savePhoto(file);
            return false;
        },
    };
    
    return (
        <>
            <img className="profileLargePhoto" src={profile.photos?.large || UserImg} alt="Profile" />

            {isOwner && (
                <div>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>
                            Upload image
                        </Button>
                    </Upload>
                </div>
            )}

            <ProfileStatus
                isOwner={isOwner}
                profileStatus={profileStatus}
                UpdateProfileStats={UpdateProfileStats}
            />

            {editMode ? (
                <ProfileDataForm
                    profile={profile}
                    handleSubmit={handleSubmit}
                    onLeaveSubmit={onLeaveSubmit}
                />
            ) : (
                <ProfileData
                    profile={profile}
                    owner={isOwner}
                    goToEditMode={() => setEditMode(true)}
                />
            )}
        </>
    )
}

interface ProfileDataProps {
    profile: UserProfile;
    owner: boolean;
    goToEditMode: () => void;
}

const ProfileData = ({ profile, owner, goToEditMode }: ProfileDataProps) => {
    return (
        <>
            {owner && (
                <div className='profile-actions-compact'>
                    <Button type='primary' size='small' onClick={goToEditMode}>
                        ✎ Edit Profile
                    </Button>
                </div>
            )}
            <div>
                {profile.aboutMe &&
                    <p className='profile-about'>About Me: {profile.aboutMe}</p>
                }
            </div>
            <div className='Contacts'>
                <h4 className='contacts-title'>Contacts</h4>
                <div className='contacts-grid'>
                    {Object.keys(profile.contacts).map(key => {
                        const contactKey = key as keyof Contacts;
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[contactKey]} />
                    })}
                </div>
            </div>
            <div className='Job'>
                <p>Looking for a job: <strong>{profile.lookingForAJob === true ? 'Yes' : 'No'}</strong></p>
                {profile.lookingForAJob &&
                    <p>Description: {profile.lookingForAJobDescription}</p>
                }
            </div>
            <p className='Name'>Name: <strong>{profile.fullName}</strong></p>
        </>
    )
}

interface ContactProps {
    contactTitle: string;
    contactValue: string | null;
}

const Contact = ({ contactTitle, contactValue }: ContactProps) => {
    if (!contactValue) return null;
    const icon = getContactIcon(contactTitle);
    return (
        <div className='contact-item'>
            <span className='contact-icon'>{icon}</span>
            <div className='contact-content'>
                <span className='contact-label'>{contactTitle}</span>
                <a href={getContactUrl(contactTitle, contactValue)} target='_blank' rel='noreferrer' className='contact-value'>
                    {contactValue}
                </a>
            </div>
        </div>
    )
}

const getContactIcon = (type: string) => {
    const icons: { [key: string]: string } = {
        'github': '🔗',
        'vk': 'VK',
        'facebook': 'f',
        'instagram': '📷',
        'twitter': '𝕏',
        'youtube': '▶',
        'linkedin': 'in',
        'website': '🌐'
    };
    return icons[type.toLowerCase()] || '🔗';
}

const getContactUrl = (type: string, value: string) => {
    const urls: { [key: string]: (v: string) => string } = {
        'github': (v) => `https://github.com/${v}`,
        'vk': (v) => `https://vk.com/${v}`,
        'facebook': (v) => `https://facebook.com/${v}`,
        'instagram': (v) => `https://instagram.com/${v}`,
        'twitter': (v) => `https://twitter.com/${v}`,
        'youtube': (v) => `https://youtube.com/${v}`,
        'linkedin': (v) => `https://linkedin.com/in/${v}`,
        'website': (v) => v.startsWith('http') ? v : `https://${v}`
    };
    const urlBuilder = urls[type.toLowerCase()];
    return urlBuilder ? urlBuilder(value) : '#';
}

export default ProfileInfo;