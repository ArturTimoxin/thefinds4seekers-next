import React, { useState } from 'react'
import { Button, Header, Modal, Input } from 'semantic-ui-react'

const SendMessageModal = ({ 
    isOpen, 
    headerText, 
    subheaderText, 
    onSend,
    onClose, 
}) => {

    const [message, setMessage] = useState('');

    const onSumbitSend = () => {
        if(!message.length) return;
        onSend(message);
    }

    return (
        <Modal 
            open={isOpen}
            onClose={onClose}
            closeIcon={true}
        >
            <Modal.Header>{headerText}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>{subheaderText}</Header>
                    <div className='send-message-modal-actions'>
                        <Input 
                            name='message'
                            value={message} 
                            onChange={e => setMessage(e.target.value)}
                            className='send-message-modal-input'
                        />
                        <Button 
                            positive
                            onClick={onSumbitSend}
                        >
                            Send
                        </Button>
                    </div>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default SendMessageModal;