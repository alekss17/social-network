import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/App.css';
import { Button } from 'antd';

const NavBar = () => {
  return (
    <div>
        <div className='Routes'>

      <Button type='link'>
      <Link type='link' className='Home' to="/music">Music</Link>
      </Button>
      <Button type='link'>
      <Link type='link' className='Home' to="/settings">Settings</Link>
      </Button>

      </div>
    </div>
  );
};
 
export default NavBar;