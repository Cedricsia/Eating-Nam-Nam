import React from "react";

function NoMatch() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="flex justify-center text-8xl">404 Error page </h1>
      <p className="flex justify-center text-5xl ">
        Sorry, This page doesn't exist.
      </p>
    </div>
  );
}

export default NoMatch;
