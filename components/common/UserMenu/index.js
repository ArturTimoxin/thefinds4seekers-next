import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const UserMenu = ({ children }) => {

    const router = useRouter();

    const onClickItem = (e, { name }) => {
        router.push(`/account${name}`);
    }

    return (
        <div
            className='account-page-wrap'
        >
            <Menu 
                className='user-menu'
                size='massive'
                vertical
            >
                <Menu.Item
                    name=''
                    onClick={onClickItem}
                    active={router.pathname === '/account'}
                >
                    Your ads
                </Menu.Item>

                <Menu.Item
                    name='/answers'
                    onClick={onClickItem}
                    active={router.pathname.includes('account/answers')}
                >
                    Answers
                </Menu.Item>

                <Menu.Item
                    name='/commentaries'
                    onClick={onClickItem}
                    active={router.pathname.includes('account/commentaries')}
                >
                    Commentaries
                </Menu.Item>
            </Menu>
            <div
                className='account-content-wrap'
            >
                {children}
            </div>
        </div>
    )
}

export default UserMenu;