import React, { Fragment, useState } from "react";
import "./Loading.css";

export default function Loading() {
  console.log("is loading")
  return (
    <>
    <div className="loadingCont">
      <div classNameName="loadingBody">
      <div className="loader">
        <div className="loader__image">
          <div className="loader__coin">
            <img
              src="loader-coin.png"
              alt=""
            />
          </div>
          <div className="loader__hand">
            <img
              src="loader-hand.png"
              alt=""
            />
          </div>
        </div>
      </div>
      </div>


      </div>
    </>
  );
}
