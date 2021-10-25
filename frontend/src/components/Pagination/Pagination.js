import React from "react";
import "./Pagination.css";
import { NavLink } from "react-router-dom";

const Pagination = (props) => {
  const {
    currentPage,
    previousPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    hasNextPage,
    endPoint
  } = props;
  return (
    <section className="pagination">
      {currentPage !== 1 && previousPage !== 1 && (
        <NavLink
          exact
          to={`${endPoint}1`}
          className="page__link"
        >
          1
        </NavLink>
      )}

      {hasPreviousPage && (
        <NavLink
          exact
          to={endPoint + previousPage}
          className="page__link"
        >
          {previousPage}
        </NavLink>
      )}

      <NavLink
        exact
        to={endPoint + currentPage}
        activeClassName="active"
        className="page__link"
      >
        {currentPage}
      </NavLink>

      {hasNextPage && (
        <NavLink
          exact
          to={endPoint + nextPage}
          className="page__link"
        >
          {nextPage}
        </NavLink>
      )}
      {lastPage !== currentPage && nextPage !== lastPage && (
        <><span>...</span>
        <NavLink
          exact
          to={endPoint + lastPage}
          className="page__link"
        >
          {lastPage}
        </NavLink>
        </>
      )}
    </section>
  );
};

export default Pagination;
