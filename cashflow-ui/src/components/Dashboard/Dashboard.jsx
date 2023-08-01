"use client";

import { Image, Box, useMediaQuery } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import ModuleInfo from '../Module/ModuleInfo';
import { useState } from 'react';
import CashBot from "../Cashbot/Cashbot";

export default function Dashboard({appState}) {
  // TODO: Separate beginner & intermediate dashboard 
  const [media, heightMedia] = useMediaQuery(["(max-width: 694px)", "(max-height: 840px)"])
  let dashboard = []

  if (appState.user.status === "Beginner")
    dashboard = ["bank-acct", "credit-cards", "debt"];
  else if (appState.user.status === "Intermediate")
    dashboard = ["hysavings", "cdsavings", "roth", "401k"];

  return (
    <>

<Box height={"100vh"}>
    <Box marginTop={`${heightMedia ? ("30%") : (null)}`} display={'flex'} alignItems={`${media ? ("center"): (null)}`} flexDir={`${media ? ("column") : ("row")}`} justifyContent={'center'} height={'100vh'}>
    {dashboard.map((img) =>(
      <Box>
        <Link to={`/${img}`} >
        <Image objectFit={"cover"} boxSize={300} key={img} src={`${img}.png`}></Image>
        </Link>
        </Box>
    ))}
    </Box>
     <Box height={"50vh"}>
          <Center>
            <Image src="cashflowcloud.png" marginTop={"-10%"} />
          </Center>
        </Box>
    </Box>
    </>
  );
}
