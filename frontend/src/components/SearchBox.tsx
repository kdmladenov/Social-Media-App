import React, { useState } from 'react';

import './styles/SearchBox.css';
import useThrottle from '../hooks/useThrottle';
import { RESET_BTN_THRESHOLD_SHOW_CHAR_COUNT, THROTTLE_DELAY } from '../data/constants';

import Tooltip from './Tooltip';
import SearchBoxProps from '../types/components/SearchBoxProps';

const SearchBox: React.FC<SearchBoxProps> = ({ updateQuery, resource }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchEnterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      updateQuery('search', `search=${searchTerm}&`);
    }
  };

  const resetInputButtonHandler = () => {
    setSearchTerm('');
    updateQuery('search', `search=`);
  };

  const keywordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Throttle (debounce) searches
  useThrottle(() => updateQuery('search', `search=${searchTerm}&`), THROTTLE_DELAY, [searchTerm]);

  return (
    <div className="search_box_container">
      <div className={`search_box ${searchTerm && 'active'}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={keywordInputHandler}
          onKeyUp={(e) => searchEnterKeyHandler(e)}
          placeholder={`Search in ${resource}`}
        />
        {searchTerm.length >= RESET_BTN_THRESHOLD_SHOW_CHAR_COUNT && (
          <button type="button" className="reset_btn" onClick={resetInputButtonHandler}>
            <Tooltip text="Clear">
              <i className="fa fa-times" aria-hidden="true" />
            </Tooltip>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
