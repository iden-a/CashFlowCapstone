import { ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import AboutGrid from '../AboutGrid/AboutGrid';
import CashBot from '../Cashbot/Cashbot';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react'
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
