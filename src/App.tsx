import React, { useState } from 'react';
import './Styles/App.css';
import './Styles/antd-responsive.css';
import { Routes, Route, Navigate, HashRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Preloader from './components/common/Preloader/Prelooader';
import store, { persistor, AppDispatch } from './redux/redux-store';
import { Breadcrumb, Button, Layout, Menu, theme, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import TestForProps from './components/tests';
import Login from './components/Login/login';

import Settings from './components/Settings/Settings';
import HelperSuspense from './components/common/Preloader/HelperSuspense';
import SubMenu from 'antd/es/menu/SubMenu';
import HeaderApp from './components/Header/Header';
import { GetIsAuth, loginSelector } from './redux/selectors/authSelector';
import { logout } from './redux/authReducer';

const MypostsContainer = React.lazy(() => import('./components/Myposts/MypostsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));


const { Content, Footer, Sider } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuth = useSelector(GetIsAuth);
  const login = useSelector(loginSelector);
  const dispatch: AppDispatch = useDispatch();

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  return (
    <Layout>
      <HeaderApp 
        onMenuClick={() => setMobileMenuOpen(true)} 
      />
      
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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          onClick={handleMenuClick}
        >
          <SubMenu key="sub1" title="My profile">
            <Menu.Item key="1">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" title="Developers">
            <Menu.Item key="3">
              <Link to="/developers">Developers</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Divider />

          {isAuth ? (
            <>
              <Menu.ItemGroup title={`Logged as: ${login}`}>
                <Menu.Item key="logout" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.ItemGroup>
            </>
          ) : (
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
      
      <div className='app-main-wrapper'>
        <Breadcrumb
          className='app-breadcrumb'
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <Layout
          className='app-content-layout'
          style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider className='app-sider' style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" title="My profile">
                <Menu.Item key="1">
                  <Button type='link'>
                    <Link type='link' to="/profile">Profile</Link>
                  </Button>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="sub2" title="Developers">
                <Menu.Item key="3">
                  <Button type='link'>
                    <Link type='link' className='Home' to="/developers">Developers</Link>
                  </Button>
                </Menu.Item>
              </SubMenu>

            </Menu>
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
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  );
};

export default SamurajJSApp;