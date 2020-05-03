import * as constants from './actionTypes';
import API from '../../utils/API';

export const setAdsPoints = (adsPoints) => {
    return {
        type: constants.SET_ADS_POINTS,
        payload: { adsPoints }
    }
}

export const setNewAds = (newAds) => {
    return {
        type: constants.SET_NEW_ADS,
        payload: { newAds },
    }
}

export const getAdsPoints = () => {
    return dispatch => {
        API.get('/ads/points')
            .then(resp => {
                dispatch(setAdsPoints(resp.data));
            })
    }
}

export const getNewAds = () => {
    return async dispatch => {
        await API.get('/ads/new')
                .then(resp => {
                    dispatch(setNewAds(resp.data));
                    return resp.data;
                })
    }
}