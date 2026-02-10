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
            <img src={profile.photos?.large || UserImg} alt="Profile" />

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
            {owner && <Button type='primary' onClick={goToEditMode}>edit</Button>}
            <div>
                {profile.aboutMe &&
                    <p>About Me: {profile.aboutMe}</p>
                }
            </div>
            <div className='Contacts'>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    const contactKey = key as keyof Contacts;
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[contactKey]} />
                })}
            </div>
            <div className='Job'>
                <p>lookingForAJob: {profile.lookingForAJob === true ? 'yes' : 'no'}</p>
                {profile.lookingForAJob &&
                    <p>lookingForAJobDescription: {profile.lookingForAJobDescription}</p>
                }
            </div>
            <p className='Name'>fullName: {profile.fullName}</p>
        </>
    )
}

interface ContactProps {
    contactTitle: string;
    contactValue: string | null;
}

const Contact = ({ contactTitle, contactValue }: ContactProps) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;