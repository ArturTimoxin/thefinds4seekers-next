import React, { useState } from 'react'
import GoogleMap from 'google-map-react';
import Point from './Point';
import SearchBox from './SearchBox';
import axios from 'axios';

const RegisterPointMap = ({ 
    point, setPoint, setAddress, typeAd, setErrMessage,
    defaultZoom = 1, defaultCenter,
}) => {

    if(!defaultCenter) {
        defaultCenter = { lat: 47.948206, lng: 21.832424 };
    }

    const [currentZoom, setCurrenZoom] = useState(defaultZoom);
    const [currentCenter, setCurrentCenter] = useState(defaultCenter);

    const onClickMap = ({ lat, lng }) => {
        setErrMessage('');
        setPoint({ lat, lng });
        axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        )
        .then(resp => {
            const { results } = resp.data;
            if(!Array.isArray(results) || !results.length || !results[0].formatted_address) return;
            setAddress(resp.data.results[0].formatted_address);
        })
    }

    const onChangeSeacrhBox = place => {
        if(!Array.isArray(place) || !place.length || !place[0].formatted_address) return;
        setAddress(place[0].formatted_address);
        const lat = place[0].geometry.location.lat();
        const lng = place[0].geometry.location.lng();
        setCurrenZoom(10);
        setCurrentCenter({  lat, lng });
        setErrMessage('');
        setPoint({ lat, lng });
    }

    return (
        <div className='register-point-map-container'>
            <SearchBox 
                placeholder={'Find place...'}
                onPlacesChanged={onChangeSeacrhBox}
            />
            <GoogleMap
                bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                center={currentCenter}
                zoom={currentZoom}
                onClick={onClickMap}
            >
                {point.lat && point.lng && (
                    <Point 
                        typeAd={typeAd}
                        lat={point.lat} 
                        lng={point.lng}
                    />
                )}
            </GoogleMap>
        </div>
    )
}

export default RegisterPointMap;