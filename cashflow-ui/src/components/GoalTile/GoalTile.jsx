import React, { Fragment, useState, useEffect } from "react";
import {
  Flex,
  Box,
  HStack,
  Checkbox,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import apiClient from "../../services/apiClient";

export default function GoalTile({ setAppState, appState, userGoal, ind }) {
  const [isChecked, setIsChecked] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const handleCheckboxChange = () => {
    console.log(isChecked)
    console.log("kjshdkfjhskldhblfaihbfliuahbfluahbrf")
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (appState.goals[ind].status === "Accomplished") {
      setIsChecked(true);
    }
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 5000);

    // Clear the timer if the component unmounts before 5 seconds
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (isChecked === true) {
      setShowGif(true);
    }
    async function accompGoal() {
      try {
        const token = localStorage.getItem("CashFlow_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.goalStat({
          id: userGoal.id,
        });
        const updatedAppState = appState.goals;
        updatedAppState[ind].status = data.status;
        setAppState({ ...appState, goals: updatedAppState });
      } catch (err) {
        console.log(err);
      }
    }
    if (isChecked === true) {
      accompGoal();
    }
  }, [isChecked]);
  let wordImage = userGoal.category.charAt(0).toUpperCase();

  const createdAtUTC = new Date(userGoal.start_date);
  const createdAtUTCend = new Date(userGoal.end_date);
  const createdAtLocal = createdAtUTC.toLocaleString();
  const createdAtLocalend = createdAtUTCend.toLocaleString();
  const splitCreatedAtLocal = createdAtLocal.split(" ");
  const splitCreatedAtLocalend = createdAtLocalend.split(" ");

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", {
      month: "short",
    });
    const day = date.getDate();
    const year = date.getFullYear();
    const suffix = getOrdinalSuffix(day);

    return `${month} ${day}${suffix} ${year}`;
  };

  const dayStart = formatDate(splitCreatedAtLocal[0]);
  const dayEnd = formatDate(splitCreatedAtLocalend[0]);
  return (
    <Fragment>
      <Box
        zIndex={"1"}
        position={"relative"}
        marginBottom={"15px"}
        height={"420px"}
        overflowY={"scroll"}
        overflowX={"hidden"}
        border={"solid 5px white"}
        borderRadius={"30px"}
        width={"30%"}
        padding={"15px"}
      >
        {showGif && (
          <Image
            position={"absolute"}
            width={"100%"}
            height={"420px"}
            marginTop={"-15px"}
            marginLeft={"-15px"}
            objectFit={"cover"}
            src="https://i.pinimg.com/originals/97/8d/48/978d481bf5fd81da9837c8a1f1c7b70d.gif"
            zIndex={2}
          />
        )}
        <Box
          display="inline-block"
          objectFit={"cover"}
          bg={"var(--midnight)"}
          color={"var(--stark)"}
          width={"70px"}
          height={"60px"}
          borderRadius={"50%"}
          boxShadow={`7px 7px 7px ${useColorModeValue(
            "var(--darkblue)",
            "var(--lightblue)"
          )}`}
          paddingTop={"2%"}
          paddingLeft={"8%"}
          fontSize={"xx-large"}
          fontWeight={"bold"}
          marginRight={"18%"}
        >
          {wordImage}
        </Box>
        <Text
          display={"inline-block"}
          color={"white"}
          width={"130px"}
          textAlign={"center"}
          padding={"3px"}
          backgroundColor={"var(--darkblue)"}
          fontSize={"x-large"}
          as={"span"}
        >
          {userGoal.category}
        </Text>
        <br />
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{
            width: "15px",
            height:"15px",
            border: `${useColorModeValue("var(--grey)", "var(--midnight)")}`,
            color: `${useColorModeValue("var(--grey)", "var(--midnight)")}`,
            marginTop: "10px",
          }}
        />
        <span style={{color: "var(--midnight)"}}>&nbsp; Goal Accomplished?</span>
        {/* <Checkbox
          color={useColorModeValue("var(--grey)", "var(--midnight)")}
          marginTop={"10px"}
          checked={isChecked}
          onChange={handleCheckboxChange}
          colorScheme="var(--darkblue)"
          border={useColorModeValue("var(--grey)", "var(--midnight)")}
        >
          Goal Accomplished?
        </Checkbox> */}
        <Text
          color={useColorModeValue("var(--grey)", "var(--midnight)")}
          fontWeight={"bold"}
          textAlign={"center"}
          marginTop={"5px"}
          padding={"3px"}
          fontSize={"x-large"}
        >
          {userGoal.goal}
        </Text>
        <HStack
          justifyContent={"space-around"}
          width={"100%"}
          marginTop={"5px"}
          textAlign={"center"}
        >
          <Flex flexDirection={"column"}>
            <Text
              fontWeight={"bold"}
              color={"var(--blue)"}
              fontSize={"x-large"}
            >
              Start Date
            </Text>
            <Text
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
              fontWeight={"bold"}
              textAlign={"center"}
              marginTop={"5px"}
              padding={"3px"}
              fontSize={"large"}
            >
              {dayStart}
            </Text>
          </Flex>
          <Flex flexDirection={"column"}>
            <Text
              fontWeight={"bold"}
              color={"var(--blue)"}
              fontSize={"x-large"}
            >
              End Date
            </Text>
            <Text
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
              fontWeight={"bold"}
              textAlign={"center"}
              marginTop={"5px"}
              padding={"3px"}
              fontSize={"large"}
            >
              {dayEnd}
            </Text>
          </Flex>
        </HStack>
        <Text
          fontSize={"x-large"}
          color={useColorModeValue("var(--grey)", "var(--midnight)")}
        >
          Description:
        </Text>
        <Text
          color={"white"}
          height={"100px"}
          maxHeight={"150px"}
          borderRadius={"20px"}
          overflow={"scroll"}
          fontWeight={"bold"}
          marginBottom={"15px"}
          marginTop={"8px"}
          padding={"15px"}
          fontSize={"medium"}
          bg={"var(--blue)"}
        >
          {userGoal.description}
        </Text>
      </Box>
    </Fragment>
  );
}
