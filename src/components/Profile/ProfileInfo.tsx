import '../../styles/Myposts.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Preloader from '../common/Preloader/Prelooader';
import ProfileStatus from './ProfileStatus';
import UserImg from '../../assets/images/user.jpg';
import ProfileDataForm from '../Forms/ProfileDataForm';
import { Contacts, ProfileFormValue, ProfileTypeProps, UserProfile } from '../../types/Types';
import { RootState } from '../../redux/redux-store';

const CONTACT_ICONS: Record<string, string> = {
    github: 'GH',
    vk: 'VK',
    facebook: 'FB',
    instagram: 'IG',
    twitter: 'TW',
    youtube: 'YT',
    linkedin: 'IN',
    website: 'WEB'
};

const CONTACT_URLS: Record<string, (value: string) => string> = {
    github: (value) => `https://github.com/${value}`,
    vk: (value) => `https://vk.com/${value}`,
    facebook: (value) => `https://facebook.com/${value}`,
    instagram: (value) => `https://instagram.com/${value}`,
    twitter: (value) => `https://twitter.com/${value}`,
    youtube: (value) => `https://youtube.com/${value}`,
    linkedin: (value) => `https://linkedin.com/in/${value}`,
    website: (value) => value.startsWith('http') ? value : `https://${value}`
};

const ProfileInfo = ({ UpdateProfileStats, isOwner, savePhoto, saveProfile }: ProfileTypeProps) => {
    const profile = useSelector((state: RootState) => state.ProfileReducer.profile);
    const profileStatus = useSelector((state: RootState) => state.ProfileReducer.ProfileStatus);
    const isProfileLoaded = useSelector((state: RootState) => state.ProfileReducer.ProfileLoading);
    const [editMode, setEditMode] = useState(false);

    if (!isProfileLoaded || !profile) {
        return <Preloader />;
    }

    const handleSubmit = async (values: ProfileFormValue) => {
        const errors = await saveProfile(values);

        if (!errors) {
            setEditMode(false);
        }

        return errors;
    };

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
            <img className="profileLargePhoto" src={profile.photos.large || UserImg} alt="Profile" />

            {isOwner && (
                <div>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload image</Button>
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
                    onLeaveSubmit={() => setEditMode(false)}
                />
            ) : (
                <ProfileData
                    profile={profile}
                    owner={isOwner}
                    goToEditMode={() => setEditMode(true)}
                />
            )}
        </>
    );
};

interface ProfileDataProps {
    profile: UserProfile;
    owner: boolean;
    goToEditMode: () => void;
}

const ProfileData = ({ profile, owner, goToEditMode }: ProfileDataProps) => (
    <>
        {owner && (
            <div className='profile-actions-compact'>
                <Button type='primary' size='small' onClick={goToEditMode}>
                    Edit Profile
                </Button>
            </div>
        )}

        {profile.aboutMe && <p className='profile-about'>About Me: {profile.aboutMe}</p>}

        <div className='Contacts'>
            <h4 className='contacts-title'>Contacts</h4>
            <div className='contacts-grid'>
                {Object.keys(profile.contacts).map((key) => {
                    const contactKey = key as keyof Contacts;
                    return (
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[contactKey]}
                        />
                    );
                })}
            </div>
        </div>

        <div className='Job'>
            <p>Looking for a job: <strong>{profile.lookingForAJob ? 'Yes' : 'No'}</strong></p>
            {profile.lookingForAJob && <p>Description: {profile.lookingForAJobDescription}</p>}
        </div>

        <p className='Name'>Name: <strong>{profile.fullName}</strong></p>
    </>
);

interface ContactProps {
    contactTitle: string;
    contactValue: string | null;
}

const Contact = ({ contactTitle, contactValue }: ContactProps) => {
    if (!contactValue) {
        return null;
    }

    return (
        <div className='contact-item'>
            <span className='contact-icon'>{CONTACT_ICONS[contactTitle.toLowerCase()] || 'LINK'}</span>
            <div className='contact-content'>
                <span className='contact-label'>{contactTitle}</span>
                <a
                    href={getContactUrl(contactTitle, contactValue)}
                    target='_blank'
                    rel='noreferrer'
                    className='contact-value'
                >
                    {contactValue}
                </a>
            </div>
        </div>
    );
};

const getContactUrl = (type: string, value: string) => {
    const urlBuilder = CONTACT_URLS[type.toLowerCase()];
    return urlBuilder ? urlBuilder(value) : '#';
};

export default ProfileInfo;
