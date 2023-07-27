'use client'

import { Image, Box } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import ModuleInfo from '../Module/ModuleInfo';
import { useState } from 'react';

export default function Dashboard({appState}) {
  // TODO: Separate beginner & intermediate dashboard 
  let dashboard = []
    if(appState.user.status === 'beginner')
      dashboard = ['bank-acct', 'credit-cards', 'debt']
    else if (appState.user.status === 'intermediate')
      dashboard = ['hysavings','cdsavings','roth','401k']

  return (
    <Box display={'flex'} justifyContent={'center'} height={'100vh'}>
    {dashboard.map((img) =>(
      <Box>
        <Link to={`/${img}`} >
        <Image boxSize={300} key={img} src={`${img}.png`}></Image>
        </Link>
        </Box>
    ))}
    </Box>
  )
}