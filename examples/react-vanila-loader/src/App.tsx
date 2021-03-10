import React, { useState } from "react";
import ReactDom from "react-dom";

const App = () => {
  const [like, setLike] = useState(false);

  const handleClick = () => {
    setLike((prevLike) => !prevLike);
  };

  return (
    <div>
      <h1>React Vanilla JS Loader v{React.version}</h1>
      <h2>React app</h2>
      <div>
        <button onClick={handleClick}>{`Like: ${like ? 1 : 0}`}</button>
        <span>{`React version - ${React.version}`}</span>
      </div>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#app"));
