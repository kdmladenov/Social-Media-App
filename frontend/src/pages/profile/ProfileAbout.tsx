import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ConfirmMessage from '../../components/ConfirmMessage';
import DropDown from '../../components/Dropdown';
import FormComponent from '../../components/FormComponent';
import Modal from '../../components/Modal';
import {
  createSchool,
  deleteSchool,
  getSchoolDetails,
  updateSchool
} from '../../context/actions/schoolsActions';
import { getUserDetails, updateUserProfile } from '../../context/actions/userActions';
import {
  createWorkplace,
  deleteWorkplace,
  getWorkplaceDetails,
  updateWorkplace
} from '../../context/actions/workplacesActions';
import validateInputUser from '../../data/validations/userValidator';
import useTypedSelector from '../../hooks/useTypedSelector';
import FormInputDataType from '../../types/FormInputDataType';
import PostType from '../../types/PostType';
import SchoolType from '../../types/SchoolType';
import UserType from '../../types/UserType';
import WorkplaceType from '../../types/WorkplaceType';
import getProfileAboutInfoItems from '../../utils/getProfileAboutInfoItems';
import FriendList from './FriendList';
import PhotoList from './PhotoList';
import './styles/ProfileAbout.css';
import ProfileItemType from '../../types/ProfileItemType';
import { useDispatch } from 'react-redux';
import { USER_UPDATE_PROFILE_RESET } from '../../context/constants/userConstants';
import {
  WORKPLACE_CREATE_RESET,
  WORKPLACE_DELETE_RESET,
  WORKPLACE_UPDATE_RESET
} from '../../context/constants/workplaceConstants';
import {
  SCHOOL_CREATE_RESET,
  SCHOOL_DELETE_RESET,
  SCHOOL_UPDATE_RESET
} from '../../context/constants/schoolConstants';
import Carousel from '../../components/Carousel';

const ProfileAbout: React.FC<{ user: UserType }> = ({ user }) => {
  const dispatch = useDispatch();
  const [section, setSection] = useState<string>('Overview');
  const [profileInfoItems, setProfileInfoItems] = useState<ProfileItemType[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const { success: successUserUpdate } = useTypedSelector((state) => state.userUpdateProfile);
  const { success: successSchoolUpdate } = useTypedSelector((state) => state.schoolUpdate);
  const { success: successSchoolCreate } = useTypedSelector((state) => state.schoolCreate);
  const { success: successSchoolDelete } = useTypedSelector((state) => state.schoolDelete);
  const { success: successWorkplaceCreate } = useTypedSelector((state) => state.workplaceCreate);
  const { success: successWorkplaceUpdate } = useTypedSelector((state) => state.workplaceUpdate);
  const { success: successWorkplaceDelete } = useTypedSelector((state) => state.workplaceDelete);

  const sidebarButtons = [
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
  ));

  const itemEditCreateHandler = (
    inputData: FormInputDataType,
    subsectionKey: string,
    mode = 'update',
    resourceId?: number,
    resource?: UserType | SchoolType | WorkplaceType | PostType
  ) => {
    setIsModalOpen(true);

    setModalContent(
      <FormComponent
        inputData={inputData}
        updateAction={
          mode === 'update' &&
          (subsectionKey === 'workplaces'
            ? updateWorkplace
            : subsectionKey === 'schools'
            ? updateSchool
            : updateUserProfile)
        }
        createAction={
          mode === 'create' && (subsectionKey === 'workplaces' ? createWorkplace : createSchool)
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
            : successUserUpdate
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

  useEffect(() => {
    if (
      successUserUpdate ||
      successSchoolUpdate ||
      successSchoolCreate ||
      successSchoolDelete ||
      successWorkplaceCreate ||
      successWorkplaceUpdate ||
      successWorkplaceDelete
    ) {
      setIsModalOpen(false);
      dispatch(getUserDetails(+user.userId));
      dispatch({
        type: successUserUpdate
          ? USER_UPDATE_PROFILE_RESET
          : successWorkplaceUpdate
          ? WORKPLACE_UPDATE_RESET
          : successWorkplaceCreate
          ? WORKPLACE_CREATE_RESET
          : successWorkplaceDelete
          ? WORKPLACE_DELETE_RESET
          : successSchoolUpdate
          ? SCHOOL_UPDATE_RESET
          : successSchoolCreate
          ? SCHOOL_CREATE_RESET
          : successSchoolDelete
          ? SCHOOL_DELETE_RESET
          : ''
      });
    }
    setProfileInfoItems(getProfileAboutInfoItems(user)[section]);
  }, [
    dispatch,
    successUserUpdate,
    successSchoolUpdate,
    successSchoolCreate,
    successSchoolDelete,
    successWorkplaceCreate,
    successWorkplaceUpdate,
    successWorkplaceDelete,
    user,
    section
  ]);

  return (
    <div className="profile_about flex_col">
      <div className="profile_about_card card">
        <aside className="sidebar flex_col">
          <h1>About</h1>
          <div className="vertical_buttons flex_col">{sidebarButtons}</div>
          <Carousel>{sidebarButtons}</Carousel>
        </aside>
        <div className="profile_info">
          <ul className="info_list flex_col">
            {profileInfoItems?.map(
              (
                {
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
                },
                index
              ) =>
                user[subsectionKey as keyof UserType] && inputData ? (
                  <li className="info_item flex" key={`${subsectionKey}${resourceId}`}>
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
                              'update',
                              resourceId,
                              resource
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
                  <li key={`title-${title}`}>
                    <h3>{title}</h3>
                  </li>
                ) : addButton?.label ? (
                  <li key={`${addButton.label}${index}`}>
                    <Button
                      onClick={() =>
                        itemEditCreateHandler(
                          addButton.inputData,
                          addButton.subsectionKey,
                          'create'
                        )
                      }
                      classes="text add_profile_info flex"
                    >
                      <span>{`Add a ${addButton.label}`}</span>
                    </Button>
                  </li>
                ) : (
                  inputData &&
                  section !== 'Work and Education' && (
                    <li key={`${subsectionKey}${resourceId}`}>
                      <Button
                        onClick={() =>
                          itemEditCreateHandler(
                            inputData,
                            subsectionKey!,
                            'update',
                            resourceId,
                            resource
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
      <PhotoList screen="profile_about_screen" user={user} />
      <FriendList user={user} screen="profile_about_screen" />
      {isModalOpen && <Modal setIsOpenModal={setIsModalOpen}>{modalContent}</Modal>}
    </div>
  );
};

export default ProfileAbout;
