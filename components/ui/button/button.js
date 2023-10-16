import React from "react";


function LoadMoreButton({ onClick, remaining }) {
  return (
    <button onClick={onClick} >
      Load More ({remaining} remaining)
    </button>
  );
}

export default LoadMoreButton;
