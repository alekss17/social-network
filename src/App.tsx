import React from 'react';
import './Styles/App.css';
import { Routes, Route, Navigate, HashRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Preloader from './components/common/Preloader/Prelooader';
import store, { persistor } from './redux/redux-store';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import Chat from "./components/Chat/Chat"

import TestForProps from './components/tests';
import Login from './components/Login/login';

import Settings from './components/Settings/Settings';
import HelperSuspense from './components/common/Preloader/HelperSuspense';
import SubMenu from 'antd/es/menu/SubMenu';
import HeaderApp from './components/Header/Header';

const MypostsContainer = React.lazy(() => import('./components/Myposts/MypostsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

const { Content, Footer, Sider } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <HeaderApp />
      <div style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            {/* <Menu

            /> */}
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

                <Menu.Item key="2">
                  <Button type='link'>
                    <Link type='link' to="/chat">Chat</Link>
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
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Routes>
              <Route path="/chat" element={<Chat />}></Route>

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
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
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