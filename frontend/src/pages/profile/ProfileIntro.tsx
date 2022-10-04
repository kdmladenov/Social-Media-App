import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import UserType from '../../types/UserType';
import getProfileAboutInfoItems from '../../utils/getProfileAboutInfoItems';
import './styles/ProfileIntro.css';

const ProfileIntro: React.FC<{ user: UserType }> = ({ user }) => {
  const profileInfoItemsMap = getProfileAboutInfoItems(user);

  return (
    <div className="profile_intro flex_col card">
      <h1>Intro</h1>
      <ul className="info_list flex_col">
        {profileInfoItemsMap['Overview'].map(
          ({ subsectionKey, icon, spanText, labelText, inputData }, index) =>
            user[subsectionKey as keyof UserType] &&
            inputData && (
              <li className="info_item flex" key={index}>
                <div className="info flex">
                  <i className={icon}></i>
                  <div className="info_details flex_col">
                    <span>{spanText}</span>
                    {labelText && <h5>{labelText}</h5>}
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default ProfileIntro;
