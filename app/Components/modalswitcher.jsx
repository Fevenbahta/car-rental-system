import React, { useState } from "react";
import RegisterModal from "./RegisterModal"; // Your RegisterModal component
import LoginModal from "../login/page"; // Your LoginModal component

const ModalSwitcher = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(true); // By default, show RegisterModal
  const [showLoginModal, setShowLoginModal] = useState(false);

  const showLogin = () => {
    setShowRegisterModal(false); // Close RegisterModal
    setShowLoginModal(true); // Open LoginModal
  };

  const showRegister = () => {
    setShowLoginModal(false); // Close LoginModal
    setShowRegisterModal(true); // Open RegisterModal
  };

  return (
    <div>
      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)} // Close RegisterModal
          onShowLogin={showLogin} // Passing the onShowLogin function here
        />
      )}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)} // Close LoginModal
        />
      )}
    </div>
  );
};

export default ModalSwitcher;
