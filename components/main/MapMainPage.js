import React, { useState }  from 'react';
import SearchBox from '../common/Map/SearchBox';
import GoogleMap from 'google-map-react';
import MainPageMarker from '../main/MainPageMarker';

const DEFAULT_ZOOM = 1;
const DEFAULT_CENTER = {
    lat: 47.948206,
    lng: 21.832424
}

const MapMainPage = ({ adsPoints }) => {

    const [currentZoom, setCurrenZoom] = useState(DEFAULT_ZOOM);
    const [currentCenter, setCurrentCenter] = useState(DEFAULT_CENTER);
    const [idInfoWindow, setIdInfoWindow] = useState(null);

    const onChangeSeacrhBox = place => {
        if(!Array.isArray(place) || !place.length) return;
        const lat = place[0].geometry.location.lat();
        const lng = place[0].geometry.location.lng();
        setCurrenZoom(10);
        setCurrentCenter({ lat, lng });
    }

    return (
        <div className='main-page-map-wrap'>
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
                onClick={() => setIdInfoWindow(null)}
            >
                {adsPoints.map(adPoint => (
                    <MainPageMarker 
                        key={adPoint.adId}
                        adId={adPoint.adId}
                        typeAd={adPoint.typeId}
                        lat={adPoint.lat} 
                        lng={adPoint.lng}
                        onClick={() => setIdInfoWindow(adPoint.adId)}
                        isShowInfoWindow={idInfoWindow === adPoint.adId}
                    />
                ))}
            </GoogleMap>
        </div>
    )
}

export default MapMainPage;
