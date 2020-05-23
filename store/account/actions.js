import * as constants from './actionTypes';
import API from '../../utils/API';

export const toggleIsLoadUserAds = () => {
    return {
        type: constants.TOGGLE_IS_LOAD_USER_ADS
    }
}

export const setUserAds = (userAds) => {
    return {
        type: constants.SET_USER_ADS,
        payload: { userAds }
    }
}

export const getUserAds = () => {
    return dispatch => {
        dispatch(toggleIsLoadUserAds());
        API.get('/ads/user')
            .then(resp => {
                dispatch(setUserAds(resp.data));
            })
    }
}

// edit ad actions

export const toggleIsLoadEditAdData = () => {
    return {
        type: constants.TOGGLE_IS_LOAD_EDIT_AD_DATA
    }
}

export const setEditAdData = editAdData => {
    return {
        type: constants.SET_EDIT_AD_DATA,
        payload: {
            editAdData
        }
    }
}

export const getEditAdData = (adId) => {
    return dispatch => {
        dispatch(toggleIsLoadEditAdData());
        API.get(`/ads/edit-info/${adId}`)
            .then(resp => {
                dispatch(toggleIsLoadEditAdData());
                dispatch(setEditAdData(resp.data));
            })
            .catch(err => {
                dispatch(toggleIsLoadEditAdData());
            })
    }
}

export const editAdChangeTypeId = typeId => {
    return {
        type: constants.EDIT_AD_CHANGE_TYPE_ID,
        payload: {
            typeId
        }
    }
}

export const editAdChangeTitle = title => {
    return {
        type: constants.EDIT_AD_CHANGE_TITLE,
        payload: {
            title
        }
    }
}

export const editAdChangeDescription = description => {
    return {
        type: constants.EDIT_AD_CHANGE_DESCRIPTION,
        payload: {
            description
        }
    }
}

export const editAdChangeCategoryId = categoryId => {
    return {
        type: constants.EDIT_AD_CHANGE_CATEGORY_ID,
        payload: {
            categoryId
        }
    }
}

export const editAdChangePoint = ({ lat, lng }) => {
    return {
        type: constants.EDIT_AD_CHANGE_POINT,
        payload: {
            lat, lng 
        }
    }
}

export const editAdChangeAddress = address => {
    return {
        type: constants.EDIT_AD_CHANGE_ADDRESS,
        payload: {
            address
        }
    }
}

export const editAdChangeSecretQuestion = secretQuestion => {
    return {
        type: constants.EDIT_AD_CHANGE_SECRET_QUESTION,
        payload: {
            secretQuestion
        }
    }
}

export const editAdChangeSecretAnswer = secretAnswer => {
    return {
        type: constants.EDIT_AD_CHANGE_SECRET_ANSWER,
        payload: {
            secretAnswer
        }
    }
}

export const editAdChangeLostOrFoundAt = lostOrFoundAt => {
    return {
        type: constants.EDIT_AD_CHANGE_LOST_OR_FOUND_AT,
        payload: {
            lostOrFoundAt
        }
    }
}

export const editAdSetErrorMessage = editAdErrorMessage => {
    return {
        type: constants.EDIT_AD_SET_ERROR_MESSAGE,
        payload: {
            editAdErrorMessage
        }
    }
}

export const editAdToggleLoadSubmitEditAd = () => {
    return {
        type: constants.EDIT_AD_TOGGLE_LOAD_SUBMIT_EDIT_AD
    }
}

export const editAdSetInfoModalMessage = infoModalMessageEditAd => {
    return {
        type: constants.EDIT_AD_SET_INFO_MODAL_MESSAGE,
        payload: {
            infoModalMessageEditAd
        }
    }
}

export const onSumbitEditAd = event => {
    return (dispatch, getState) => {
        const { 
            _id, typeId, title, description, location: { lat, lng, address }, 
            lostOrFoundAt, categoryId, secretQuestion, secretAnswer, 
        } = getState().account.editAdData;

        if(!typeId) {
            dispatch(editAdSetErrorMessage('Type ad is undefined'));
            return;
        }
        if(!title.length) {
            dispatch(editAdSetErrorMessage('Enter title of your Ad'));
            return;
        }
        if(title.length < 5 || title.length > 50) {
            dispatch(editAdSetErrorMessage('The title must consist of at least 5 and no more than 40 characters'));
            return;
        }
        if(!description.length) {
            dispatch(editAdSetErrorMessage('Enter description of your Ad'));
            return;
        }
        if(description.length < 10) {
            setErrMessage('The description must consist of at least 10 characters');
            return;
        }
        if(!categoryId) {
            dispatch(editAdSetErrorMessage('Choose category'));
            return;
        }
        if(!lat || !lng) {
            dispatch(editAdSetErrorMessage('Choose point on the map'));
            return;
        }
        if(!address.length) {
            dispatch(editAdSetErrorMessage(`Enter address where you ${typeAd === AD_FOUND_TYPE_ID ? 'found' : 'lost'} it`));
            return;
        }
        if(address.length < 10) {
            dispatch(editAdSetErrorMessage(`The address must consist of at least 10 characters`));
            return;
        }
        if(secretQuestion && !secretAnswer.length) {
            dispatch(editAdSetErrorMessage(`Enter secret answer on your secret question`));
            return;
        }

        const adFormData = new FormData();
        adFormData.append('title', title);
        adFormData.append('description', description);

        adFormData.append('typeId', typeId);
        adFormData.append('categoryId', categoryId);

        adFormData.append('location[address]', address);
        adFormData.append('location[lat]', lat);
        adFormData.append('location[lng]', lng);

        if(lostOrFoundAt) {
            adFormData.append('lostOrFoundAt', new Date(lostOrFoundAt).toISOString());
        }
        if(secretQuestion && secretQuestion.length && secretAnswer && secretAnswer.length) {
            adFormData.append('secretQuestion', secretQuestion);
            adFormData.append('secretAnswer', secretAnswer);
        }

        if(event.target.mainPhoto.files[0]) {
            adFormData.append('photos', event.target.mainPhoto.files[0]);
        }
        if(event.target.subPhotoOne.files[0]) {
            adFormData.append('photos', event.target.subPhotoOne.files[0]);
        }
        if(event.target.subPhotoTwo.files[0]) {
            adFormData.append('photos', event.target.subPhotoTwo.files[0]);
        }

        dispatch(editAdToggleLoadSubmitEditAd());
        API.put(`/ads/${_id}`, adFormData)
            .then(resp => {
                dispatch(editAdSetInfoModalMessage('An ad will be published in our service when the content is verified. You will be notified by email as soon as the announcement is published.'))
                dispatch(editAdToggleLoadSubmitEditAd());
            })
            .catch(err => {
                dispatch(editAdToggleLoadSubmitEditAd());
            })
    }
}

// answers

export const toggleIsLoadEditData = () => {
    return {
        type: constants.TOGGLE_IS_LOAD_ANSWERS,
    }
}

export const setAnswers = answers => {
    return {
        type: constants.SET_ANSWERS,
        payload: {
            answers
        }
    }
}

export const getAnswers = () => {
    return dispatch => {
        dispatch(toggleIsLoadEditData());
        API.get('/answers')
            .then(resp => {
                dispatch(setAnswers(resp.data));
            })
            .catch(err => {
                dispatch(toggleIsLoadEditData());
            })
    }
}
