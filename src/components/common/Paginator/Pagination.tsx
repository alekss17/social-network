import React, { useState } from 'react';
import '../../../styles/Users.css';

interface PaginatorProps {
    currentPage: number;
    TotalItemsCount: number;
    PageSize: number;
    OnePageChanged: (p: number) => void;
    portionSize: number;
}

const Paginator = ({currentPage, TotalItemsCount, PageSize, OnePageChanged, portionSize = 10}: PaginatorProps) => {
    let pagesCount = Math.ceil(TotalItemsCount / PageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i);

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className="Paginator">
         {portionNumber > 1 &&
          <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}
        <div>
            {pages.filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
            .map((p) => (
                <span
                    key={p}
                    className={currentPage === p ? 'ActiveSpanPageUsers' : 'SpanPaginationNumberBTN'}
                    onClick={() => OnePageChanged(p)}
                >{p}</span>
            ))}
        </div>
        { portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1)}}>next</button> }
        </div>
    );
}

export default Paginator
