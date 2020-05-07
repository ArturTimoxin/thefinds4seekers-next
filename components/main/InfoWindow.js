import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import API from '../../utils/API';
import Link from "next/link";

const InfoWindow = ({ adId }) => {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        API.get(`/ads/mini-info/${adId}`)
            .then(resp => {
                setInfo(resp.data);
            });
    }, []);

    return (
        <div 
            // google map nested styles
            style={{
                width: 250, 
                height: 100, 
                position: 'absolute', 
                top: -160, 
                left: -125,
                backgroundColor: '#ffffff',
                padding: 10,
                borderRadius: '5px',
                display: 'flex',
                zIndex: 10
            }}
        >
            {!info ? (
                <Loader active size='medium'/>
            ) : (
                <div className='wrap-info-window-data'>
                    {info.photo && (
                        <img className='info-window-mini-img' src={info.photo} alt='photo' />
                    )}
                    <div className='wrap-text-info-window'>
                        <h5 className='title-ad-iw'>{info.title}</h5>
                        <div className='address-ad-iw'>{info.address}</div>
                        <div className='subinfo-wrap-iw'>
                            <div className='category-ad-iw'>{info.categoryName}</div>
                            <Link href={`/ad?adId=${adId}`}>Show more ></Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoWindow;