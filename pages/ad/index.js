import React, { useState } from 'react';
import { actions } from '../../store';
import { connect } from "react-redux";
import GoogleMap from 'google-map-react';
import Point from '../../components/common/Map/Point';
import TypeAd from '../../components/common/TypeAd';
import { Icon, Button } from 'semantic-ui-react';
import { AD_LOST_TYPE_ID } from '../../components/register-ad/ChooseTypeAd';
import PhotoSlider from '../../components/common/PhotoSlider';
import getFormatedDate from '../../utils/getFormatedDate';
import AnswerQuestionModal from '../../components/ad/AnswerQuestionModal';

const DEFAULT_MAP_ZOOM = 15;

const Ad = ({ adData, adsCategories, setModalPhoto, userData, login }) => {

    const [isOpenAnswerModal, setIsOpenAnswerModal] = useState(false);

    const { 
        title, description, typeId, categoryId, 
        location: { lat, lng, address }, lostOrFoundAt, createdAt, photos,
        secretQuestion
    } = adData;

    const typeAdText = typeId === AD_LOST_TYPE_ID ? 'lost' : 'found';
    const adCategoryObj = adsCategories.find(category => category.value === categoryId);

    return (
        <>
            <div className='wrap-ad-page'>
                <div className='ad-map'>
                    <GoogleMap 
                        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                        defaultCenter={{ lat, lng }}
                        defaultZoom={DEFAULT_MAP_ZOOM}
                    >
                        <Point 
                            typeAd={adData.typeId}
                            lat={lat} 
                            lng={lng}
                        />
                    </GoogleMap>
                </div>
                <div className='info-ad-block-wrapper'>
                    <article className='info-ad-block-container'>
                        <div className='main-column-info-ad'>
                            <div>
                                <div className='wrap-head-info-ad'>
                                    <h1 className='title-info'>{title}</h1>
                                    <TypeAd 
                                        typeAd={typeId}
                                    />
                                </div>
                                <div className='category-ad-wrap'>
                                    <Icon name='folder' />
                                    Category: {adCategoryObj && adCategoryObj.text}
                                </div>
                                <p className='description-info'>{`${description}`}</p>
                            </div>
                            <div className='sub-info-ad'>
                                <div className='ad-sub-info'>
                                    <Icon name='marker' />
                                    <b>Address where it was {typeAdText}: </b> {address}
                                </div>
                                <div className='ad-sub-info'>
                                    <Icon name='calendar alternate' />
                                    <b>Date when it was {typeAdText}: </b>{getFormatedDate(lostOrFoundAt)}
                                </div>
                                <div className='ad-sub-info'>
                                    <Icon name='add to calendar' />
                                    <b>Created At: </b>{getFormatedDate(createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className='sub-column-info-ad'>
                            {photos.length ? (
                                <div className='wrap-photo-slider-ad'>
                                    <PhotoSlider 
                                        photos={photos}
                                        setModalPhoto={setModalPhoto}
                                    />
                                </div>
                            ) : <div/>}
                            <div>
                                {adData.user && (
                                    <div className='autor-contact-data'>
                                        <div className='ad-autor-info'>
                                            <Icon name='user' />
                                            <span>{adData.user.firstname} {adData.user.lastname}</span>
                                        </div>
                                        <div className='ad-autor-info'>
                                            <Icon name='mail' />
                                            <span>{adData.user.email}</span>
                                        </div>
                                        <div className='ad-autor-info'>
                                            <Icon name='phone' />
                                            <span>+{adData.user.phone}</span>
                                        </div>
                                    </div>
                                )}
                                {secretQuestion && (
                                    <div className='secret-question-info'>
                                        <b>Want to get the contact details of the author of this ad?</b>
                                        <Button 
                                            color='teal' 
                                            className='get-contact-btn' 
                                            fluid
                                            onClick={() => setIsOpenAnswerModal(true)}
                                        >
                                            YES
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <AnswerQuestionModal 
                adId={adData._id}
                secretQuestion={secretQuestion}
                isOpen={isOpenAnswerModal}
                userData={userData}
                onClose={() => setIsOpenAnswerModal(false)}
                login={login}
            />
        </>
    )
}

Ad.getInitialProps = async ({ query, store }) => {
    await store.dispatch(actions.ad.getAdData(query.adId));
    return { ...store.getState().ad, ...query };
};

const mapStateToProps = store => ({
    adData: store.ad.adData,
    adsCategories: store.app.adsCategories,
    userData: store.app.userData,
})

const mapDispatchToProps = dispatch => {
  return {
    getAdData: (adId) => dispatch(actions.ad.getAdData(adId)),
    setModalPhoto: photo => dispatch(actions.app.setModalPhoto(photo)),
    login: (userData, token) => dispatch(actions.app.login(userData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ad);
