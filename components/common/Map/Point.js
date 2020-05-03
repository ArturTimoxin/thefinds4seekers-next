import React from 'react'
import FindPointIcon from '../../../assets/point-find.png'; 
import LostPointIcon from '../../../assets/point-lost.png';
import { AD_LOST_TYPE_ID } from '../../register-ad/ChooseTypeAd';

const FindPoint = () => {
    return (
        <div style={{ position: 'relative' }}>
            <img src={FindPointIcon} alt='find' style={{ position: 'absolute', top: -50, left: -15, width: '30px' }} />  
        </div>
    )
}

const LostPoint = () => {
    return (
        <div style={{ position: 'relative' }}>
            <img src={LostPointIcon} alt='lost' style={{ position: 'absolute', top: -50, left: -15, width: '30px' }} />  
        </div>
    )
}

const Point = ({ typeAd, lat, lng }) => {
    if(typeAd === AD_LOST_TYPE_ID) return <LostPoint lat={lat} lng={lng} /> 
    return <FindPoint lat={lat} lng={lng} />
}

export default Point;