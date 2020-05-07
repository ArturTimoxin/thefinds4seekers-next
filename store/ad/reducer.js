import * as constants from './actionTypes';

const initialState = {
    adData: {
        _id: null,
        title: null,
        description: null,
        photos: [],
        typeId: null,
        location: {
            _id: null,
            address: null,
            lat: null,
            lng: null,
        },
        user: {
            firstname: null,
            lastname: null,
            email: null,
            phone: null,
        },
        categoryId: null,
        lostOrFoundAt: null,
        createdAt: null,
        secretQuestion: null,
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_AD_DATA: {          
          return {
            ...state,
            adData: action.payload.adData,
          }
      }
      default:
        return state;
    }
}