import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles/Header.css';
import { getUserDetails, logout } from '../context/actions/userActions';
import { userMenuMap } from '../data/inputs/headerMenuMaps';
import useTypedSelector from '../hooks/useTypedSelector';

import Login from './Login';
import DropDown from './Dropdown';
import Avatar from './Avatar';
import ButtonNav from './ButtonNav';
import UserSearchBar from './UserSearchBar';
import { LOGO_URL } from '../data/constants';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { loading, error, user } = useTypedSelector((state) => state.userDetails);

  const logoutHandler = () => {
    navigate('/');
    dispatch(logout());
  };

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUserDetails(userInfo?.userId));
    }
  }, [dispatch, user, userInfo]);

  return (
    <header>
      <div className="logo_search_group">
        <NavLink to="/" className="header_logo">
          <img src={LOGO_URL} alt="logo" />
        </NavLink>
        <div className="search">
          <UserSearchBar />
        </div>
        <div className="search_dropdown">
          <DropDown
            button={
              <div className="search_btn">
                <i className="fa fa-search" />
              </div>
            }
          >
            <UserSearchBar />
          </DropDown>
        </div>
      </div>

      {userInfo?.token && <ButtonNav currentPath={pathname} screen="home" userId={userInfo?.userId} />}

      <div className="header_menu_btn_group">
        <DropDown
          button={
            <div className={`header_menu_btn ${userInfo?.token ? 'user' : 'login_menu'}`}>
              <Avatar
                classes="image_only"
                imageUrl={user?.avatar}
                firstName={user?.firstName}
                lastName={user?.lastName}
              />
            </div>
          }
          tooltipText={`${userInfo?.token ? 'User Menu' : 'Login'}`}
        >
          {userInfo?.token ? (
            <ul className="menu_user">
              {userMenuMap(user.userId).map((link, index) => (
                <NavLink to={link.path} key={link.path}>
                  <li key={index}>{link.label}</li>
                </NavLink>
              ))}
              <div onClick={() => logoutHandler()}>Log out</div>
            </ul>
          ) : (
            <Login />
          )}
        </DropDown>
      </div>
    </header>
  );
};

export default Header;
