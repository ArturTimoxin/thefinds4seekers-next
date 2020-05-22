import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { connect } from "react-redux";
import { actions } from '../../../store';

const UserMenu = ({ children, logout }) => {

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
                    onClick={logout}
                    className='logout-menu-item'
                >
                    Logout
                </Menu.Item>
                {/* <Menu.Item
                    name='/commentaries'
                    onClick={onClickItem}
                    active={router.pathname.includes('account/commentaries')}
                >
                    Commentaries
                </Menu.Item> */}
            </Menu>
            <div
                className='account-content-wrap'
            >
                {children}
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.app.logout()),
});

export default connect(null, mapDispatchToProps)(UserMenu);