import React, { Fragment, useState } from "react";
import {
  Flex,
  Box,
  Avatar,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import GoalTile from "../GoalTile/GoalTile";

export default function ProfileView({ appState, setAppState }) {
  return (
    <Fragment>
      <Box marginTop={"5%"} height={"100vh"} color={"white"}>
        <Box
          zIndex={"-1"}
          marginTop={"11%"}
          marginLeft={"16%"}
          rounded={"lg"}
          minHeight={"70vh"}
          maxHeight={"auto"}
          borderRadius={"40px"}
          width={"120vh"}
          bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
          boxShadow={"dark-lg"}
          p={8}
        >
          <Center>
            <Avatar
              width={"250px"}
              height={"250px"}
              size={"sm"}
              src={
                appState.user.image_url !== ""
                  ? appState.user.image_url
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              }
            />
          </Center>
          <Flex>
            <Flex margin={"0 auto"} flex={"wrap"} display={"column"}>
              <Heading
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {appState.user.username}
              </Heading>
              <Text color={useColorModeValue("var(--grey)", "var(--midnight)")}>
                Username
              </Text>
            </Flex>
            <Flex margin={"0 auto"} flex={"wrap"} display={"column"}>
              <Heading
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {appState.user.total_points}
              </Heading>
              <Text color={useColorModeValue("var(--grey)", "var(--midnight)")}>
                Points
              </Text>
            </Flex>

            <Flex margin={"0 auto"} flex={"wrap"} display={"column"}>
              <Heading
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {appState.user.status}
              </Heading>
              <Text color={useColorModeValue("var(--grey)", "var(--midnight)")}>
                Status
              </Text>
            </Flex>
          </Flex>
          <Flex
            flexWrap={"wrap"}
            justifyContent={"space-evenly"}
            marginTop={"20px"}
            direction={"row"}
            spacing={"2%"}
          >
            {appState.goals.map((userGoal) => {
              return <GoalTile userGoal={userGoal} />;
            })}
          </Flex>
        </Box>
      </Box>
    </Fragment>
  );
}
