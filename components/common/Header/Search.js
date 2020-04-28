import React from 'react'
import Link from "next/link";
import SearchIcon from '../../../assets/find.png';
import AddIcon from '../../../assets/add.png'

const Search = ({ value, onChange, onSearch }) => {
    return (
        <div className='search-add-wrap'>
            <span className='search-wrap'>
                <input 
                    value={value}
                    className='head-search-input'
                    onChange={onChange}
                    placeholder='Search...'
                />
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