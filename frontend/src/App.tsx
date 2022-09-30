import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Toast from './components/Toast';
import { addToPortalRefs } from './context/actions/portalActions';
import ForgottenPasswordScreen from './pages/forgotten-password/ForgottenPasswordScreen';
import FriendsPage from './pages/friends/FriendsPage';
import HomePage from './pages/home/HomePage';
import LoginScreen from './pages/login/LoginScreen';
import ProfilePage from './pages/profile/ProfilePage';
import RegisterPage from './pages/register/RegisterPage';
import ResetPasswordScreen from './pages/reset-password/ResetPasswordScreen';
import SavedPostsPage from './pages/saved-posts/SavedPostsPage';
import { ToastRefType } from './types/ToastType';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const toastFriendshipRef = useRef<ToastRefType>(null);

  useEffect(() => {
    dispatch(addToPortalRefs({ toast_friendship: toastFriendshipRef }));
  }, [dispatch, toastFriendshipRef]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/profile/:userId/:section" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/saved" element={<SavedPostsPage />} />
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgottenPasswordScreen />} />
        <Route path="/resetPassword/:userId/:token" element={<ResetPasswordScreen />} />
      </Routes>
      <Footer />
      <Toast ref={toastFriendshipRef} idDiv="toast_friendship" />
    </Router>
  );
};

export default App;
