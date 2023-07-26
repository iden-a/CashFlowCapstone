import { ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import AboutGrid from '../AboutGrid/AboutGrid';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import { useState, useEffect } from 'react'
import apiClient from "../../services/apiClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from '../Register/Register'
import GoalsTracker from '../GoalsTracker/GoalsTracker'
import Home from '../Home/Home';
import ModuleInfo from '../ModuleInfo/ModuleInfo';
import Dashboard from '../Dashboard/Dashboard';
import RegisterQuiz from '../RegisterQuiz/RegisterQuiz';

function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: true,
    goals: [],
    quizzes: []
  })
  // Sets background color based on dark/light mode
  const bgColor = useColorModeValue('var(--grey)', 'var(--midnight)');
  const [isLoading, setIsLoading] = useState(false);


  const module_pages = ['bank-acct', 'credit-cards', 'debt', 'hysavings','cdsavings','roth','401k']

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
            goals: data.goals
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
    <Navbar setAppState={setAppState} appState={appState}/>
        <Routes>
          <Route path="/" element={ appState.isAuthenticated ? <Dashboard /> : <Home />} />
          <Route path="/about" element={<AboutGrid />} />
          <Route path="/register" element={<Register setAppState={setAppState}/>} />
          <Route path="/login" element={<Login setAppState={setAppState}/>} />
          <Route path="/profile" element={<></>} />
          <Route path="/goals" element={<GoalsTracker setAppState={setAppState} appState={appState}/>} />
          <Route path="/goals" element={<></>} />

          {module_pages.map((page) =>(
       <Route path={`/${page}`} element={<ModuleInfo module_name={page} /> } />
    ))}

          <Route path="/dashboard" element={<></>} />
          <Route path="/registerquiz" element={<RegisterQuiz />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
