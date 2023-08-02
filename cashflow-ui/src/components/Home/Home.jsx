import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const navigateTo = useNavigate()
  function handleRegister () {
    console.log("clicked")
    navigateTo("/register")
  }
  function handleClick(e) {
    e.preventDefault();
    const scrollToOptions = {
      top: document.body.scrollHeight,
      behavior: "smooth",
    };
    window.scrollTo(scrollToOptions);
  }

  const handleIntersection = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Fragment>
      <div className="Home">
        <div className="logoCont">
          <div className="stack" style={{ "--stacks": "3" }}>
            <img
              id="logo"
              onClick={handleClick}
              style={{ "--index": "0" }}
              src="cashflowLogo.png"
              alt="Cashflow Academy's logo"
            />
            <img
              id="logo"
              onClick={handleClick}
              style={{ "--index": "1" }}
              src="cashflowLogo.png"
              alt="Cashflow Academy's logo"
            />
            <img
              id="logo"
              onClick={handleClick}
              style={{ "--index": "2" }}
              src="cashflowLogo.png"
              alt="Cashflow Academy's logo"
            />
          </div>
          <img
            id="slogan"
            src="slogan.png"
            alt="image of Cashflow Academy's slogan"
          />
          <div class="story">
            <div
              class="bg"
              // style={{
                // background: "url(homeChar1.png) 50% 46vh no-repeat fixed"
                // marginTop: " -40vh",
                // backgroundSize: " 60vh 60vh",
                // height: " 150vh",
                // position: "absolute",
                // width: "inherit",
                // zIndex: "10",
              // }}
            ></div>
          </div>
        </div>
        <div className="homeContainers1">
          <p className="homeText">
            Whether you're a beginner just learning to save...
          </p>
          <div class="story">
            <div
              class="bg"
              // style={{
                // background: `url("homeChar2.png") 50% 84.5% no-repeat fixed`,
                // marginTop: " -40vh",
                // backgroundSize: "60vh 60vh",
                // height: " 150vh",
                // position: "absolute",
                // width: "inherit",
                // zIndex: "10"
              // }}
            ></div>
          </div>
        </div>
        <div className="homeContainers2">
          <p className="homeText">
            ...or a professional in your early career...
          </p>
          <div class="story">
            <div
              class="bg"
              // style={{
              //   background: `url("homeChar3.png") 50% 84.5% no-repeat fixed`,
              //   marginTop: " -40vh",
              //   backgroundSize: "60vh 60vh",
              //   height: " 150vh",
              //   position: "absolute",
              //   width: "inherit",
              //   zIndex: "10"
              // }}
            ></div>
          </div>
        </div>

        <div className="homeContainers3">
          <p
            style={{ color: "var(--midnight)", zIndex: "-1" }}
            className="homeText"
          >
            ...or just looking for some solid financial advice.
          </p>
          <div class="story">
            <div
              class="bg"
              // style={{
              //   background: `url("homeChar4.png") 50% 84.5% no-repeat fixed`,
              //   marginTop: " -40vh",
              //   backgroundSize: "60vh 60vh",
              //   height: " 150vh",
              //   position: "absolute",
              //   width: "inherit",
              //   zIndex: "10"
              // }}
            ></div>
          </div>
        </div>
        <div className="homeContainers4">
          <p
            style={{ color: "var(--midnight)", marginBottom: "1%" }}
            className="homeText"
          >
            As a CashFlow Academic, we've got you covered!
          </p>
          <div class="story">
            <div
              class="bg"
              // style={{
              //   background: `url("tiffany.png") 50% 65% no-repeat fixed`,
              //   marginTop: "-40vh",
              //   backgroundSize: "60vh 60vh",
              //   height: " 90vh",
              //   position: "absolute",
              //   width: "inherit",
              //   zIndex: "10"
              // }}
            ></div>
          </div>
          <p
            ref={elementRef}
            style={{ color: "#0b89e5" }}
            id={`homeText${isVisible ? "-animate" : ""}`}
          >
            <Link to={"/register"}> Sign Up Today! </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
