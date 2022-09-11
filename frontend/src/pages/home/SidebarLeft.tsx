import React from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../components/Accordion';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import { BASE_URL } from '../../data/constants';
import useTypedSelector from '../../hooks/useTypedSelector';

import './styles/SidebarLeft.css';

const SidebarLeft = () => {
  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.userDetails);

  return (
    <section className="sidebar_left">
      <Accordion key="user">
        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <Avatar
                imageUrl={user?.avatar}
                firstName={user?.firstName}
                lastName={user?.lastName}
              />
            </Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>
            <div className="profile_card">
              <div className="cover">
                <img
                  src={user?.cover?.startsWith('http') ? user?.cover : `${BASE_URL}/${user?.cover}`}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  crossOrigin="anonymous"
                />
              </div>
              <Avatar
                classes="image_only current_user"
                imageUrl={user?.avatar}
                firstName={user?.firstName}
                lastName={user?.lastName}
              />
              <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
              <h3>
                {
                  user?.workplaces?.sort(
                    (a, b) =>
                      new Date(b.startDate).getFullYear() - new Date(a.startDate).getFullYear()
                  )[0].position
                }
              </h3>
              <Divider></Divider>
              <div className="info">
                <div className="connections flex">
                  {user?.friends?.length ? (
                    <>
                      <div className="friends_avatars flex">
                        {user?.friends.slice(0, 4).map((friend, index) => (
                          <Avatar classes="image_only" imageUrl={friend?.avatar} key={index} />
                        ))}
                      </div>
                      <h4>{`${user?.friends.length} Friend${
                        user?.friends.length > 1 ? 's' : ''
                      }`}</h4>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <Button classes="white" onClick={() => navigate('/profile/posts')}>
                Profile
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {[
          {
            icon: 'fas fa-user-friends',
            title: 'Friends',
            navigateTo: '/friends'
          },
          {
            icon: 'fa fa-bookmark',
            title: 'Saved Posts',
            navigateTo: '/saved'
          }
        ].map((item) => (
          <Accordion.Item isOpen={true}>
            <Accordion.Header>
              <Accordion.Title>
                <div onClick={() => navigate(item.navigateTo)}>
                  <div className="section_title flex">
                    <i className={item?.icon}></i>
                    <span className="title">{item?.title}</span>
                  </div>
                </div>
              </Accordion.Title>
            </Accordion.Header>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
};

export default SidebarLeft;
