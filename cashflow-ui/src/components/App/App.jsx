import { ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import AboutGrid from "../AboutGrid/AboutGrid";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import GoalsTracker from "../GoalsTracker/GoalsTracker";
import Home from "../Home/Home";
import ModuleInfo from "../Module/ModuleInfo";
import Dashboard from "../Dashboard/Dashboard";
import RegisterQuiz from "../RegisterQuiz/RegisterQuiz";
import Module from "../Module/Module";
import GoodJob from "../Success/GoodJob";
import NotQuite from "../Fail/NotQuite";
import Failure from "../Fail/Failure";
import ModuleQuiz from "../Module/ModuleQuiz";
import QuizPreview from "../Module/QuizPreview";
import ProfileView from "../ProfileView/ProfileView";

function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: true,
    goals: [],
    quizzes: [],
  });
  // Sets background color based on dark/light mode
  const bgColor = useColorModeValue("var(--grey)", "var(--midnight)");
  const [isLoading, setIsLoading] = useState(false);
  const [cashBotLink, setCashBotLink] = useState("");

  // Module variables
  const module_pages = [
    "bank-acct",
    "credit-cards",
    "debt",
    "hysavings",
    "cdsavings",
    "roth",
    "401k",
  ];
  const [infoPage, setInfoPage] = useState(0);

  document.documentElement.style.backgroundColor = bgColor;

  useEffect(() => {
    console.log(bgColor);
    if (bgColor === "var(--midnight)") {
      setCashBotLink("cashbot.png");
    } else {
      setCashBotLink("cashbotDark.png");
    }
  }, [bgColor]);
console.log(appState)
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("CashFlow_Token");
    apiClient.setToken(token);
    async function fetchUser() {
      if (token) {
        try {
          const { data, error, message } = await apiClient.me();
          if (error) {
            setAppState((prevState) => ({
              ...prevState,
              isAuthenticated: false,
            }));
            localStorage.setItem("CashFlow_Token", null);
            return;
          }
          setAppState((prevState) => ({
            ...prevState,
            user: data.user,
            isAuthenticated: true,
            quizzes: data.quizzes,
            goals: data.goals,
          }));
        } catch (err) {
          console.error(err);
        }
      } else {
        localStorage.setItem("CashFlow_Token", null);
      }
    }
    fetchUser().then(() => {
      setIsLoading(false);
    });
  }, [appState.isAuthenticated]);

  return (
    <div className="app" style={{ backgroundColor: bgColor }}>
      <BrowserRouter>
        <Navbar setAppState={setAppState} appState={appState} />
        <Routes>
          <Route
            path="/"
            element={
              appState.isAuthenticated ? (
                <Dashboard appState={appState} />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/about"
            element={appState.isAuthenticated ? null : <AboutGrid />}
          />
          <Route
            path="/register"
            element={
              appState.isAuthenticated ? null : (
                <Register setAppState={setAppState} />
              )
            }
          />
          <Route
            path="/login"
            element={
              appState.isAuthenticated ? null : (
                <Login setAppState={setAppState} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              appState.isAuthenticated ? (
                <ProfileView appState={appState} />
              ) : null
            }
          />
          <Route
            path="/goals"
            element={
              appState.isAuthenticated ? (
                <GoalsTracker
                  cashBotLink={cashBotLink}
                  setAppState={setAppState}
                  appState={appState}
                />
              ) : null
            }
          />
          <Route
            path="/registerquiz"
            element={
              appState.isAuthenticated ? (
                <RegisterQuiz setAppState={setAppState} appState={appState} />
              ) : null
            }
          />
          {module_pages.map((module_name) => (
            <Route
              path={`/${module_name}`}
              element={
                appState.isAuthenticated ? (
                  <Module
                    cashBotLink={cashBotLink}
                    setInfoPage={setInfoPage}
                    infoPage={infoPage}
                    module_name={module_name}
                  />
                ) : null
              }
            />
          ))}
          {module_pages.map((module_name) => (
            <Route
              path={`/${module_name}/quiz`}
              element={
                appState.isAuthenticated ? (
                  <ModuleQuiz
                    setInfoPage={setInfoPage}
                    infoPage={infoPage}
                    module_name={module_name}
                  />
                ) : null
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
