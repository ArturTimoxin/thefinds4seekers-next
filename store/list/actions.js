import * as constants from './actionTypes';
import API from '../../utils/API';

export const setFoundAds = (foundAds, totalPages) => {
    return {
        type: constants.SET_FOUND_ADS,
        payload: { 
            foundAds,
            totalPages
        }
    }
}

export const searchAds = ({ page = 1, word = '', noveltyOrder = 'desc', typeId = null, categoryId = null, address = '' }) => {
    return async dispatch => {
        dispatch(toggleIsLoadResults());
        const findReqBody = {
            word, page, noveltyOrder
        }
        
        if(typeId) findReqBody.typeId = +typeId;
        if(categoryId) findReqBody.categoryId = categoryId;
        if(address.length) findReqBody.address = address;

        await API.get('/ads/find', {
            params: { ...findReqBody } // qwery params
        })
        .then(resp => {
            dispatch(setSearchParams(findReqBody));
            dispatch(setFoundAds(resp.data.foundAds, resp.data.totalPages));
            dispatch(toggleIsLoadResults());
        })
        .catch(err => {
            dispatch(toggleIsLoadResults());
        });
    }
}

export const setSearchParams = searchParams => {
    return {
        type: constants.SET_SEARCH_PARAMS,
        payload: { searchParams },
    }
}

export const changeCurrentPage = page => {
    return (dispatch, getState) => {
        const { word, noveltyOrder, typeId, categoryId, address } = getState().list;
        dispatch(setCurrentPage(page));
        dispatch(searchAds({ page, word, noveltyOrder, typeId, categoryId, address }));
    }
}

export const setCurrentPage = currentPage => {
    return {
        type: constants.CHANGE_CURRENT_PAGE,
        payload: {
            currentPage
        }
    }
}

export const toggleIsLoadResults = () => {
    return {
        type: constants.TOGGLE_IS_LOAD_RESULTS,
    }
}

export const changeWordFindQuery = word => {
    return {
        type: constants.CHANGE_WORD_SEARCH_QUERY,
        payload: {
            word
        }
    }
} 

export const changeNoveltyOrderFindQuery = noveltyOrder => {
    return {
        type: constants.CHANGE_NOVELTY_ORDER_SEARCH_QUERY,
        payload: {
            noveltyOrder
        }
    }
}

export const changeTypeAdFindQuery= typeId => {
    return {
        type: constants.CHANGE_TYPE_AD_SEARCH_QUERY,
        payload: {
            typeId
        }
    }
} 

export const changeCategoryFindQuery = categoryId => {
    return {
        type: constants.CHANGE_CATEGORY_SEARCH_QUERY,
        payload: {
            categoryId
        }
    }
}

export const changeAddressFindQuery = address => {
    return {
        type: constants.CHANGE_ADDRESS_SEARCH_QUERY,
        payload: {
            address
        }
    }
}