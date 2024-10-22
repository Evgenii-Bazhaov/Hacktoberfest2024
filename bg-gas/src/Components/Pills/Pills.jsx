/* eslint-disable react/prop-types */
import React from "react";

// Pills component is a reusable component that displays a pill with text and a close icon.
const Pills = ({ text, onClick }) => {
  return (
    <div className="flex flex-row rounded-2xl border-2 border-black px-2 md:px-4 justify-between gap-2 items-center">
      <div>{text}</div>
      <div
        onClick={onClick}
        className="cursor-pointer"
        data-testid={`${text}-cross`}
      >
        <img src="./icons/cross.svg" alt="modal close" width="30" height="30" />
      </div>
    </div>
  );
};

export default Pills;
