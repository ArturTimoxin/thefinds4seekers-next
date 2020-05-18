import React from 'react'
import { actions } from '../../store';
import { connect } from "react-redux";
import SearchBlock from '../../components/list/SearchBlock';
import FoundAds from '../../components/list/FoundAds';
import { Pagination, Message } from 'semantic-ui-react';

const List = ({ foundAds, isLoadResults, totalPages, currentPage, changeCurrentPage }) => {

    return (
        <div className='wrap-list-ads'>
            <h1 className='title-search-ad'>Search Ads</h1>
            <SearchBlock />
            {!foundAds.length && (
                <Message className='not-fond-ads-message' size='huge'>Ads not found. Please, change your search query.</Message>
            )}
            <FoundAds 
                foundAds={foundAds}
                isLoad={isLoadResults}
            />
            <div className='wrap-pagination-ad-list'>
                <Pagination 
                    defaultActivePage={currentPage} 
                    totalPages={totalPages} 
                    disabled={totalPages === 1}
                    onPageChange={ (e, { activePage }) => changeCurrentPage(activePage)}
                />
            </div>
        </div>
    )
}

List.getInitialProps = async ({ query, store }) => {
    let reqParams = {};
    if(Object.values(query).length) reqParams = { ...query };
    await store.dispatch(actions.list.searchAds(reqParams));
    return store.getState().list;
};

const mapStateToProps = store => ({
    foundAds: store.list.foundAds,
    isLoadResults: store.list.isLoadResults,
    totalPages: store.list.totalPages,
    currentPage: store.list.currentPage,
})

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPage: page => dispatch(actions.list.changeCurrentPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);