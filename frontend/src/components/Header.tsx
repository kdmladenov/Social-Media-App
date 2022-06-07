import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles/Header.css';
import { getUserDetails, logout } from '../state/actions/userActions';
import { adminMenuMap, userMenuMap } from '../inputs/headerMenuMaps';
import { BASE_URL } from '../constants/constants';
import useTypedSelector from '../hooks/useTypedSelector';

import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import Login from './Login';
import DropDown from './Dropdown';
import Avatar from './Avatar';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { loading, error, user } = useTypedSelector((state) => state.userDetails);

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUserDetails(userInfo?.userId));
    }
  }, [dispatch, user, userInfo]);

  return (
    <header>
      <div className="logo_mega_menu_group">
        <div className="mega_menu">
          <MegaMenu />
        </div>
        <NavLink to="/" className="header_logo">
          <img src={`${BASE_URL}/storage/images/logo.png`} alt="logo" />
        </NavLink>
      </div>
      <div className="search">
        <SearchBar />
      </div>
      <div className="header_menu_btn_group">
        <DropDown
          userInfo={userInfo}
          button={
            <div className={`header_menu_btn ${userInfo?.token ? 'user' : 'login_menu'}`}>
              <Avatar classes="image_only" imageUrl={user?.avatar} fullName={user?.fullName} />
            </div>
          }
          tooltipText={`${userInfo?.token ? 'User Menu' : 'Login'}`}
        >
          {userInfo?.token ? (
            <ul className="menu_user">
              {userMenuMap.map((link, index) => (
                <NavLink to={link.path}>
                  <li key={index}>{link.label}</li>
                </NavLink>
              ))}
              <div onClick={() => dispatch(logout())}>Log out</div>
            </ul>
          ) : (
            <Login />
          )}
        </DropDown>
        {userInfo?.role === 'admin' && (
          <DropDown
            userInfo={userInfo}
            button={
              <div className="header_menu_btn admin">
                <i className="fa fa-user-plus" />
              </div>
            }
            tooltipText="Admin Menu"
          >
            <ul className="menu_admin">
              {adminMenuMap.map((link, index) => (
                <NavLink to={link.path}>
                  <li key={index}>{link.label}</li>
                </NavLink>
              ))}
            </ul>
          </DropDown>
        )}
      </div>
    </header>
  );
};

export default Header;
