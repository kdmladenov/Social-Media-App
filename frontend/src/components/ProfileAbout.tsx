import React, { useState } from 'react';
import getProfileAboutInfoItems from '../helpers/getProfileAboutInfoItems';
import useTypedSelector from '../hooks/useTypedSelector';
import { photoList } from '../inputs/dummyInputs/imagesDummyData';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import FormInputDataType from '../models/FormInputDataType';
import UserType from '../models/UserType';
import { getUserDetails, updateUserProfile } from '../state/actions/userActions';
import validateInputUser from '../validations/userValidator';
import Button from './Button';
import DropDown from './Dropdown';
import FormComponent from './FormComponent';
import FriendList from './FriendList';
import Modal from './Modal';
import PhotoList from './PhotoList';
import './styles/ProfileAbout.css';

const friendsList = [...usersDummyData, ...usersDummyData];

const ProfileAbout: React.FC<{ user: UserType }> = ({ user }) => {
  const [section, setSection] = useState<keyof typeof profileInfoItemsMap>('Overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const { success: successUserProfileUpdate } = useTypedSelector(
    (state) => state.userUpdateProfile
  );

  const itemEditHandler = () => {
    setIsModalOpen(true);
    setModalContent(<span>Edit</span>);
  };
  const itemDeleteHandler = () => {
    setIsModalOpen(true);
    setModalContent(<span>Delete</span>);
  };

  const itemAddHandler = (inputData: FormInputDataType) => {
    if (inputData) {
      setIsModalOpen(true);
      setModalContent(
        <FormComponent
          inputData={inputData}
          updateAction={updateUserProfile}
          getDetailsAction={getUserDetails}
          resourceId={user?.userId}
          successUpdate={successUserProfileUpdate}
          resource={user}
          validateInput={validateInputUser}
        />
      );
    }
  };

  const {
    // gender,
    // dateOfBirth,
    // phone,
    // email,
    // relationshipStatus,
    // homeCity,
    // homeCountry,
    // currentCity,
    // currentCountry
    // aboutMe
  } = user;

  

  const profileInfoItemsMap = getProfileAboutInfoItems(user);

  return (
    <div className="profile_about flex_col">
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
              classes={`${section === sectionName ? 'blue_light' : 'white'}`}
              onClick={() => setSection(sectionName)}
            >
              {sectionName}
            </Button>
          ))}
        </aside>

        <div className="profile_info">
          <ul className="info_list flex_col">
            {profileInfoItemsMap[section].map(({ subsectionKey, label, icon, spanText, inputData }) =>
              user[subsectionKey as keyof typeof user] ? (
                <li className="info_item flex">
                  <div className="info flex">
                    <i className={icon}></i>
                    <span>{spanText}</span>
                  </div>
                  <DropDown
                    button={
                      <Button classes="icon info_item_btn flex">
                        <i className="fa fa-ellipsis-h"></i>
                      </Button>
                    }
                  >
                    <ul className="menu_info_item flex_col">
                      <li className="flex" onClick={itemEditHandler}>
                        <i className="fa fa-edit"></i>
                        <span>{`Edit ${label}`}</span>
                      </li>
                      <li className="flex" onClick={itemDeleteHandler}>
                        <i className="fas fa-trash"></i>
                        <span>{`Delete ${label}`}</span>
                      </li>
                    </ul>
                  </DropDown>
                </li>
              ) : (
                // </ul>
                <li>
                  <Button
                    onClick={() => itemAddHandler(inputData)}
                    classes="text add_profile_info flex"
                  >
                    <i className="fa fa-plus"></i>
                    <span>{`Add a ${label}`}</span>
                  </Button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <PhotoList screen="profile_about_screen" photos={photoList} />
      <FriendList screen="profile_about_screen" friends={friendsList} />
      {isModalOpen && <Modal setIsOpenModal={setIsModalOpen}>{modalContent}</Modal>}
    </div>
  );
};

export default ProfileAbout;
