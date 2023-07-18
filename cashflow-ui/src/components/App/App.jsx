import { useState } from 'react'
import './App.css'
import AboutGrid from '../AboutGrid/AboutGrid'
import CashBot from '../Cashbot/Cashbot'
import Navbar from '../Navbar/Navbar'
import { useColorModeValue } from '@chakra-ui/react'


function App() {
  // sets background color based on dark/light mode
  const bgColor = useColorModeValue('var(--grey)', 'var(--midnight)');

  return (
    <div className='app' style={{ backgroundColor: bgColor }}>
    <Navbar />
    <AboutGrid />
    <CashBot />
    </div>
  )
}

export default App
