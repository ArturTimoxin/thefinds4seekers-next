import React from 'react'
import FindPointIcon from '../../../assets/point-find.png'; 
import LostPointIcon from '../../../assets/point-lost.png';

export const FindPoint = () => {
    return (
        <div style={{ position: 'relative' }}>
            <img src={FindPointIcon} alt='find' style={{ position: 'absolute', top: -50, left: -15, width: '30px' }} />  
        </div>
    )
}

export const LostPoint = () => {
    return (
        <div style={{ position: 'relative' }}>
            <img src={LostPointIcon} alt='lost' style={{ position: 'absolute', top: -50, left: -15, width: '30px' }} />  
        </div>
    )
}
