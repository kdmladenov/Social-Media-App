import React, { useEffect } from 'react';
import SidebarLeft from './SidebarLeft';
import PostCreateCard from './posts/PostCreateCard';
import PostsMy from './posts/PostsMy';
import StoriesMy from './stories/StoriesMy';

import './styles/HomePage.css';
import SidebarRight from './SidebarRight';
import useTypedSelector from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../../context/actions/userActions';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useTypedSelector((state) => state.userDetails);
  const { userInfo } = useTypedSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo?.userId && userInfo?.userId !== user?.userId) {
      dispatch(getUserDetails(+userInfo?.userId));
    }
    if (!userInfo?.userId) {
      navigate('login');
    }
  }, [dispatch, navigate, userInfo?.userId, user?.userId]);
  
  return (
    <main className="home_page">
      <SidebarLeft />
      <div className="home_content flex_col">
        <StoriesMy />
        <PostCreateCard />
        <PostsMy />
      </div>
      <SidebarRight />
    </main>
  );
};

export default HomePage;
