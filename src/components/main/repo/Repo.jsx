import React from "react";
import { NavLink } from "react-router-dom";
import "./repo.less";

const Repo = ({ repo }) => {
  return (
    <div className="repo">
      <div className="repo-header">
        <div className="repo-header-name">
          <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>
            {repo.name}
          </NavLink>
        </div>
        <div className="repo-header-start">{repo.stargazers_count}</div>
      </div>
      <div className="repo-last-commit">
        {repo.pushed_at.slice(0, 10)}
      </div>
      <a href={repo.html_url} className="repo-link">
        {" "}
        Ссылка на репозиторий
      </a>
    </div>
  );
};

export default Repo;
