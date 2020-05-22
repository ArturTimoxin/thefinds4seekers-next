import React from 'react';
import RedStar from './RedStar';
import { Button, Form, TextArea, Dropdown, Input, Message } from 'semantic-ui-react'
import ChooseTypeAd, { AD_LOST_TYPE_ID, AD_FOUND_TYPE_ID } from './ChooseTypeAd';
import ChoosePhotos from './ChoosePhotos';
import DatePicker from "react-datepicker";
import PhoneInput from 'react-phone-input-2';

const RegisterAdForm = ({ 
    userData,
    title,
    setTitle,
    description,
    setDescription,
    secretQuestion,
    setSecretQuestion,
    secretAnswer,
    setSecretAnswer,
    address = '',
    setAddress,
    onSubmitForm,
    typeAd, 
    setTypeAd,
    categoryOptions,
    categoryId,
    onChooseCategory,
    lostOrFoundAt,
    setLostOrFoundAt,
    userInfo = null,
    onChangeUserInfo,
    onChangePhoneNumber,
    errMessage,
    setErrMessage,
    isLoadSubmitForm,
    titleAdForm = 'Registration Ad',
    photos = [],
    subInfoText,
    point,
}) => {

    const textTypeAd = typeAd === AD_LOST_TYPE_ID ? 'lost' : 'found';
    
    return (
        <div className='wrap-register-ad-form'>
                <Form
                    onSubmit={onSubmitForm}
                    className='register-ad-form'
                >
                    <div className='reg-form-main-column-wrap'>
                        <div className='wrap-head-reg-form'>
                            <h1 className='title-register-ad-form'>{titleAdForm}</h1>
                            <div className='type-ad-picker-wrap'>
                                <span className='choose-type-text'> 
                                    Choose the type of ad: <RedStar />
                                </span>
                                <ChooseTypeAd 
                                    typeAd={typeAd}
                                    setTypeAd={setTypeAd}
                                />
                            </div>
                        </div>
                        <div className='reg-form-fields'>
                            <Form.Field required>
                                <label className='reg-form-label'>Title: </label>
                                <Input 
                                    value={title} 
                                    name='title' 
                                    placeholder='Title' 
                                    onChange={e => {
                                        setErrMessage('');
                                        setTitle(e.target.value);
                                    }} 
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label className='reg-form-label'>Description: </label>
                                <TextArea 
                                    name='description' 
                                    placeholder={`Tell us more about your ${textTypeAd}. For ex.: ${typeAd === AD_LOST_TYPE_ID ? 'Special signs of your loss' : 'How much money do you want to receive as a reward...'}`}
                                    style={{ minHeight: 200 }} 
                                    value={description}
                                    onChange={e => {
                                        setErrMessage('');
                                        setDescription(e.target.value);
                                    }}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Choose category of ad:</label>
                                <Dropdown 
                                    selection
                                    required
                                    value={categoryId}
                                    options={categoryOptions}
                                    placeholder='Choose category...'
                                    onChange={(e, { value }) => {
                                        setErrMessage('');
                                        onChooseCategory(value)
                                    }}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Address of the place where it was {textTypeAd} (Choose it on the map above and change it, if it is not correct):</label>
                                <Input 
                                    onChange={e => {
                                        setErrMessage('');
                                        setAddress(e.target.value)
                                    }} 
                                    value={address} 
                                    name='address' 
                                    required 
                                    placeholder='Choose it on the map above...'
                                    disabled={!point.lat || !point.lng} 
                                />
                            </Form.Field>
                            {typeAd === AD_FOUND_TYPE_ID && (
                                <>
                                    <Form.Field>
                                        <label className='reg-form-label'>Secret question (A person who will want to receive your contact information will have to give an answer to this. If you leave this field empty your contact details will be available to all users.): </label>
                                        <Input 
                                            name='secretQuestion'  
                                            placeholder='For ex. - ID number of passport..' 
                                            value={secretQuestion}
                                            onChange={e => {
                                                setErrMessage('');
                                                setSecretQuestion(e.target.value)
                                            }}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label 
                                            className='reg-form-label'
                                        >
                                            Secret answer (If a person answers exactly your question, how did you answer him, he will immediately receive your contact details. If not, you can check his answer in your account and give it if you want.): 
                                        </label>
                                        <Input 
                                            disabled={!secretQuestion || !secretQuestion.length}
                                            value={secretAnswer}
                                            onChange={e => {
                                                setErrMessage('');
                                                setSecretAnswer(e.target.value);
                                            }}
                                            name='secretAnswer' 
                                            placeholder='Your secret answer...' 
                                        />
                                    </Form.Field>
                                </>
                            )}
                            <Form.Field>
                                <label>Date when it was {textTypeAd}:</label>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    selected={lostOrFoundAt}
                                    onChange={date => {
                                        setErrMessage('');
                                        setLostOrFoundAt(date);
                                    }}
                                    maxDate={new Date()}
                                />
                            </Form.Field>
                        </div>
                    </div>
                    <div className='reg-form-subcolumn-wrap'>
                        <ChoosePhotos 
                            typeAd={typeAd}
                            photos={photos}
                        />
                        {!userData && (
                            <div className='wrap-user-info-fields'>
                                <Form.Field required>
                                    <label>Your firstname:</label>
                                    <Form.Input 
                                        icon='user'
                                        iconPosition='left'
                                        name='firstname'
                                        fluid
                                        placeholder='Firstname'
                                        value={userInfo ? userInfo.firstname : ''}
                                        onChange={onChangeUserInfo}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Your lastname:</label>
                                    <Form.Input 
                                        icon='user'
                                        iconPosition='left'
                                        name='lastname'
                                        fluid
                                        placeholder='Your lastname'
                                        value={userInfo ? userInfo.lastName : ''}
                                        onChange={onChangeUserInfo}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Your phone number:</label>
                                    <PhoneInput 
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                        }}
                                        value={userInfo ? userInfo.phone : ''}
                                        preferredCountries={['us', 'ua']}
                                        onChange={onChangePhoneNumber}
                                        inputClass='phone-input'
                                        placeholder='Phone number'
                                        fluid
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Your E-mail:</label>
                                    <Form.Input 
                                        icon='mail'
                                        iconPosition='left'
                                        name='email'
                                        fluid
                                        placeholder='Your E-mail'
                                        type='email'
                                        value={userInfo ? userInfo.email : ''}
                                        onChange={onChangeUserInfo}
                                        required
                                    />
                                </Form.Field>
                            </div>
                        )}
                        <div>
                            {!!errMessage.length && (
                                <Message negative>{errMessage}</Message>
                            )}
                            <Button 
                                className='submit-reg-ad-form-btn' 
                                color='teal' 
                                type='submit'
                                loading={isLoadSubmitForm}
                            >
                                Submit
                            </Button>
                            {!!subInfoText && (
                                <div className='subinfo-text-form'>
                                    {subInfoText}
                                </div>
                            )}
                        </div>
                    </div>
                </Form>
        </div>
    )
}


export default RegisterAdForm;