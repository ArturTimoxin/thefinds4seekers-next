import React from 'react'
import { Modal } from 'semantic-ui-react';
import Login from './Login';
import SignUp from './SignUp';

const AuthModal = ({ isOpen, onClose, login, isLoginMode, setIsLoginMode }) => {
    return (
        <Modal
            open={isOpen}
            size='mini'
            closeIcon={true}
            onClose={onClose}
        >
            {isLoginMode ? (
                <Login 
                    setIsLoginMode={setIsLoginMode}
                    login={login}
                    closeModal={onClose}
                />
            ) : (
                <SignUp 
                    setIsLoginMode={setIsLoginMode}
                    login={login}
                    closeModal={onClose}
                />
            )}
        </Modal>
    )
}

export default AuthModal;