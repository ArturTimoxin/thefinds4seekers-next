import * as constants from './actionTypes';
import API from '../../utils/API';

export const toggleNotApprovedAds = () => {
    return {
        type: constants.TOGGLE_IS_LOAD_NOT_APPROVED_ADS
    }
}

export const setNotApprovedAds = (notApprovedAds) => {
    return {
        type: constants.SET_NOT_APPROVED_ADS,
        payload: { notApprovedAds }
    }
}

export const getNotApprovedAds = () => {
    return dispatch => {
        dispatch(toggleNotApprovedAds());
        API.get('/admin/ads')
            .then(resp => {
                dispatch(setNotApprovedAds(resp.data));
            })
            .catch(err => {
                if(err.response.status === 404) {
                    dispatch(setNotApprovedAds([]));
                }
            })
    }
}