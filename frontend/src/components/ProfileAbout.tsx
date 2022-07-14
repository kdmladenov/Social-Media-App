import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import getProfileAboutInfoItems from '../helpers/getProfileAboutInfoItems';
import useTypedSelector from '../hooks/useTypedSelector';
import { photoList } from '../inputs/dummyInputs/imagesDummyData';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import FormInputDataType from '../models/FormInputDataType';
import PostType from '../models/PostType';
import SchoolType from '../models/SchoolType';
import UserType from '../models/UserType';
import WorkplaceType from '../models/WorkplaceType';
import {
  createSchool,
  deleteSchool,
  getSchoolDetails,
  updateSchool
} from '../state/actions/schoolsActions';
import { getUserDetails, updateUserProfile } from '../state/actions/userActions';
import {
  createWorkplace,
  deleteWorkplace,
  getWorkplaceDetails,
  updateWorkplace
} from '../state/actions/workplacesActions';
import validateInputUser from '../validations/userValidator';
import Button from './Button';
import ConfirmMessage from './ConfirmMessage';
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
  const { success: successSchoolUpdate } = useTypedSelector((state) => state.schoolUpdate);
  const { success: successWorkplaceUpdate } = useTypedSelector((state) => state.workplaceUpdate);

  const itemEditCreateHandler = (
    inputData: FormInputDataType,
    subsectionKey: keyof UserType,
    resourceId?: number,
    resource?: UserType | SchoolType | WorkplaceType | PostType,
    mode = 'edit'
  ) => {
    setIsModalOpen(true);
    setModalContent(
      <FormComponent
        inputData={inputData}
        updateAction={
          subsectionKey === 'workplaces'
            ? updateWorkplace
            : subsectionKey === 'schools'
            ? updateSchool
            : updateUserProfile
        }
        createAction={
          subsectionKey === 'workplaces'
            ? createWorkplace
            : subsectionKey === 'schools'
            ? createSchool
            : updateUserProfile
        }
        getDetailsAction={
          subsectionKey === 'workplaces'
            ? getWorkplaceDetails
            : subsectionKey === 'schools'
            ? getSchoolDetails
            : getUserDetails
        }
        resourceId={resourceId || user?.userId}
        successUpdate={
          subsectionKey === 'workplaces'
            ? successWorkplaceUpdate
            : subsectionKey === 'schools'
            ? successSchoolUpdate
            : successUserProfileUpdate
        }
        resource={resource || user}
        validateInput={validateInputUser}
        mode={mode}
      />
    );
  };

  const itemDeleteHandler = (
    subsectionKey: keyof UserType,
    messageEnding: string,
    resourceId?: number,
    actionSecondParam?: { [key: string]: string }
  ) => {
    setIsModalOpen(true);
    setModalContent(
      <ConfirmMessage
        setIsModalOpen={setIsModalOpen}
        message={`Are your sure you want to ${messageEnding}?`}
        resourceId={resourceId || user?.userId}
        actionSecondParam={actionSecondParam}
        action={
          subsectionKey === 'workplaces'
            ? deleteWorkplace
            : subsectionKey === 'schools'
            ? deleteSchool
            : updateUserProfile
        }
      />
    );
  };

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
            'Details about you'
          ].map((sectionName) => (
            <Button
              classes={`${section === sectionName ? 'blue_light' : 'white'}`}
              onClick={() => setSection(sectionName)}
              key={sectionName}
            >
              {sectionName}
            </Button>
          ))}
        </aside>
        <div className="profile_info">
          <ul className="info_list flex_col">
            {profileInfoItemsMap[section].map(
              ({
                subsectionKey,
                label,
                icon,
                spanText,
                labelText,
                inputData,
                resourceId,
                resource,
                title,
                addButton
              }) =>
                user[subsectionKey as keyof UserType] && inputData ? (
                  <li className="info_item flex">
                    <div className="info flex">
                      <i className={icon}></i>
                      <div className="info_details flex_col">
                        <span>{spanText}</span>
                        {labelText && <h5>{labelText}</h5>}
                      </div>
                    </div>
                    <DropDown
                      button={
                        <Button classes="icon info_item_btn flex">
                          <i className="fa fa-ellipsis-h"></i>
                        </Button>
                      }
                    >
                      <ul className="menu_info_item flex_col">
                        <li
                          className="flex"
                          onClick={() =>
                            itemEditCreateHandler(
                              inputData,
                              subsectionKey!,
                              resourceId,
                              resource,
                              'edit'
                            )
                          }
                        >
                          <i className="fa fa-edit"></i>
                          <span>{`Edit ${label}`}</span>
                        </li>
                        <li
                          className="flex"
                          onClick={() =>
                            label &&
                            subsectionKey &&
                            itemDeleteHandler(subsectionKey, `delete this ${label}`, resourceId, {
                              [`${subsectionKey}`]: ''
                            })
                          }
                        >
                          <i className="fas fa-trash"></i>
                          <span>{`Delete ${label}`}</span>
                        </li>
                      </ul>
                    </DropDown>
                  </li>
                ) : title ? (
                  <li>
                    <h3>{title}</h3>
                  </li>
                ) : addButton ? (
                  <li>
                    <h3>{addButton}</h3>
                  </li>
                ) : (
                  inputData &&
                  section !== 'Work and Education' && (
                    <li>
                      <Button
                        onClick={() =>
                          itemEditCreateHandler(
                            inputData,
                            subsectionKey!,
                            resourceId,
                            resource,
                            'create'
                          )
                        }
                        classes="text add_profile_info flex"
                      >
                        <i className="fa fa-plus"></i>
                        <span>{`Add a ${label}`}</span>
                      </Button>
                    </li>
                  )
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
