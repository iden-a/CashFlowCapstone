"use client";

import { Image, Box, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ModuleInfo from "../Module/ModuleInfo";
import { useState } from "react";
import Footer from "../App/Footer";
import CashBot from "../Cashbot/Cashbot";

export default function Dashboard({ appState, cashBotLink }) {
  // TODO: Separate beginner & intermediate dashboard
  let dashboard = [];

  if (appState.user.status === "Beginner")
    dashboard = ["bank-acct", "credit-cards", "debt"];
  else if (appState.user.status === "Intermediate")
    dashboard = ["hysavings", "cdsavings", "roth", "401k"];

  return (
    <>
      <Box height={"100vh"}>
        <Box display={"flex"} justifyContent={"center"} height={"50vh"}>
          {dashboard.map((img) => (
            <Box>
              <Link to={`/${img}`}>
                <Image boxSize={300} key={img} src={`${img}.png`}></Image>
              </Link>
            </Box>
          ))}
          <CashBot cashBotLink={cashBotLink} />
        </Box>
        <Box height={"50vh"}>
          <Center>
            <Image src="cashflowcloud.png" marginTop={"-10%"} />
          </Center>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
