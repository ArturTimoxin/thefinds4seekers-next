import React, { useState } from 'react'
import Link from "next/link";
import SearchIcon from '../../../assets/find.png';
import AddIcon from '../../../assets/add.png'
import Router from 'next/router';

const Search = () => {

    const [searchWord, setSearchWord] = useState('');
    const onSearch = e => {
        e.preventDefault();
        Router.push(`/list?word=${searchWord}`);
    }

    return (
        <div className='search-add-wrap'>
            <span className='search-wrap'>
                <form 
                    onSubmit={onSearch}
                    className='header-search-form'
                >
                    <input 
                        value={searchWord}
                        className='head-search-input'
                        onChange={e => setSearchWord(e.target.value)}
                        placeholder='Search...'
                    />
                </form>
                <img 
                    onClick={onSearch}
                    className='search-icon' 
                    src={SearchIcon} 
                    alt='search-icon' 
                />
            </span>
            <Link
                href="/register-ad"
            >
                    <button
                        className='create-ad-btn'
                    >
                        <img 
                            className='create-ad-icon' 
                            src={AddIcon} 
                            alt='create-ad-icon' 
                        />
                        <span className='text'>
                            Create ad
                        </span>
                    </button>
            </Link>
        </div>
    )
}
  
export default Search;