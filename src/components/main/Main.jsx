import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setCurrentPage } from "../../reducers/reposReducer";
import { getRepos } from "../actions/repos";
import { createPages } from "../utils/pagesCreator";
import "./main.less";
import Repo from "./repo/Repo";

const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos.items);
  const isFetching = useSelector((state) => state.repos.isFetching);
  const currentPage = useSelector((state) => state.repos.currentPage);
  const totalCount = useSelector((state) => state.repos.totalCount);
  const perPage = useSelector((state) => state.repos.perPage);
  const isFetchError = useSelector((state) => state.repos.isFetchError);
  const [search, setSearch] = useState("");
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages = [];
  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(search, currentPage, perPage));
  }, [currentPage]);

  function searchHandler() {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(search, currentPage, perPage));
  }

  return (
    <div>
      {isFetchError && (
        <div class="alert alert-danger" role="alert">
          Произошла ошибка
        </div>
      )}
      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="search-input"
        />
        <button
          onClick={() => {
            searchHandler();
          }}
          className="search-btn"
        >
          Search
        </button>
      </div>
      {!isFetching ? (
        repos.map((repo) => <Repo key={repo.id} repo={repo}></Repo>)
      ) : (
        <div className="fetching"></div>
      )}
      <div className="pages">
        {pages.map((page, index) => (
          <span
            key={index}
            className={currentPage === page ? "current-page" : "page"}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Main;
