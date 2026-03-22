import { NavLink } from 'react-router-dom';
import '../../Styles/Header.css'
import { Layout } from 'antd';
import { MenuOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { logout } from "../../redux/authReducer";
import { GetIsAuth, loginSelector } from "../../redux/selectors/authSelector";
import { AppDispatch } from "../../redux/redux-store";
import UserImg from '../../assets/images/user.jpg'
import { useDispatch, useSelector } from 'react-redux';

const { Header } = Layout;

interface HeaderAppProps {
  onMenuClick?: () => void;
}

const HeaderApp = ({ onMenuClick }: HeaderAppProps) => {

  const isAuth = useSelector(GetIsAuth)
  const login = useSelector(loginSelector)

  const dispatch: AppDispatch = useDispatch()

  const logoutD = () => {
    dispatch(logout())
  }

  return (
    <Header className='header-app'>
      <div className="header-left">
        <button className='header-mobile-menu-btn' onClick={onMenuClick}>
          <MenuOutlined />
        </button>
        <div className="demo-logo" />
      </div>

      <div className='header-spacer'></div>

      <div className='header-user-section'>
        <img src={UserImg} alt="User avatar" className='header-user-avatar' />
        <div className='loginB'>
          {isAuth ? (
            <>
              <span className='header-login-name'>{login}</span>
              <button onClick={() => logoutD()} className='header-logout-btn'>logout</button>
            </>
          ) : (
            <NavLink className='login' to={'/login'}>login</NavLink>
          )}
        </div>
        {isAuth ? (
          <button onClick={() => logoutD()} className='header-logout-icon-btn' title='Logout'>
            <LogoutOutlined />
          </button>
        ) : (
          <NavLink className='header-login-icon-btn' to={'/login'} title='Login'>
            <LoginOutlined />
          </NavLink>
        )}
      </div>
    </Header>
  );
};

export default HeaderApp;