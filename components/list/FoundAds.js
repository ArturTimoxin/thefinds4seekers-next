import React from 'react'
import LoadingPlaceholder from '../common/LoadingPlaceholader';
import { Item } from 'semantic-ui-react'
import AdListItem from './AdListItem';

const FoundAds = ({ isLoad, foundAds }) => {

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

    return (
        <Item.Group 
            divided
        >
            {foundAds.map(foundAd => (
                <AdListItem
                    key={foundAd._id} 
                    id={foundAd._id} 
                    photo={foundAd.photo}
                    title={foundAd.title}
                    typeId={foundAd.typeId} 
                    createdAt={foundAd.createdAt} 
                    categoryName={foundAd.categoryName} 
                    address={foundAd.address}
                />
            ))}
        </Item.Group>
    )
}

export default FoundAds;