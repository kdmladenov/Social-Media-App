import React from 'react';
import Accordion from '../../components/Accordion';
import Avatar from '../../components/Avatar';
import usersDummyData from '../../data/inputs/dummyInputs/usersDummyData';
import './styles/SidebarRight.css';

const SidebarRight:React.FC = () => {
  return (
    <section className="sidebar_right">
      <Accordion key="user">
        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <h3>Birthdays</h3>
            </Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>John Doe has birthday today. </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <h3>Contacts</h3>
            </Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>
            {usersDummyData.map((user) => (
              <Avatar
                imageUrl={user.avatar}
                firstName={user.firstName}
                lastName={user.lastName}
                key={user.userId}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};

export default SidebarRight;
