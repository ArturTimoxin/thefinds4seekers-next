import * as constants from './actionTypes';

const initialState = {
    notApprovedAds: [],
    isLoadNotApprovedAds: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_NOT_APPROVED_ADS: {
        return {
            ...state,
            notApprovedAds: action.payload.notApprovedAds,
            isLoadNotApprovedAds: false,
        }
      }
      case constants.TOGGLE_IS_LOAD_NOT_APPROVED_ADS: {
          return {
            ...state,
            isLoadNotApprovedAds: !state.isLoadNotApprovedAds,
          }
      }
      default:
        return state;
    }
}