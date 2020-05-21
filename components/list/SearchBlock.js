import React from 'react'
import { actions } from '../../store';
import { connect } from "react-redux";
import { Button, Form, Dropdown, Icon } from 'semantic-ui-react';
import { AD_LOST_TYPE_ID, AD_FOUND_TYPE_ID } from '../register-ad/ChooseTypeAd';
import generateQweryString from '../../utils/generateQweryString';
import Router from 'next/router';

const SearchBlock = ({ 
  word,
  noveltyOrder,
  typeId,
  categoryId,
  address,
  adsCategories,
  searchAds,
  changeWordFindQuery,
  changeNoveltyOrderFindQuery,
  changeTypeAdFindQuery,
  changeCategoryFindQuery,
  changeAddressFindQuery,
}) => {

    const onSubmitSearch = () => {
      const qweryString = generateQweryString({ word, noveltyOrder, typeId, categoryId, address });
      Router.push(`/list?${qweryString}`, undefined, { shallow: true });
      searchAds({ word, noveltyOrder, typeId, categoryId, address });
    }

    return (
        <div className='search-block-wrap'>
            <Form 
              onSubmit={onSubmitSearch}
              className='search-form'
            >
              <div className='search-controls'>
                <div className='wrap-contols-1'>
                  <Form.Input 
                    defaultValue={word}
                    value={word}
                    size='huge' 
                    placeholder='Search by word...'
                    className='search-input'
                    name='word'
                    onChange={e => changeWordFindQuery(e.target.value)}
                  />
                  <div className='wrap-contols-dropdowns-1'>
                    <Dropdown 
                      selection
                      clearable
                      defaultValue={typeId}
                      placeholder='Type'
                      className='dropdown-search first'
                      options={[
                        { text: 'Lost', value: AD_LOST_TYPE_ID },
                        { text: 'Found', value: AD_FOUND_TYPE_ID }
                      ]}
                      onChange={(e, { value }) => {
                        changeTypeAdFindQuery(value);
                      }}
                    />
                    <Dropdown 
                      selection
                      clearable
                      defaultValue={categoryId}
                      placeholder='Category'
                      className='dropdown-search'
                      options={adsCategories}
                      onChange={(e, { value }) => {
                        changeCategoryFindQuery(value);
                      }}
                    />
                  </div>
                </div>
                <div className='wrap-contols-2'>
                  <Form.Input 
                    size='huge' 
                    defaultValue={address}
                    placeholder='Search by place...' 
                    className='search-input'
                    name='address'
                    onChange={e => changeAddressFindQuery(e.target.value)}
                  />
                  <Dropdown 
                    selection
                    placeholder='Sort'
                    className='dropdown-search'
                    defaultValue={noveltyOrder}
                    options={[
                      { text: 'Sort by: From new to old', value: 'desc' },
                      { text: 'Sort by: From old to new', value: 'asc' }
                    ]}
                    onChange={(e, { value }) => {
                      changeNoveltyOrderFindQuery(value);
                    }}
                  />
                </div>
              </div>
              <Button 
                size='huge' 
                color='teal' 
                type='submit'
              >
                <Icon name='search' />
                Search
              </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = store => ({
  word: store.list.word,
  noveltyOrder: store.list.noveltyOrder,
  typeId: store.list.typeId,
  categoryId: store.list.categoryId,
  address: store.list.address,
  adsCategories: store.app.adsCategories,
})

const mapDispatchToProps = dispatch => {
  return {
    searchAds: options => dispatch(actions.list.searchAds(options)),
    changeWordFindQuery: word => dispatch(actions.list.changeWordFindQuery(word)),
    changeNoveltyOrderFindQuery: noveltyOrder => dispatch(actions.list.changeNoveltyOrderFindQuery(noveltyOrder)),
    changeTypeAdFindQuery: typeId => dispatch(actions.list.changeTypeAdFindQuery(typeId)),
    changeCategoryFindQuery: categoryId => dispatch(actions.list.changeCategoryFindQuery(categoryId)),
    changeAddressFindQuery: address => dispatch(actions.list.changeAddressFindQuery(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlock);