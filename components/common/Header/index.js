import React, { useEffect } from 'react'
import Link from "next/link";
import Search from './Search';
import LogoTitle from '../../../assets/logo2.png';
import AccountBtn from './AccountBtn';
import AuthModal from '../AuthModal';
import { connect } from "react-redux";
import { actions } from '../../../store';
import { getDataFromLS } from '../../../utils/getDataFromLS';

const Header = ({ 
    isOpenAuthModal,
    userData,
    login,
    logout,
    toggleAuthModal,
    isLoginAuthModalMode,
    setAuthModalMode,
}) => {

    useEffect(() => {
        login(getDataFromLS('userData'), getDataFromLS('token'));
    }, []);

    return (
        <>
            <header className='common-header'>
                <Link href='/'>
                    <img 
                        src={LogoTitle} 
                        className='title-logo'
                        alt='logo'
                    />
                </Link>
                <div className='wrap-head-actions'>
                    <Search />
                    <AccountBtn
                        userData={userData}
                        toggleAuthModal={toggleAuthModal}
                        logout={logout}
                    />
                </div>
            </header>
            <AuthModal 
                isOpen={isOpenAuthModal}
                onClose={toggleAuthModal}
                login={login}
                isLoginMode={isLoginAuthModalMode}
                setIsLoginMode={setAuthModalMode}
            />
        </>
    )
}

const mapStateToProps = store => ({
    isOpenAuthModal: store.app.isOpenAuthModal,
    isLoginAuthModalMode: store.app.isLoginAuthModalMode,
    userData: store.app.userData,
})

const mapDispatchToProps = dispatch => ({
    login: (userData, token) => dispatch(actions.app.login(userData, token)),
    logout: () => dispatch(actions.app.logout()),
    toggleAuthModal: () => dispatch(actions.app.toggleAuthModal()),
    setAuthModalMode: (isLogin) => dispatch(actions.app.setAuthModalMode(isLogin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
