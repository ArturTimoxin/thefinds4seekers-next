import * as constants from './actionTypes';

const initialState = {
    userData: null,
    token: null,
    isOpenAuthModal: false,
    isLoginAuthModalMode: true,
    adsCategories: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.LOGIN: {
        return {
            ...state,
            userData: action.payload.userData,
            token: action.payload.token,
        }
      }
      case constants.LOGOUT: {
        return {
            ...state,
            userData: null,
            token: null,
        }
      }
      case constants.TOGGLE_AUTH_MODAL: {
          return {
              ...state,
              isOpenAuthModal: !state.isOpenAuthModal,
          }
      }
      case constants.SET_AUTH_MODAL_MODE: {
          return {
              ...state,
            isLoginAuthModalMode: action.payload.isLogin,
          }
      }
      case constants.SET_ADS_CATEGORIES: {
        return {
          ...state,
          adsCategories: action.payload.adsCategories,
        }
      }
      default:
        return state;
    }
}