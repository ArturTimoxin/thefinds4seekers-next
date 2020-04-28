import React, { useState } from 'react';
import RegisterPointMap from '../../components/register-ad/RegisterPointMap';

const RegisterAd = () => {

    const [point, setPoint] = useState({ lat: null, lng: null });
    const [address, setAddress] = useState('');

    console.log('address', address)

    return (
        <>
            <RegisterPointMap 
                point={point}
                setPoint={setPoint}
                setAddress={setAddress}
            />
        </>
    )
}

export default RegisterAd;