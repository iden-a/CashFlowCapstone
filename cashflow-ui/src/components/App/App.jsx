import { ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import AboutGrid from '../AboutGrid/AboutGrid';
import CashBot from '../Cashbot/Cashbot';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import { useState, useEffect } from 'react'
import apiClient from "../../services/apiClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    goals: [],
    quizzes: []
  })
  // Sets background color based on dark/light mode
  const bgColor = useColorModeValue('var(--grey)', 'var(--midnight)');
  const [isLoading, setIsLoading] = useState(false);

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
    <Navbar/>
        <Routes>
          <Route path="/" element={<> </>} />
          <Route path="/about" element={<AboutGrid />} />
          <Route path="/register" element={<></>} />
          <Route path="/login" element={<Login setAppState={setAppState}/>} />
          <Route path="/profile" element={<></>} />
          <Route path="/goals" element={<></>} />
          <Route path="/dashboard" element={<></>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
