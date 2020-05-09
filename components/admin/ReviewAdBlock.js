import React, { useState } from 'react';
import ChoosePhotos from '../register-ad/ChooseTypeAd';
import { Form, TextArea, Dropdown, Input, Button } from 'semantic-ui-react';
import PhotoSlider from '../common/PhotoSlider';

const ReviewAdBlock = ({
    adId,
    onApprove,
    onReject,
    typeAd,
    title,
    description,
    photos,
    setModalPhoto,
    location,
    adsCategories,
    categoryId,
    lostOrFoundAt,
    user,
    createdAt,
    actualTo,
}) => {

    const [choosedTypeAd, setChoosedTypeAd] = useState(typeAd);
    const [choosedCategory, setChoosedCategory] = useState(categoryId);

    const onSubmitReview = e => {
        onApprove(e, { adId, choosedTypeAd, choosedCategory });
    }

    return (
        <Form 
            onSubmit={onSubmitReview}
            className='review-ad-form'
        >
            <div className='main-column-ad-review'>
                <div>
                    <span>Type Ad:</span>
                    <ChoosePhotos 
                        typeAd={choosedTypeAd}
                        setTypeAd={setChoosedTypeAd}
                    />
                </div>
                <Form.Field>
                    <label>Title: </label>
                    <Input 
                        defaultValue={title} 
                        name='title'
                        placeholder='Title' 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Description: </label>
                    <TextArea 
                        name='description'
                        style={{ minHeight: 100 }} 
                        defaultValue={description}
                    />
                </Form.Field>
                <Form.Field>
                    <label>(lat ={location.lat} lng = {location.lng}) Address: </label>
                    <Input 
                        name='address'
                        defaultValue={location.address}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Category:</label>
                    <Dropdown 
                        selection
                        required
                        options={adsCategories}
                        value={choosedCategory}
                        placeholder='Category'
                        onChange={(e, { value }) => {
                            setChoosedCategory(value)
                        }}
                    />
                </Form.Field>
                <div>Lost of found at: {lostOrFoundAt}</div>
                <div>Created at: {createdAt}</div>
                <div>Actual to: {actualTo}</div>
                <div>
                    <div>USER:</div>
                    <div>ID: {user._id}</div>
                    <div>Email: {user.email}</div>
                    <div>Phone: {user.phone}</div>
                    <div>Firstname: {user.firstname}</div>
                    <div>Lastname: {user.lastname}</div>
                    <div>Registered at: {user.registeredAt}</div>
                </div>
            </div>
            <div className='subcolumn-ad-review'>
                <PhotoSlider
                    photos={photos}
                    setModalPhoto={setModalPhoto}
                />
                <div className='ad-review-actions'>
                    <Button 
                        negative
                        onClick={e =>{ 
                            e.preventDefault();
                            onReject(adId);
                        }}
                    >
                        Reject
                    </Button>
                    <Button type='submit' positive>Approve</Button>
                </div>
            </div>
        </Form>
    )
}

export default ReviewAdBlock;
