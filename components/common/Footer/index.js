import React from 'react';
import Logo from '../../../assets/logo.png';
import TwitterLogo from '../../../assets/twitter.png';
import FbLogo from '../../../assets/fb.png';
import Link from "next/link";
import { connect } from "react-redux";
import { actions } from '../../../store';

const Footer = ({ 
    userData,
    toggleAuthModal,
    setAuthModalMode,
}) => {

    const onClickSignUpLink = () => {
        setAuthModalMode(false);
        toggleAuthModal();
    }

    const onClickLoginLink = () => {
        setAuthModalMode(true);
        toggleAuthModal();
    }

    return (
        <footer className='footer'>
            <Link href='/'>
                <img className='footer-logo' src={Logo} alt='logo'/>
            </Link>
            <div className='footer-links'>
                <div className='wrap-text-links'>
                    <Link href='/list?typeId=1'>
                        <a className='footer-link'>Missing</a>
                    </Link>
                    <Link href='/list?typeId=2'>
                        <a className='footer-link'>Finds</a>
                    </Link>
                    <Link href='/register-ad'>
                        <a className='footer-link'>Register Ad</a>
                    </Link>
                    {!userData ? (
                        <>
                            <a 
                                onClick={onClickLoginLink} 
                                className='footer-link'
                            >
                                Login
                            </a>
                            <a 
                                onClick={onClickSignUpLink} 
                                className='footer-link'
                            >
                                Sign Up
                            </a>
                        </>
                    ) : (
                        <>
                            <Link href='/account/myads'>
                                <a className='footer-link'>Your Ads</a>
                            </Link>
                            <Link href='/account/feedback'>
                                <a className='footer-link'>Feedback on your ads</a>
                            </Link>
                            <Link href='/account/commentaries'>
                                <a className='footer-link'>Your Commentaries on Ads</a>
                            </Link>
                        </>
                    )}
                </div>
                <div className='social-links'>
                    <a href='https://www.facebook.com/'>
                        <img className='social-logo' src={FbLogo} alt='fb-logo'/>
                    </a>
                    <a href='https://twitter.com/'>
                        <img className='social-logo' src={TwitterLogo} alt='tw-logo'/>
                    </a>
                </div>
            </div>
        </footer>
    )
}

const mapStateToProps = store => ({
    userData: store.app.userData,
});

const mapDispatchToProps = dispatch => ({
    toggleAuthModal: () => dispatch(actions.app.toggleAuthModal()),
    setAuthModalMode: (isLogin) => dispatch(actions.app.setAuthModalMode(isLogin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);