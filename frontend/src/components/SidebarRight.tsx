import React from 'react';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import Avatar from './Avatar';
import './styles/SidebarRight.css';

const SidebarRight = () => {
  return (
    <section className="sidebar_right">
      <h3>Birthdays</h3>
      John Doe has birthday today.
      <hr />
      <h3>Contacts</h3>
      {usersDummyData.map((user) => (
        <Avatar imageUrl={user.avatar} fullName={user.fullName} />
      ))}
    </section>
  );
};

export default SidebarRight;
