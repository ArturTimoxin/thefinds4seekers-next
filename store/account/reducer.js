import * as constants from './actionTypes';

export const initialEditAdData = {
    _id: null,
    typeId: 1,
    title: '',
    description: '',
    location: {
        lat: null,
        lng: null,
        address: '',
    },
    photos: [],
    lostOrFoundAt: new Date(),
    categoryId: null,
    secretQuestion: '',
    secretAnswer: '',
};

const initialState = {
    // user ad list
    userAds: [],
    isLoadUserAds: false,
    // edit ad
    editAdData: initialEditAdData,
    isLoadEditAdData: false,
    editAdErrorMessage: '',
    isLoadSubmitEditAd: false,
    infoModalMessageEditAd: null,
    // answers
    answers: [],
    isLoadAnswers: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        // list user ads
        case constants.SET_USER_ADS: {
            return {
                ...state,
                userAds: action.payload.userAds,
                isLoadUserAds: false,
            }
        }
        case constants.TOGGLE_IS_LOAD_USER_ADS: {
            return {
                ...state,
                isLoadUserAds: !state.isLoadUserAds,
            }
        }

        // EDIT AD
        case constants.SET_EDIT_AD_DATA: {
            return {
                ...state,
                editAdData: action.payload.editAdData,
            }
        }
        case constants.TOGGLE_IS_LOAD_EDIT_AD_DATA: {
            return {
                ...state,
                isLoadEditAdData: !state.isLoadEditAdData,
            }
        }
        case constants.EDIT_AD_CHANGE_TYPE_ID: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    typeId: action.payload.typeId
                }
            }
        }
        case constants.EDIT_AD_CHANGE_TITLE: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    title: action.payload.title
                }
            }
        }
        case constants.EDIT_AD_CHANGE_DESCRIPTION: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    description: action.payload.description
                }
            }
        }
        case constants.EDIT_AD_CHANGE_CATEGORY_ID: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    categoryId: action.payload.categoryId
                }
            }
        }
        case constants.EDIT_AD_CHANGE_POINT: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    location: {
                        ...state.editAdData.location,
                        lat: action.payload.lat,
                        lng: action.payload.lng,
                    }
                }
            }
        }
        case constants.EDIT_AD_CHANGE_ADDRESS: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    location: {
                        ...state.editAdData.location,
                        address: action.payload.address,
                    }
                }
            }
        }
        case constants.EDIT_AD_CHANGE_SECRET_QUESTION: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    secretQuestion: action.payload.secretQuestion,
                }
            }
        }
        case constants.EDIT_AD_CHANGE_SECRET_ANSWER: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    secretAnswer: action.payload.secretAnswer,
                }
            }
        }
        case constants.EDIT_AD_CHANGE_LOST_OR_FOUND_AT: {
            return {
                ...state,
                editAdData: {
                    ...state.editAdData,
                    lostOrFoundAt: action.payload.lostOrFoundAt,
                }
            }
        }
        case constants.EDIT_AD_SET_ERROR_MESSAGE: {
            return {
                ...state,
                editAdErrorMessage: action.payload.editAdErrorMessage
            }
        }
        case constants.EDIT_AD_TOGGLE_LOAD_SUBMIT_EDIT_AD: {
            return {
                ...state,
                isLoadSubmitEditAd: !state.isLoadSubmitEditAd
            }
        }
        case constants.EDIT_AD_SET_INFO_MODAL_MESSAGE: {
            return {
                ...state,
                infoModalMessageEditAd: action.payload.infoModalMessageEditAd,
            }
        }
        // answers
        case constants.TOGGLE_IS_LOAD_ANSWERS: {
            return {
                ...state,
                isLoadAnswers: !state.isLoadAnswers,
            }
        }
        case constants.SET_ANSWERS: {
            return {
                ...state,
                answers: action.payload.answers,
                isLoadAnswers: false,
            }
        }

        default:
            return state;
    }
}