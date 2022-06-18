import React, { useEffect, useState } from 'react';

import './styles/Pagination.css';

import Button from './Button';
import PaginationProps from '../models/components/PaginationProps';

const Pagination: React.FC<PaginationProps> = ({
  updateQuery,
  currentPage,
  pageSize,
  totalItems = 0
}) => {
  const [rangePageNumber, setRangePageNumber] = useState([1]);

  useEffect(() => {
    totalItems > 0
      ? setRangePageNumber([...Array(Math.ceil(totalItems! / pageSize))].map((_, i) => i + 1))
      : setRangePageNumber([1]);
  }, [totalItems, pageSize]);

  const filteredMiddleSection = () => {
    const totalButtonCount = rangePageNumber.length;
    return totalButtonCount <= 5
      ? rangePageNumber.slice(1, totalButtonCount - 1)
      : currentPage < 4
      ? rangePageNumber.slice(1, 5)
      : currentPage > 4 && currentPage < totalButtonCount - 3
      ? rangePageNumber.slice(currentPage - 2, currentPage + 1)
      : currentPage > 4 && currentPage >= totalButtonCount - 3
      ? rangePageNumber.slice(totalButtonCount - 5, totalButtonCount - 1)
      : rangePageNumber.slice(1, 5);
  };

  const PageButtonsList = filteredMiddleSection().map((numberLabel) => {
    return (
      <li key={numberLabel} className={`page_btn ${currentPage === numberLabel ? 'current' : ''}`}>
        <Button
          classes="icon"
          onClick={() => {
            updateQuery('page', `page=${numberLabel}&`);
          }}
        >
          <span>{numberLabel}</span>
        </Button>
      </li>
    );
  });
  const FirstPageBtn = () => {
    return (
      <li
        className={`page_btn edge left ${currentPage === 1 ? 'current' : ''} ${
          rangePageNumber.length === 1 ? 'right' : ''
        }`}
      >
        <Button
          classes="icon"
          onClick={() => {
            updateQuery('page', `page=1&`);
          }}
        >
          <span>1</span>
        </Button>
      </li>
    );
  };

  const LastPageBtn = () => {
    return (
      <li
        className={`page_btn edge right ${currentPage === rangePageNumber.length ? 'current' : ''}`}
      >
        <Button
          classes="icon"
          onClick={() => {
            updateQuery('page', `page=${rangePageNumber.length}&`);
          }}
        >
          <span>{rangePageNumber.length}</span>
        </Button>
      </li>
    );
  };
  const DotsBtnLeft = () => {
    return (
      <li className={`dots ${rangePageNumber.length > 5 && currentPage > 4 ? 'visible' : ''}`}>
        <Button classes="icon">
          <span>...</span>
        </Button>
      </li>
    );
  };

  const DotsBtnRight = () => {
    return (
      <li
        className={`dots ${
          rangePageNumber.length > 5 && currentPage < rangePageNumber.length - 3 ? 'visible' : ''
        }`}
      >
        <Button classes="icon">
          <span>...</span>
        </Button>
      </li>
    );
  };

  return rangePageNumber.length > 1 ? (
    <nav className="pagination">
      <ul className="card">
        <FirstPageBtn />
        <DotsBtnLeft />
        {PageButtonsList}
        <DotsBtnRight />
        <LastPageBtn />
      </ul>
    </nav>
  ) : (
    <></>
  );
};

export default Pagination;
