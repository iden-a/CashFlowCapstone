import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <>
      <div className="loadingCont">
        <div className="loader1">
          <img className="dot" src="cashflowcloud.png" />
        </div>

        <div className="loadingBody">
          <div className="loader">
            <div className="loader__image">
              <div className="loader__coin">
                <img src="loader-coin.png" alt="" />
              </div>
              <div className="loader__hand">
                <img src="loader-hand.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
