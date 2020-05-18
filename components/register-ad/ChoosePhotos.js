import React, { useState }  from 'react'
import { Form } from 'semantic-ui-react'
import { AD_LOST_TYPE_ID } from './ChooseTypeAd';
import PlusIcon from '../../assets/plus.png';

const ChoosePhotos = ({ typeAd, photos = [] }) => {
    const [mainPhoto, setMainPhoto] = useState(null);
    const [subPhotoOne, setSubPhotoOne] = useState(null);
    const [subPhotoTwo, setSubPhotoTwo] = useState(null);

    const onChangePhoto = (e) => {
        if(e.target.files.length) {
            if(e.target.name === 'mainPhoto') setMainPhoto(URL.createObjectURL(e.target.files[0]));
            if(e.target.name === 'subPhotoOne') setSubPhotoOne(URL.createObjectURL(e.target.files[0]));
            if(e.target.name === 'subPhotoTwo') setSubPhotoTwo(URL.createObjectURL(e.target.files[0]));
        } else {
            if(e.target.name === 'mainPhoto') setMainPhoto(null);
            if(e.target.name === 'subPhotoOne') setSubPhotoOne(null);
            if(e.target.name === 'subPhotoTwo') setSubPhotoTwo(null);
        }
    }

    const getPhotoImg = (photoData, defaultPhoto = PlusIcon) => {

        if(defaultPhoto !== PlusIcon && !photoData) {
            return (
                <img 
                    src={defaultPhoto} 
                    alt='plus' 
                    className='photo-preview'
                />
            )
        }

        if(!photoData) {
            return (
                <img 
                    src={defaultPhoto} 
                    alt='plus' 
                    className='plus-icon'
                />
            )
        }

        return (
            <img src={photoData} className='photo-preview' />
        )
    }

    return (
        <Form.Field>
            <label className='choose-photos-label'>
                {`Choose photos of your ${typeAd === AD_LOST_TYPE_ID ? 'lost' : 'found'}:`}
                <div className='choose-photos-input'>
                    <label htmlFor="main-photo" className='main-photo-input choose-photos-label'>
                        {photos[0] ? (
                            getPhotoImg(mainPhoto, photos[0])
                        ) : (
                            getPhotoImg(mainPhoto)
                        )}
                    </label>
                    <input 
                        name="mainPhoto"
                        className='upload-photos'
                        id="main-photo"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={onChangePhoto}
                    />
                    <div className='sub-photos-inputs-wrap'>
                        <label htmlFor='sub-photo-one' className='sub-photo-input choose-photos-label'>
                            {photos[1] ? (
                                getPhotoImg(subPhotoOne, photos[1])
                            ) : (
                                getPhotoImg(subPhotoOne)
                            )}
                        </label>
                        <input 
                            name="subPhotoOne"
                            className='upload-photos'
                            id="sub-photo-one"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={onChangePhoto}
                        />
                        <label htmlFor='sub-photo-two' className='sub-photo-input choose-photos-label'>
                            {photos[2] ? (
                                getPhotoImg(subPhotoTwo, photos[2])
                            ) : (
                                getPhotoImg(subPhotoTwo)
                            )}
                        </label>
                        <input 
                            name="subPhotoTwo"
                            className='upload-photos'
                            id="sub-photo-two"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={onChangePhoto}
                        />
                    </div>
                </div>
            </label>
        </Form.Field>
    )
}

export default ChoosePhotos;
