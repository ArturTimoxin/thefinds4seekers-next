import * as constants from './actionTypes';
import API from '../../utils/API';

export const setAdData = (adData) => {
    return {
        type: constants.SET_AD_DATA,
        payload: {
            adData
        }
    }
}

export const getAdData = (adId) => {
    return async dispatch => {
        await API.get(`/ads/${adId}`)
                 .then(resp => {
                     dispatch(setAdData(resp.data));
                 })
    }
}