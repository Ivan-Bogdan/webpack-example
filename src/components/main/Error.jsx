import React from "react";

const Error = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => props.history.push("/")}>Go to mainPage</button>
      Error
    </div>
  );
};

export default Error;
