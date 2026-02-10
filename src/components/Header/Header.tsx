import { NavLink } from 'react-router-dom';
import '../../Styles/Header.css'
import { HeaderPropsTypes } from '../../types/Types';
import { Layout, Col, Row, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { logout } from "../../redux/authReducer";
import { GetIsAuth, loginSelector } from "../../redux/selectors/authSelector";
import { AppDispatch, RootState } from "../../redux/redux-store";
import UserImg from '../../assets/images/user.jpg'
import { useDispatch, useSelector } from 'react-redux';

const { Header } = Layout;

const HeaderApp = () => {

  const isAuth = useSelector(GetIsAuth)
  const login = useSelector(loginSelector)

  const dispatch: AppDispatch = useDispatch()

  const logoutD = () => {
    dispatch(logout())
  }
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
    <div className="demo-logo" />

    <Row style={{ width: '100%' }}>
      <Col span={21}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Menu.Item><Link type='link' className='Home' to="/developers">Developers</Link></Menu.Item>
        </Menu>
      </Col>
      <Col span={3}>
      <div style={{display: 'flex', alignItems: 'center', gap: '7px'}}>
        <img src={UserImg} style={{ width: '25px', height: '25px' }} />
        <div className='loginB'>
        {isAuth ? <>{login}<button onClick={() => logoutD()}>logout</button></> : <><NavLink className='login' to={'/login'}>login</NavLink></> }
    </div>
  </div>
      </Col>
    </Row>
  </Header>

    // <header className="header-container">
    //   <img
    //     className="header-icon"
    //     src="https://img.freepik.com/free-vector/abstract-wavy-background-template_1035-8922.jpg"
    //     alt="Header logo"
    //   />
    // </header>
  );
};

export default HeaderApp;