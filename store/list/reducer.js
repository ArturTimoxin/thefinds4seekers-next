import * as constants from './actionTypes';

const initialState = {
    foundAds: [],
    totalPages: 1,
    currentPage: 1,
    word: '',
    noveltyOrder: 'desc',
    typeId: null,
    categoryId: null,
    address: '',
    isLoadResults: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_FOUND_ADS: {     
          return {
            ...state,
            foundAds: action.payload.foundAds,
            totalPages: action.payload.totalPages,
          }
      }
      case constants.CHANGE_CURRENT_PAGE: {
          return {
              ...state,
              currentPage: action.payload.currentPage
          }
      }
      case constants.TOGGLE_IS_LOAD_RESULTS: {
          return {
              ...state,
              isLoadResults: !state.isLoadResults,
          }
      }
      case constants.SET_SEARCH_PARAMS: {
          return {
              ...state,
              ...action.payload.searchParams,
          }
      }
      case constants.CHANGE_WORD_SEARCH_QUERY: {
          return {
              ...state,
              word: action.payload.word,
          }
      }
      case constants.CHANGE_NOVELTY_ORDER_SEARCH_QUERY: {
        return {
            ...state,
            noveltyOrder: action.payload.noveltyOrder,
        }
      }
      case constants.CHANGE_TYPE_AD_SEARCH_QUERY: {
        return {
            ...state,
            typeId: action.payload.typeId,
        }
      }
      case constants.CHANGE_CATEGORY_SEARCH_QUERY: {
        return {
            ...state,
            categoryId: action.payload.categoryId,
        }
      }
      case constants.CHANGE_ADDRESS_SEARCH_QUERY: {
          return {
            ...state,
            address: action.payload.address,
          }
      }
      default:
        return state;
    }
}