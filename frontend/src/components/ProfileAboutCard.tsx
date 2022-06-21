import React, { useState } from 'react';
import Button from './Button';
import './styles/ProfileAboutCard.css';

const ProfileAboutCard = () => {
  const [section, setSection] = useState('Overview');
  return (
    <div className="profile_about_card card">
      <aside className="sidebar flex_col">
        <h1>About</h1>
        {[
          'Overview',
          'Work and Education',
          'Places Lived',
          'Contact and basic info',
          'Family and Relationships'
        ].map((sectionName) => (
          <Button
            classes={`${section === sectionName ? 'blue' : 'white'}`}
            onClick={() => setSection(sectionName)}
          >
            {sectionName}
          </Button>
        ))}
      </aside>

      <div className="info">{section}</div>
    </div>
  );
};

export default ProfileAboutCard;
