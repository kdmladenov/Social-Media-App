import React from 'react';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import Accordion from './Accordion';
import Avatar from './Avatar';
import ProfileCard from './ProfileCard';
import './styles/SidebarLeft.css';

const SidebarLeft = () => {
  const { avatar, firstName, lastName } = usersDummyData[0];
  return (
    <section className="sidebar_left">
      <Accordion key="user">
        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <Avatar imageUrl={avatar} firstName={firstName} lastName={lastName} />
            </Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>
            <ProfileCard user={usersDummyData[0]} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <Avatar
                imageUrl={'https://cdn4.iconfinder.com/data/icons/people-37/512/27-128.png'}
                firstName={'Friends'}
              />
            </Accordion.Title>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};

export default SidebarLeft;
