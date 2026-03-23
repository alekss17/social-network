import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import Profile from './Profile';
import { getProfile, getProfileStatus, savePhoto, saveProfile, updateProfileStatus } from '../../redux/ProfilePageReducer';
import { AppDispatch, RootState } from '../../redux/redux-store';
import AuthRedirectComponent from '../../hoc/WithAuthNavigate';
import { ProfileFormValue, SaveProfileResult } from '../../types/Types';

const ProfileContainer = () => {
  const { userId: urlUserId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const authorizedUserId = useSelector((state: RootState) => state.auth.userId);
  const userId = urlUserId ? Number(urlUserId) : authorizedUserId;
  const isOwner = authorizedUserId === userId;

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(getProfile(userId));
    dispatch(getProfileStatus(userId));
  }, [dispatch, userId]);

  const handleSaveProfile = useCallback(async (profileData: ProfileFormValue): Promise<SaveProfileResult> => {
    return await dispatch(saveProfile(profileData));
  }, [dispatch]);

  const handleUpdateProfileStats = useCallback((status: string) => {
    dispatch(updateProfileStatus(status));
  }, [dispatch]);

  const handleSavePhoto = useCallback((file: File) => {
    dispatch(savePhoto(file));
  }, [dispatch]);

  return (
    <Profile
      isOwner={isOwner}
      UpdateProfileStats={handleUpdateProfileStats}
      savePhoto={handleSavePhoto}
      saveProfile={handleSaveProfile}
    />
  );
};

export default AuthRedirectComponent(ProfileContainer);
