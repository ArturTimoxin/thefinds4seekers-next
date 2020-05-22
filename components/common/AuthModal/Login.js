import React, { useState } from 'react';
import { Modal, Form, Message } from 'semantic-ui-react';
import API from '../../../utils/API';
import { toastSuccess } from '../../../utils/toastrConfig';
import Router from 'next/router';

const Login = ({ setIsLoginMode, login, closeModal }) => {

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [errMessage, setErrMessage] = useState('');
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);

    const onChange = e => {
        setErrMessage('');
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmitLogin = () => {
        const { email, password } = loginData;
        setIsLoadingLogin(true);
        API.post('/auth/login', {
            email, password
        })
        .then(resp => {
            login(resp.data.user, resp.data.token);
            setIsLoadingLogin(false);
            toastSuccess('You have been successfully logged in');
            closeModal();
            Router.push(`/account`);
        })
        .catch(err => {
            setErrMessage(err.response.data.message);
            setIsLoadingLogin(false);
        })
    }

    return (
        <>
            <Modal.Header>Log-in to your account</Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmitLogin}>
                    <Form.Input 
                        icon='user'
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
                        className='top-margin'
                        placeholder='Password'
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
                        loading={isLoadingLogin}
                    >
                        Login
                    </Form.Button>
                </Form>
                <Message className='login-message'>
                    <span>New to us?</span>
                    <a 
                        className='register-link'
                        onClick={() => setIsLoginMode(false)}
                    >
                        Sign Up
                    </a>
                </Message>
            </Modal.Content>
        </>
    )
}

export default Login;