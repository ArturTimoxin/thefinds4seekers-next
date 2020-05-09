import React from 'react';
import { Button } from 'semantic-ui-react';

export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const ChooseTypeAd = ({ typeAd = 1, setTypeAd }) => {
    return (
        <Button.Group 
            className='chose-type-ad-btn' 
            size='large'
        >
            <Button
                color={typeAd === AD_LOST_TYPE_ID ? 'yellow' : null}
                onClick={e => { 
                    e.preventDefault();
                    setTypeAd && setTypeAd(AD_LOST_TYPE_ID);
                }}
            >
                LOST
            </Button>
            <Button.Or />
            <Button
                color={typeAd === AD_FOUND_TYPE_ID ? 'teal' : null}
                onClick={e => {
                    e.preventDefault();
                    setTypeAd && setTypeAd(AD_FOUND_TYPE_ID);
                }}
            >
                FOUND
            </Button>
        </Button.Group>
    )
}
export default ChooseTypeAd;
