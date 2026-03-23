import '@testing-library/jest-dom';

jest.mock('antd', () => {
  const React = require('react');

  const createWrapper = (tag) => {
    const Component = ({ children, ...props }) => React.createElement(tag, props, children);
    return Component;
  };

  const renderMenuItems = (items = []) =>
    items.map((item, index) => {
      if (!item) return null;
      if (item.type === 'divider') {
        return React.createElement('hr', { key: item.key || `divider-${index}` });
      }
      const children = [
        item.label ? React.createElement('span', { key: `${item.key || index}-label` }, item.label) : null,
        item.children ? React.createElement(React.Fragment, { key: `${item.key || index}-children` }, renderMenuItems(item.children)) : null,
      ];
      return React.createElement('div', { key: item.key || index }, children);
    });

  const Layout = createWrapper('div');
  Layout.Header = createWrapper('header');
  Layout.Sider = createWrapper('aside');
  Layout.Content = createWrapper('main');
  Layout.Footer = createWrapper('footer');

  const Menu = ({ children, items, ...props }) =>
    React.createElement('nav', props, children || renderMenuItems(items));

  const Drawer = ({ children, open, ...props }) =>
    open ? React.createElement('section', props, children) : null;

  const Button = ({ children, ...props }) =>
    React.createElement('button', props, children);

  const Upload = ({ children, ...props }) =>
    React.createElement('div', props, children);

  const Breadcrumb = ({ items = [], ...props }) =>
    React.createElement(
      'nav',
      props,
      items.map((item, index) => React.createElement('span', { key: `${item.title}-${index}` }, item.title))
    );

  return {
    __esModule: true,
    Breadcrumb,
    Button,
    Drawer,
    Layout,
    Menu,
    Upload,
    theme: {
      useToken: () => ({
        token: {
          colorBgContainer: '#ffffff',
          borderRadiusLG: 8,
        },
      }),
    },
  };
});

jest.mock('@ant-design/icons', () => {
  const React = require('react');

  const Icon = (name) => (props) => React.createElement('span', props, name);

  return {
    __esModule: true,
    LoginOutlined: Icon('LoginOutlined'),
    LogoutOutlined: Icon('LogoutOutlined'),
    MenuOutlined: Icon('MenuOutlined'),
    SendOutlined: Icon('SendOutlined'),
    UploadOutlined: Icon('UploadOutlined'),
  };
});
