import '../../styles/Home.css';
import MypostsContainer from '../Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo';
import { ProfileTypeProps } from '../../types/Types';

const Profile = (props: ProfileTypeProps) => {
  return (
    <section className='profile-page'>
      <ProfileInfo {...props} />
      <MypostsContainer />
    </section>
  );
};

export default Profile;
