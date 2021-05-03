import React, { useMemo, useCallback } from 'react'
import CONSTANTS from '../constants'

type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChanged: (page: number) => void
  pageNeighbours?: number
}

const range = (from: number, to: number, step: number = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const Pagination: React.FC<PaginationProps> = ({totalPages, currentPage, onPageChanged, pageNeighbours = 0}) => {  
  const fetchPageNumbers = useCallback((): any[] => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = CONSTANTS.LEFT_PAGE;
      const rightSpillPage = CONSTANTS.RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);

  }, [pageNeighbours, currentPage, totalPages])
  const pages = useMemo(fetchPageNumbers, [fetchPageNumbers])
  const gotoPage = (page: number) => {
    onPageChanged(Math.max(0, Math.min(page, totalPages)))
  }
  const clickHandler = (e: React.MouseEvent, page: number) => {
    e.preventDefault()
    gotoPage(page)
  }
  const moveLeftHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    gotoPage(currentPage - pageNeighbours * 2 - 1)
  };

  const moveRightHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    gotoPage(currentPage + pageNeighbours * 2 + 1)
  }
  if(totalPages < 2) {
    return <></>
  }
  return (
    <nav aria-label="Tickets Pagination">
      <ul className="pagination justify-content-center">
        {pages.map((page, index) => {
          if (page === CONSTANTS.LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link"
                  href="/"
                  aria-label="Previous"
                  onClick={moveLeftHandler}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            );

          if (page === CONSTANTS.RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link"
                  href="/"
                  aria-label="Next"
                  onClick={moveRightHandler}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            )
          return (
            <li
              key={index}
              className={`page-item${
                currentPage === page ? " active" : ""
              }`}
            >
              <a
                className="page-link"
                href="/"
                onClick={e => clickHandler(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default Pagination