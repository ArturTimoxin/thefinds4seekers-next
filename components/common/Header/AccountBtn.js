import React, { useState } from 'react';
import Link from "next/link";
import AccountIcon from '../../../assets/profile2.png';
import { Dropdown } from 'semantic-ui-react';
import { toastSuccess } from '../../../utils/toastrConfig';

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
        toastSuccess('You have been successfully loggged out')
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
                    <Link href='/account/myads'>
                        <Dropdown.Item text='My Ads' onClick={onCloseDropdown} />
                    </Link>
                    <Link href='/account/feedback'>
                        <Dropdown.Item text='Feedback' onClick={onCloseDropdown} />
                    </Link>
                    <Link href='/account/commentaries'>
                        <Dropdown.Item text='My commentaries' onClick={onCloseDropdown} />
                    </Link>
                    <Dropdown.Item text='Logout' onClick={onClickLogout} />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default AccountBtn;