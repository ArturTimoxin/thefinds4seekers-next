import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { FindPoint, LostPoint } from '../../components/common/Map/Points';
import SearchBox from '../../components/common/Map/SearchBox';
import axios from 'axios';

const DEFAULT_ZOOM = 1;
const DEFAULT_CENTER = {
    lat: 47.948206,
    lng: 21.832424
}

const RegisterPointMap = ({ point, setPoint, setAddress }) => {

    const [currentZoom, setCurrenZoom] = useState(DEFAULT_ZOOM);
    const [currentCenter, setCurrentCenter] = useState(DEFAULT_CENTER);

    const onClickMap = ({ lat, lng }) => {
        setPoint({ lat, lng });
        axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        )
        .then(resp => {
            setAddress(resp.data.results[0].formatted_address);
        })
    }

    const onChangeSeacrhBox = place => {
        if(!Array.isArray(place) || !place.length) return;
        setAddress(place[0].formatted_address);
        const lat = place[0].geometry.location.lat();
        const lng = place[0].geometry.location.lng();
        setCurrenZoom(10);
        setCurrentCenter({  lat, lng });
        setPoint({ lat, lng });
    }

    return (
        <div className='register-point-map-container'>
            <SearchBox 
                placeholder={'Find place...'}
                onPlacesChanged={onChangeSeacrhBox}
            />
            <GoogleMapReact 
                bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                defaultCenter={DEFAULT_CENTER}
                defaultZoom={DEFAULT_ZOOM}
                center={currentCenter}
                zoom={currentZoom}
                onClick={onClickMap}
            >
                {point.lat && point.lng && (
                    <FindPoint
                        lat={point.lat}
                        lng={point.lng}
                    />
                )}
            </GoogleMapReact>
        </div>
    )
}

export default RegisterPointMap;
