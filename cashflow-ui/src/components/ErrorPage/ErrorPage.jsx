import React, { Fragment, useState } from "react";

export default function ErrorPage({errorLink}) {
  return (
    <Fragment>
      <div className="stack" style={{"--stacks" : "3"}}>
        <img
          id="404"
          src={errorLink}
          alt="image of Cashflow Academy's slogan"
          style={{ width: "40%", height: "80%", margin: "0 auto", "--index" : "0" }}
        />
        <img
          id="404"
          src={errorLink}
          alt="image of Cashflow Academy's slogan"
          style={{ width: "40%", height: "80%", margin: "0 auto", "--index" : "1" }}
        />
        <img
          id="404"
          src={errorLink}
          alt="image of Cashflow Academy's slogan"
          style={{ width: "40%", height: "80%", margin: "0 auto", "--index" : "2" }}
        />
      </div>
    </Fragment>
  );
}
