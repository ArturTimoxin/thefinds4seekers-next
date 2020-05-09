import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { AD_LOST_TYPE_ID } from '../register-ad/ChooseTypeAd';
import DefaultPhoto from '../../assets/default-photo.png';
import Link from 'next/link';

const NewAdCard = ({ adId, photo, title, typeAd, address, createdAt, categoryName }) => {

    const typeName = typeAd === AD_LOST_TYPE_ID ? 'Lost' : 'Found';

    return (
        <Link href={`/ad?adId=${adId}`}>
            <Card className='new-ad-card'>
                    <img className='new-ad-photo' src={photo ? photo : DefaultPhoto} alt={title} />
                <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span>Type: {typeName}</span>
                </Card.Meta>
                <Card.Description>
                    {address}
                </Card.Description>
                </Card.Content>
                <Card.Content extra className='extra-content-card'>
                    <span>
                        <Icon name='calendar alternate outline' />
                        {createdAt}
                    </span>
                    <span>
                        <Icon name='folder' />
                        {categoryName}
                    </span>
                </Card.Content>
            </Card>
        </Link>
    )
}
export default NewAdCard;