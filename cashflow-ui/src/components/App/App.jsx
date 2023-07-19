import { ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import AboutGrid from '../AboutGrid/AboutGrid';
import CashBot from '../Cashbot/Cashbot';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
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
          <Route path="/login" element={<></>} />
          <Route path="/profile" element={<></>} />
          <Route path="/goals" element={<></>} />
          <Route path="/dashboard" element={<></>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
