import React, { useState } from 'react'
import GoogleMap from 'google-map-react';
import { FindPoint, LostPoint } from '../../components/common/Map/Points';
import SearchBox from '../../components/common/Map/SearchBox';
import axios from 'axios';
import { AD_LOST_TYPE_ID } from './ChooseTypeAd';

const DEFAULT_ZOOM = 1;
const DEFAULT_CENTER = {
    lat: 47.948206,
    lng: 21.832424
}

const RegisterPointMap = ({ point, setPoint, setAddress, typeAd, setErrMessage }) => {

    const [currentZoom, setCurrenZoom] = useState(DEFAULT_ZOOM);
    const [currentCenter, setCurrentCenter] = useState(DEFAULT_CENTER);

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

    const getPoint = (lat, lng) => {
        if(typeAd === AD_LOST_TYPE_ID) return <LostPoint lat={lat} lng={lng} /> 
        return <FindPoint lat={lat} lng={lng} />
    }
 
    return (
        <div className='register-point-map-container'>
            <SearchBox 
                placeholder={'Find place...'}
                onPlacesChanged={onChangeSeacrhBox}
            />
            <GoogleMap
                bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                defaultCenter={DEFAULT_CENTER}
                defaultZoom={DEFAULT_ZOOM}
                center={currentCenter}
                zoom={currentZoom}
                onClick={onClickMap}
            >
                {point.lat && point.lng && (
                    getPoint(point.lat, point.lng)
                )}
            </GoogleMap>
        </div>
    )
}

export default RegisterPointMap;
