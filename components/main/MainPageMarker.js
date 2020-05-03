import React, { useState } from 'react'
import Point from '../common/Map/Point';
import InfoWindow from './InfoWindow';
  
const MainPageMarker = ({ adId, lat, lng, typeAd, isShowInfoWindow, onClick }) => {

    return (
        <div 
            onClick={onClick}
            style={{ position: 'relative' }}
        >
            {isShowInfoWindow && (
                <InfoWindow 
                    adId={adId}
                />
            )}
            <Point 
                style={{ cursor: 'pointer' }}
                typeAd={typeAd}
                lat={lat} 
                lng={lng}
            />
        </div>
    )
}

export default MainPageMarker;