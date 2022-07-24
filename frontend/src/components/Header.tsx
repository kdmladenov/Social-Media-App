import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles/Header.css';
import { getUserDetails, logout } from '../context/actions/userActions';
import { userMenuMap } from '../data/inputs/headerMenuMaps';
import useTypedSelector from '../hooks/useTypedSelector';

import SearchBar from './SearchBar';
import Login from './Login';
import DropDown from './Dropdown';
import Avatar from './Avatar';
import ButtonNav from './ButtonNav';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { loading, error, user } = useTypedSelector((state) => state.userDetails);

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUserDetails(userInfo?.userId));
    }
  }, [dispatch, user, userInfo]);

  return (
    <header>
      <div className="logo_search_group">
        <NavLink to="/" className="header_logo">
          {/* <img src={`${BASE_URL}/storage/images/logo.png`} alt="logo" /> */}
          <img
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNqlwu8zxTt1fy6b2lZrYnQVUTTba15IX8Q&usqp=CAU'
            }
            alt="logo"
          />
        </NavLink>
        <SearchBar />
      </div>

      <ButtonNav currentPath={pathname} screen="home" />

      <div className="header_menu_btn_group">
        <DropDown
          // userInfo={userInfo}
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
              {userMenuMap.map((link, index) => (
                <NavLink to={link.path} key={link.path}>
                  <li key={index}>{link.label}</li>
                </NavLink>
              ))}
              <div onClick={() => dispatch(logout())}>Log out</div>
            </ul>
          ) : (
            <Login />
          )}
        </DropDown>
        {/* {userInfo?.role === 'admin' && (
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
                <NavLink to={link.path} key={link.path}>
                  <li key={index}>{link.label}</li>
                </NavLink>
              ))}
            </ul>
          </DropDown>
        )} */}
      </div>
    </header>
  );
};

export default Header;
