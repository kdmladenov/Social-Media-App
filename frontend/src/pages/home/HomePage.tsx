import React from 'react';
import SidebarLeft from './SidebarLeft';
import PostCreateCard from './posts/PostCreateCard';
import PostsMy from './posts/PostsMy';
import StoriesMy from './stories/StoriesMy';


import './styles/HomePage.css';
import SidebarRight from './SidebarRight';

const HomePage: React.FC = () => {
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
