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
                            <Link href='/account'>
                                <a className='footer-link'>Your Ads</a>
                            </Link>
                            <Link href='/account/answers'>
                                <a className='footer-link'>Answers on your ads</a>
                            </Link>
                            {/* <Link href='/account/commentaries'>
                                <a className='footer-link'>Your Commentaries on Ads</a>
                            </Link> */}
                        </>
                    )}
                </div>
                <div className='contact-links'>
                    <div className='wrap-social-logo'>
                        <a href='https://www.facebook.com/TheFinds4Seekers-109107327482391/'>
                            <img className='social-logo' src={FbLogo} alt='fb-logo'/>
                        </a>
                        <a href='https://twitter.com/finds4seekers'>
                            <img className='social-logo' src={TwitterLogo} alt='tw-logo'/>
                        </a>
                    </div>
                    <div className='company-info'>
                        <a 
                            className='company-email' 
                            href="mailto:thefinds4seekers@gmail.com"
                        >
                            thefinds4seekers@gmail.com
                        </a>
                        <div className='company-subinfo'>
                            {new Date().getFullYear()} TheFinds4Seekers, Inc. All rights reserved.
                        </div>
                    </div>
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