import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import './styles/ProfileIntro.css';

const ProfileIntro: React.FC = () => {
  const [openBioModal, setOpenBioModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  return (
    <div className="profile_intro card flex_col">
      <Link to={'/profile/about'}>
        <h1>Intro</h1>
      </Link>

      <Button onClick={() => setOpenBioModal(true)}>Add bio</Button>
      <Button onClick={() => setOpenDetailsModal(true)}>Edit details</Button>
      {openBioModal && (
        <Modal classes="image" setIsOpenModal={setOpenBioModal}>
          Add Bio Modal
        </Modal>
      )}
      {openDetailsModal && (
        <Modal classes="image" setIsOpenModal={setOpenDetailsModal}>
          Add Details Modal
        </Modal>
      )}
    </div>
  );
};

export default ProfileIntro;
