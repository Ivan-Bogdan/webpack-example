import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentRepo, getContributors } from "../actions/repos";
import "./card.less";

function Card(props) {
  const { username, reponame } = useParams();
  console.log(username, reponame);
  const [repo, setRepo] = useState({ owner: {} });
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo);
    getContributors(username, reponame, setContributors);
  }, []);

  return (
    <div>
      <button onClick={() => props.history.goBack()} className="back-btn">
        Back
      </button>
      <div className="card">
        <img src={repo.owner.avatar_url} alt=""></img>
        <div className="name">{repo.name}</div>
        <div className="stars">{repo.stargazers_count}</div>
      </div>
      {contributors.map((item, acc) => (
        <div>
          {acc + 1}.{item.login}
        </div>
      ))}
    </div>
  );
}

export default Card;
