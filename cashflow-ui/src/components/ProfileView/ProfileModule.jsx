import React, { Fragment, useState } from "react";
import { Flex, Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export default function ProfileModule({ userQuiz }) {
  let wordImage = userQuiz.topic.charAt(0).toUpperCase();
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
        <Box
          margin={"0 auto"}
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
        >
          {wordImage}
        </Box>
        <Flex>
          <Text
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            fontWeight={"bold"}
            margin={"0 auto"}
            padding={"5px"}
            fontSize={"x-large"}
          >
            {userQuiz.topic}
          </Text>
        </Flex>
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
              Points
            </Text>
            <Text
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
              fontWeight={"bold"}
              textAlign={"center"}
              marginTop={"5px"}
              padding={"3px"}
              fontSize={"large"}
            >
              {userQuiz.points}
            </Text>
          </Flex>
        </HStack>
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
              Completion Date
            </Text>
            <Text
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
              fontWeight={"bold"}
              textAlign={"center"}
              marginTop={"5px"}
              padding={"3px"}
              fontSize={"large"}
            >
              {userQuiz.created_at}
            </Text>
          </Flex>
        </HStack>
        <Text
          color={useColorModeValue("var(--grey)", "var(--midnight)")}
          textAlign={"center"}
          marginTop={"5px"}
          padding={"3px"}
          fontSize={"large"}
        >
          Congratulations 🎉 You've completed {userQuiz.topic}!
        </Text>
      </Box>
    </Fragment>
  );
}
