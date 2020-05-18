import React, { useEffect } from 'react'
import { actions } from '../../store';
import { connect } from "react-redux";
import { Header } from 'semantic-ui-react';
import UserMenu from '../../components/common/UserMenu';
import UserAds from '../../components/account/UserAds';

const Account = ({ isLoadUserAds, userAds, getUserAds }) => {

    useEffect(() => {
        getUserAds();
    }, []);

    return (
        <UserMenu>
            <Header as='h1'>Your ads</Header>
            <UserAds 
                userAds={userAds}
                isLoad={isLoadUserAds}
                getUserAds={getUserAds}
            />
        </UserMenu>
    )
}


const mapStateToProps = store => ({
    isLoadUserAds: store.account.isLoadUserAds,
    userAds: store.account.userAds,
})

const mapDispatchToProps = dispatch => {
  return {
    getUserAds: () => dispatch(actions.account.getUserAds()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);