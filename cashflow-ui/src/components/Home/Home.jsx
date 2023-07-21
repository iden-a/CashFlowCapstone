import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Parallax } from 'react-scroll-parallax';


// import {Parallax, ParallaxLayer} from "@react-spring/parallax"
export default function Home() {

        // return (
            
        // )
      
  return (
    // <div>
    // <Parallax pages={1}>
    //     <ParallaxLayer>
    //    <h1 style={{color: "black"}}>HI</h1>
    //     </ParallaxLayer>
    // </Parallax>
    // </div>
    <Fragment>
      <div className="Home">
        <div className="logo">
          <div className="logoCont">
            <img
              id="logo"
              src="cashflowLogo.png"
              alt="Cashflow Academy's logo"
            />
            <img
              id="slogan"
              src="slogan.png"
              alt="image of Cashflow Academy's slogan"
            />
            <img
              id="homeChar1"
              src="homeChar1.png"
              alt="Image of guy sitting down looking at papers"
            />
          </div>
        </div>
        <div className="homeContainers1">
            <p className="homeText">
              Whether you're a beginner just learning to save...
            </p>
            <img
              className="homeImages"
              src="homeChar2.png"
              alt="image of girl with money surrounding her"
            />
          </div>
          <div className="homeContainers2">
            <p className="homeText">
              ...or a professional in your early career...
            </p>
            <img
              className="homeImages"
              src="homeChar3.png"
              alt="image of girl with money surrounding her"
            />
          </div>
          <div className="homeContainers3">
            <p style={{ color: "var(--midnight)" }} className="homeText">
              ...or just looking for some solid financial advice.
            </p>
            <img
              className="homeImages"
              src="homeChar4.png"
              alt="image of family thinking"
            />
          </div>
          <div className="homeContainers4">
            <p
              style={{ color: "var(--midnight)", marginBottom: "1%" }}
              className="homeText"
            >
              As a CashFlow Academic, we've got you covered!
            </p>
            <img
              className="homeImages"
              src="tiffany.png"
              alt="image of tifanny"
            />
            <p style={{ color: "#0D99FF" }} className="homeText">
              <Link to="/register">Sign Up Today!</Link>
            </p>
          </div>
      </div>
    </Fragment>
  );
}
