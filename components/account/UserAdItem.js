import React from 'react';
import { Item, Button } from 'semantic-ui-react'
import getFormatedDate from '../../utils/getFormatedDate';
import TypeAd from '../common/TypeAd';
import Link from 'next/link';
import DefaultPhoto from '../../assets/default-photo.png';

const UserAdItem = ({ id, title, actualTo, address, createdAt, photo, typeId, onDeleteAd, isApproved }) => {
    return (
        <Item className='user-ad-list-item'>
            <Link href={`/ad?adId=${id}`}>
                <img
                    className='user-ad-item-img'
                    src={photo ? photo : DefaultPhoto} 
                />
            </Link>
            <div
                className='wrap-user-ad-item-list'
            >
                <div className='user-ad-info-wrap'>
                    <Link href={`/ad?adId=${id}`}>
                        <Item.Header
                            className='title-ad-item-list'
                        >
                            <a className='title-item-ad-text'>{title}</a>
                            <TypeAd typeAd={typeId} />
                        </Item.Header>
                    </Link>
                    <Item.Description>
                        {address}
                    </Item.Description>
                    <Item.Extra>
                        Status: {isApproved ? 'Published' : 'On review'}
                    </Item.Extra>
                    <Item.Extra>
                        Created at: {getFormatedDate(new Date(createdAt))}
                    </Item.Extra>
                </div>
                <div className='user-ad-subcolumn'>
                    <div className='list-actions-wrap'>
                        <Link href={`/account/edit?id=${id}`}>
                            <Button className='list-action' color='blue'>Edit</Button>
                        </Link>
                        <Button 
                            className='list-action' 
                            color='red'
                            onClick={() => onDeleteAd(id)}
                        >
                            Delete
                        </Button>
                    </div>
                    <Item.Extra
                        className='actual-to-text'
                    >
                        Actual to: {getFormatedDate(new Date(actualTo))}
                    </Item.Extra>
                </div>
            </div>
        </Item>
    )
}

export default UserAdItem;