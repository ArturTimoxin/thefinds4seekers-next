import React from 'react'
import { Modal, Image } from 'semantic-ui-react'

const PhotoModal = ({ 
    photo,
    onClose,
}) => {
    if(!photo) return null;
    return (
        <Modal 
            open={!!photo} 
            closeIcon={true}
            onClose={onClose}
            basic
        >
            <Modal.Content 
                image
                className='photo-modal'
            >
                <Image style={{ maxHeight: '70vh' }} src={photo} alt='photo' />
            </Modal.Content>
        </Modal>
    )
}


export default PhotoModal