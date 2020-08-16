import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.Ul}>
        {pageNumbers.map((number) => (
          <li className="page-item" style={{ listStyle: "none" }} key={number}>
            <a
              className="page-link"
              onClick={(e) => paginate(e, number)}
              href="!#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
