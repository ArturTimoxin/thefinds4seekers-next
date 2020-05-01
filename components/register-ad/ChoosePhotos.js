import React, { useState }  from 'react'
import { Form } from 'semantic-ui-react'
import { AD_LOST_TYPE_ID } from './ChooseTypeAd';
import PlusIcon from '../../assets/plus.png';

const ChoosePhotos = ({ typeAd }) => {

    // TODO: need refactor
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

    return (
        <Form.Field>
            <label className='choose-photos-label'>
                {`Choose photos of your ${typeAd === AD_LOST_TYPE_ID ? 'lost' : 'found'}:`}
                <div className='choose-photos-input'>
                    <label htmlFor="main-photo" className='main-photo-input choose-photos-label'>
                        {mainPhoto ? (
                            <img src={mainPhoto} className='photo-preview' />
                        ) : (
                            <img src={PlusIcon} alt='plus' className='plus-icon' />
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
                            {subPhotoOne ? (
                                <img src={subPhotoOne} className='photo-preview' />
                            ) : (
                                <img src={PlusIcon} alt='plus' className='plus-icon' />
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
                            {subPhotoTwo ? (
                                <img src={subPhotoTwo} className='photo-preview' />
                            ) : (
                                <img src={PlusIcon} alt='plus' className='plus-icon' />
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
