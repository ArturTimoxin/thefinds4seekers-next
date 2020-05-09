import React from 'react'
import { Item, Icon } from 'semantic-ui-react'
import DefaultPhoto from '../../assets/default-photo.png';
import TypeAd from '../common/TypeAd';
import getFormatedDate from '../../utils/getFormatedDate';
import Link from 'next/link';

const AdListItem = ({ id, photo, title, typeId, createdAt, categoryName, address }) => {
    return (
        <Item className='ad-list-item'>
            <Link href={`/ad?adId=${id}`}>
                <img
                    className='ad-list-item-img'
                    src={photo ? photo : DefaultPhoto} 
                />
            </Link>
            <Item.Content
                className='wrap-ad-item-list-content'
            >
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
                    <Icon name='folder' /> <span>{categoryName}</span>
                </Item.Extra>
                <Item.Extra>
                    Created At: {getFormatedDate(new Date(createdAt))}
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default AdListItem;