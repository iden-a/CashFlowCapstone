'use client'

import { Image, Box } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import ModuleInfo from '../Module/ModuleInfo';
import { useState } from 'react';

export default function Dashboard() {
  // TODO: Separate beginner & intermediate dashboard 
    const beginnerimg = ['bank-acct', 'credit-cards', 'debt']
    const interimg = ['hysavings','cdsavings','roth','401k']
  return (
    <Box display={'flex'} justifyContent={'center'} height={'100vh'}>
    {beginnerimg.map((img) =>(
      <Box>
        <Link to={`/${img}`} >
        <Image boxSize={300} key={img} src={`${img}.png`}></Image>
        </Link>
        </Box>
    ))}
    </Box>
  )
}