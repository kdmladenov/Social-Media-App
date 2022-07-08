import React from 'react';
import PostCreateCard from '../components/PostCreateCard';
import PostsMy from '../components/PostsMy';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import StoriesMy from '../components/StoriesMy';
import './styles/HomeScreen.css';

const HomeScreen: React.FC = () => {
  return (
    <main className="home_screen">
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

export default HomeScreen;
