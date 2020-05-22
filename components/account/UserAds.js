import React, { useState } from 'react'
import LoadingPlaceholder from '../common/LoadingPlaceholader';
import { Item, Confirm, Message } from 'semantic-ui-react';
import UserAdItem from './UserAdItem';
import API from '../../utils/API';
import Link from 'next/link';

const UserAds = ({ userAds, isLoad, getUserAds }) => {

    const [idAdForDelete, setIdAdForDelete] = useState(null); 

    if(isLoad) {
        return (
            <>
                <LoadingPlaceholder />
                <LoadingPlaceholder />
                <LoadingPlaceholder />
                <LoadingPlaceholder />
                <LoadingPlaceholder />
            </>
        )
    }

    const deleteAd = () => {
        API.delete(`/ads/${idAdForDelete}`)
           .then(resp => {
                setIdAdForDelete(null);
                getUserAds();
           })
    }

    if(!userAds.length) {
        return (
            <Message size='huge'>
                No ads were created ->
                <Link href='/register-ad'>Create it</Link>
            </Message>
        )
    }

    return (
        <>
            <Item.Group 
                divided
            >
                {userAds.map(userAd => (
                    <UserAdItem
                        key={userAd.id}
                        id={userAd.id} 
                        title={userAd.title} 
                        actualTo={userAd.actualTo} 
                        address={userAd.address} 
                        createdAt={userAd.createdAt}
                        photo={userAd.photo}
                        typeId={userAd.typeId}
                        onDeleteAd={setIdAdForDelete}
                        isApproved={userAd.isApproved}
                    />
                ))}
            </Item.Group>
            <Confirm 
                open={!!idAdForDelete}
                onCancel={() => setIdAdForDelete(null)}
                onConfirm={deleteAd}
                size='mini'
                header='Are you sure that you want to delete ad?'
                content='In the future you will not be able to restore it.'
            />
        </>
    )
}

export default UserAds;