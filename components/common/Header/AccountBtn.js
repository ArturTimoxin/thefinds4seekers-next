import React, { useState } from 'react';
import Link from "next/link";
import AccountIcon from '../../../assets/profile2.png';
import { Dropdown } from 'semantic-ui-react';

const AccountBtn = ({ logout, userData, toggleAuthModal }) => {

    const [isOpenDropdown, setIsOpenDropDown] = useState(false);

    const onClickAccount = () => {
        if(userData) {
            setIsOpenDropDown(!isOpenDropdown);
            return;
        }
        toggleAuthModal();
    }

    const onCloseDropdown = () => {
        setIsOpenDropDown(false);
    }

    const onClickLogout = () => {
        onCloseDropdown();
        logout();
    }

    return (
        <div className='account-btn'>
            <img 
                className='account-logo'
                src={AccountIcon} 
                alt='account-logo'
                onClick={onClickAccount}
            />
            <Dropdown
                direction='left'
                icon=''
                open={isOpenDropdown}
            >
                <Dropdown.Menu>
                    <Dropdown.Item disabled text={`Hello, ${userData && userData.firstname}`} />
                    <Link href='/account'>
                        <Dropdown.Item text='My Ads' onClick={onCloseDropdown} />
                    </Link>
                    <Link href='/account/answers'>
                        <Dropdown.Item text='Answers' onClick={onCloseDropdown} />
                    </Link>
                    {/* <Link href='/account/commentaries'>
                        <Dropdown.Item text='My commentaries' onClick={onCloseDropdown} />
                    </Link> */}
                    <Dropdown.Item text='Logout' onClick={onClickLogout} />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default AccountBtn;