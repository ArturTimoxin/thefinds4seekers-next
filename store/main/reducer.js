import * as constants from './actionTypes';

const initialState = {
    adsPoints: [],
    newAds: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_ADS_POINTS: {
        return {
            ...state,
            adsPoints: action.payload.adsPoints,
        }
      }
      case constants.SET_NEW_ADS: {
          return {
              ...state,
              newAds: action.payload.newAds,
          }
      }
      default:
        return state;
    }
}