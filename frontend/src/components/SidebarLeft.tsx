import React from 'react';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import Accordion from './Accordion';
import Avatar from './Avatar';
import './styles/SidebarLeft.css';

const SidebarLeft = () => {
  const { avatar, fullName } = usersDummyData[0];
  return (
    <section className="sidebar_left">
      <Accordion key="user">
        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <Avatar imageUrl={avatar} fullName={fullName} />
            </Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>
            Profile
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};

export default SidebarLeft;

