import React, { useState } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';
import API from '../../../utils/API';

const SignUp = ({ setIsLoginMode, login, closeModal }) => {

    const [signUpData, setSignUpData] = useState({ firstname: '', lastname: '', phone: '', email: '', password: '', confirmPassword: '' })
    const [errMessage, setErrMessage] = useState('');
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

    const onChange = e => {
        setErrMessage('');
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        })
    }

    const onChangePhone = phone => {
        setErrMessage('');
        setSignUpData({
            ...signUpData,
            phone
        })
    }

    const onSubmitSignUp = () => {
        if(signUpData.password.length < 6) {
            setErrMessage('Password should contain more than 5 symbols');
            return;
        }
        if(signUpData.confirmPassword !== signUpData.password) {
            setErrMessage('Confirm the password');
            return;
        }

        const { email, password, firstname, lastname, phone } = signUpData;

        setIsLoadingSignUp(true);

        API.post('/auth/register', {
            email, password, firstname, lastname, phone
        })
        .then(resp => {
            setIsLoadingSignUp(false);
            login(resp.data.user, resp.data.token);
            closeModal();
        })
        .catch(err => {
            setIsLoadingSignUp(false);
            setErrMessage(err.response.data.message);
        })
    }
    
    return (
        <>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmitSignUp}>
                    <Form.Input 
                        icon='user'
                        iconPosition='left'
                        name='firstname'
                        fluid
                        placeholder='Firstname'
                        onChange={onChange}
                        required
                    />
                    <Form.Input 
                        icon='user'
                        iconPosition='left'
                        name='lastname'
                        fluid
                        placeholder='Lastname'
                        onChange={onChange}
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
                        placeholder='Phone'
                        fluid
                    />
                    <Form.Input 
                        icon='mail'
                        iconPosition='left'
                        name='email'
                        fluid
                        placeholder='E-mail'
                        type='email'
                        onChange={onChange}
                        required
                    />
                    <Form.Input 
                        icon='lock'
                        iconPosition='left'
                        name='password'
                        fluid
                        placeholder='Password'
                        type='password'
                        onChange={onChange}
                        required
                    />
                    <Form.Input 
                        icon='lock'
                        iconPosition='left'
                        name='confirmPassword'
                        fluid
                        placeholder='Confirm password'
                        type='password'
                        onChange={onChange}
                        required
                    />
                    {!!errMessage.length && (
                        <Message color='red'>{errMessage}</Message>
                    )}
                    <Form.Button 
                        fluid
                        color='teal'
                        size='medium'
                        className='top-margin'
                        loading={isLoadingSignUp}
                    >
                        Create an account
                    </Form.Button>
                </Form>
                <Message className='login-message'>
                    <span>Already have an account?</span>
                    <a 
                        className='register-link'
                        onClick={() => setIsLoginMode(true)}
                    >
                        Log-in
                    </a>
                </Message>
            </Modal.Content>
        </>
    )
}


export default SignUp;
