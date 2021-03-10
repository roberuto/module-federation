import React, { useState } from "react";

const LikeButton = () => {
  const [like, setLike] = useState(false);

  const handleClick = () => {
    setLike((prevLike) => !prevLike);
  };

  return (
    <div>
      <button onClick={handleClick}>{`Like: ${like ? 1 : 0}`}</button>
      <span>{`React version - ${React.version}`}</span>
    </div>
  );
};

export default LikeButton;
