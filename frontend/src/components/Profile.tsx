import React, { useState } from 'react';

import './styles/Profile.css';
import { getUserDetails, updateUserProfile } from '../state/actions/userActions';
import profileAddressInitialInputState from '../inputs/profileAddressInitialInputState';
import profileOverviewInitialInputState from '../inputs/profileOverviewInitialInputState';
import validateInputUser from '../validations/userValidator';
import useTypedSelector from '../hooks/useTypedSelector';

import Button from './Button';
import FormComponent from './FormComponent';
import ProfileAvatar from './ProfileAvatar';
import UserType from '../models/UserType';

const Profile: React.FC<{user: UserType}> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const { success: successUpdateUser } = useTypedSelector(
    (state) => state.userUpdateProfile
  );

  return (
    <div className="profile">
      <ProfileAvatar user={user} />
      <div className="profile_header">
        <Button
          classes={`rounded large ${activeTab === 'overview' ? 'blue_light' : 'white'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Button>
        <Button
          classes={`rounded large ${activeTab === 'address' ? 'blue_light' : 'white'}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </Button>
      </div>
      <div className="profile_form">
        <div className={`form ${activeTab === 'overview' ? 'active' : ''}`}>
          <FormComponent
            inputData={profileOverviewInitialInputState}
            updateAction={updateUserProfile}
            getDetailsAction={getUserDetails}
            resourceId={user?.userId}
            successUpdate={successUpdateUser}
            resource={user}
            validateInput={validateInputUser}
          />
        </div>
        <div className={`form ${activeTab === 'address' ? 'active' : ''}`}>
          <FormComponent
            inputData={profileAddressInitialInputState}
            updateAction={updateUserProfile}
            getDetailsAction={getUserDetails}
            resourceId={user?.userId}
            successUpdate={successUpdateUser}
            resource={user}
            validateInput={validateInputUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
