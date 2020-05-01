import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const InfoModal = ({ isOpen, headerText, infoText, onClose }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            basic
            size='small'
        >
            <Header content={headerText} />
            <Modal.Content>
                <h3>{infoText}</h3>
            </Modal.Content>
            <Modal.Actions>
                <Button color='teal' onClick={onClose} inverted>
                    <Icon name='checkmark' /> Got it
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default InfoModal;