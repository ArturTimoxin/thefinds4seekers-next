import React, { useState } from 'react'
import { Button, Modal, Form, Message, Icon } from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';
import API from '../../utils/API';
import InfoModal from '../common/InfoModal';

const infoUncorrectlyRegText = `You has been registered in our service. You can check your credentials in the email. 
Also, you already login and have user dashboard (right top corner).
Your answer has been sent to the creator of the ad.
If autor approve you'll get his contact data on your email address or you'll check it in your user account.`;

const infoCorrectlyRegText = `You has been registered in our service. You can check your credentials in the email. 
Also, you already login and have user dashboard (right top corner).
Your answer has been sent to the creator of the ad.
`;

const infoUncorrectlyAnswerText = `Your answer has been sent to the creator of the ad.
If autor approve you'll get his contact data on your email address or you'll check it in your user account.
`;

const infoCorrectlyAnswerText = `Your answer has been sent to the creator of the ad.`;

const AnswerQuestionModal = ({ 
    adId,
    secretQuestion, 
    isOpen,
    onClose,
    userData,
    login,
}) => {

    const [answer, setAnswer] = useState('');
    const [userInfo, setUserInfo] = useState({ firstName: '', lastname: '', email: '', phone: '' });
    const [errMess, setErrMess] = useState('');
    const [isLoadSend, setIsLoadSend] = useState(false);
    const [autorContactData, setAutorContactData] = useState(null);
    const [isShowAutorContactData, setIsShowAutorContactData] = useState(false);
    const [infoModal, setInfoModal] = useState('');

    const onChangeUserInfo = e => {
        setErrMess('');
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    const onChangePhone = phone => {
        setErrMess('');
        setUserInfo({
            ...userInfo,
            phone
        })
    }

    const onChangeAnswer = e => {
        setErrMess('');
        setAnswer(e.target.value);
    }

    const onSubmitAnswer = () => { 
        setIsLoadSend(true);
        API.post('/answers', {
            adId,
            answerText: answer,
            user: userData ? userData : userInfo,
        })
        .then(resp => {
            setIsLoadSend(false);
            setAutorContactData(resp.data.autorAdContactData);

            if(resp.data.user && resp.data.token) {
                login(resp.data.user, resp.data.token);
                if(!resp.data.autorAdContactData) {
                    setInfoModal(infoUncorrectlyRegText);
                } else {
                    setInfoModal(infoCorrectlyRegText);
                }
                return;
            }
            if(resp.data.autorAdContactData) {
                setInfoModal(infoCorrectlyAnswerText);
                return;
            }
            setInfoModal(infoUncorrectlyAnswerText);
        })
        .catch(err => {
            if(err.response && err.response.data && err.response.data.message) {
                setErrMess(err.response.data.message);
            }
        })
    }

    const onCloseInfoModal = () => {
        setInfoModal('');
        if(!autorContactData) {
            onCloseModal();
        }
        setIsShowAutorContactData(true);
    } 

    const onCloseModal = () => {
        setAutorContactData(null);
        setIsShowAutorContactData(false);
        onClose();
    }

    if(autorContactData && isShowAutorContactData) {
        return (
            <Modal 
                size='small'
                open={isOpen}
                closeIcon
                onClose={onCloseModal}
            >
                <Modal.Header>You answered correctly!</Modal.Header>
                <Modal.Content>
                    <p>Contact data of autor ad:</p>
                    <div className='ad-autor-info'>
                        <Icon name='user' />
                        <span>{autorContactData.firstname} {autorContactData.lastname}</span>
                    </div>
                    <div className='ad-autor-info'>
                        <Icon name='mail' />
                        <span>{autorContactData.email}</span>
                    </div>
                    <div className='ad-autor-info'>
                        <Icon name='phone' />
                        <span>{autorContactData.phone}</span>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }

    return (
        <>
        <Modal 
            size='small'
            open={isOpen}
            closeIcon
            onClose={onCloseModal}
        >
            <Modal.Header>Answer the question</Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmitAnswer}>
                    <p>{secretQuestion}</p>
                    <Form.Input 
                        fluid 
                        placeholder='Your answer here...' 
                        required
                        onChange={onChangeAnswer}
                    />
                    {!userData && (
                        <>
                            <Form.Input 
                                icon='user'
                                iconPosition='left'
                                name='firstname'
                                fluid
                                placeholder='Your firstname'
                                onChange={onChangeUserInfo}
                                required
                            />
                            <Form.Input 
                                icon='user'
                                iconPosition='left'
                                name='lastname'
                                fluid
                                placeholder='Your lastname'
                                onChange={onChangeUserInfo}
                                required
                            />
                            <Form.Input 
                                icon='mail'
                                iconPosition='left'
                                name='email'
                                fluid
                                placeholder='Your e-mail'
                                type='email'
                                onChange={onChangeUserInfo}
                                required
                            />
                            <PhoneInput 
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                }}
                                preferredCountries={['us', 'ua']}
                                onChange={onChangePhone}
                                containerClass='phone-input-container'
                                inputClass='phone-input'
                                placeholder='Your phone'
                                fluid
                            />
                        </>
                    )}
                    {!!errMess.length && (
                        <Message color='red'>{errMess}</Message>
                    )}
                    <Button 
                        loading={isLoadSend}
                        type='submit' 
                        color='teal'
                        fluid
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
        <InfoModal 
            onClose={onCloseInfoModal}
            headerText='Thank you for your answer!'
            infoText={infoModal}
        />
        </>
    )
}

export default AnswerQuestionModal;
