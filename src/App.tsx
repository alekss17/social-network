import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/antd-responsive.css';
import { Routes, Route, Navigate, HashRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Preloader from './components/common/Preloader/Prelooader';
import store, { persistor, AppDispatch } from './redux/redux-store';
import { Breadcrumb, Layout, Menu, theme, Drawer } from 'antd';

import TestForProps from './components/tests';
import Login from './components/Login/login';

import Settings from './components/Settings/Settings';
import HelperSuspense from './components/common/Preloader/HelperSuspense';
import HeaderApp from './components/Header/Header';
import { initializeApp } from './redux/appReducer';
import { AppInitialized } from './redux/selectors/appSelector';
import { GetIsAuth, loginSelector } from './redux/selectors/authSelector';
import { logout } from './redux/authReducer';

const MypostsContainer = React.lazy(() => import('./components/Myposts/MypostsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));


const { Content, Sider } = Layout;

function App() {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isInitialized = useSelector(AppInitialized);
  const isAuth = useSelector(GetIsAuth);
  const login = useSelector(loginSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  const mobileMenuItems = [
    {
      key: 'profile-group',
      label: 'My profile',
      children: [
        {
          key: 'profile',
          label: <Link to="/profile">Profile</Link>,
        },
      ],
    },
    {
      key: 'developers-group',
      label: 'Developers',
      children: [
        {
          key: 'developers',
          label: <Link to="/developers">Developers</Link>,
        },
      ],
    },
    {
      type: 'divider' as const,
    },
    isAuth
      ? {
          key: 'account-group',
          type: 'group' as const,
          label: `Logged as: ${login}`,
          children: [
            {
              key: 'logout',
              label: 'Logout',
              onClick: handleLogout,
            },
          ],
        }
      : {
          key: 'login',
          label: <Link to="/login">Login</Link>,
        },
  ];

  const desktopMenuItems = [
    {
      key: 'profile-group',
      label: 'My profile',
      children: [
        {
          key: 'profile',
          label: <Link to="/profile">Profile</Link>,
        },
      ],
    },
    {
      key: 'developers-group',
      label: 'Developers',
      children: [
        {
          key: 'developers',
          label: <Link className='Home' to="/developers">Developers</Link>,
        },
      ],
    },
  ];

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <Layout>
      <HeaderApp onMenuClick={() => setMobileMenuOpen(true)} />
      
      {/* Mobile Menu Drawer */}
      <Drawer
        title="Navigation"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className='mobile-drawer'
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={['profile']}
          defaultOpenKeys={['profile-group']}
          onClick={handleMenuClick}
          items={mobileMenuItems}
        />
      </Drawer>
      
      <div className='app-main-wrapper'>
        <Breadcrumb
          className='app-breadcrumb'
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <Layout
          className='app-content-layout'
          style={{ borderRadius: borderRadiusLG }}
        >
          <Sider className='app-sider' width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['profile']}
              defaultOpenKeys={['profile-group']}
              style={{ height: '100%' }}
              items={desktopMenuItems}
            />
          </Sider>

          <Content className='app-content' style={{ minHeight: 280 }}>
            <Routes>
              <Route path="/profile/:userId?" element={<HelperSuspense Component={ProfileContainer} />} />

              <Route path="/myposts" element={<HelperSuspense Component={MypostsContainer} />} />

              <Route path="/settings" element={<Settings />} />
              <Route path="/test" element={<TestForProps />} />

              <Route path="/developers" element={<HelperSuspense Component={UsersContainer} />} />

              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Navigate to="/profile" />} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
}

let SamurajJSApp = () => {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  );
};

export default SamurajJSApp;
