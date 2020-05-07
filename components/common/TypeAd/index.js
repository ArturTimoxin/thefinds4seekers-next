import React from 'react'
import { AD_LOST_TYPE_ID } from '../../register-ad/ChooseTypeAd';

const TypeAd = ({ typeAd }) => {

    const typeText = typeAd === AD_LOST_TYPE_ID ? 'lost' : 'found';

    return (
        <div className={`type-ad-info ${typeText}`}>
            {typeText}
        </div>
    )
}

export default TypeAd;
