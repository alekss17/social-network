import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import Profile from './Profile';
import { GetProfile, GetProfilStatus, UpdateProfileStats, savePhoto, saveProfile } from '../../redux/ProfilePageReducer';
import { AppDispatch, RootState } from '../../redux/redux-store';
import AuthRedirectComponent from '../../hoc/WithAuthNavigate';
import { ProfileFormValue } from '../../types/Types';

const ProfileContainer = () => {
  const { userId: urlUserId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  
  const meId = useSelector((state: RootState) => state.auth.userId);
  
  const userId = urlUserId ? Number(urlUserId) : meId;
  const isOwner = meId === userId;
  
  useEffect(() => {
    if (userId) {
      dispatch(GetProfile(userId));
      dispatch(GetProfilStatus(userId));
    }
  }, [userId, dispatch]);
  
  const handleSaveProfile = useCallback(async (profileData: ProfileFormValue): Promise<any> => {
    return await dispatch(saveProfile(profileData));
  }, [dispatch]);
  
  const handleUpdateProfileStats = useCallback((status: string) => {
    dispatch(UpdateProfileStats(status));
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