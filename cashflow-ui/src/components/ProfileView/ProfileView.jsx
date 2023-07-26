import React, { Fragment, useState } from "react";
import {
  Flex,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  Image,
  HStack,
  Wrap,
  WrapItem,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Select,
  Spacer,
  Checkbox,
  Text,
  Textarea,
  Container,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export default function ProfileView({appState, setAppState}) {
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
        ></Box>
        <Avatar
          marginTop={"-850px"}
          marginLeft={"43%"}
          justifyContent={"center"}
          width={"250px"}
          height={"250px"}
          size={"sm"}
          src={
            appState.user.image_url
              ? appState.user.image_url
               : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          }
        />
        <Flex>
          <Heading
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            fontSize={"200%"}
            marginTop={"-32%"}
            marginBottom={"10px"}
            marginLeft={"35%"}
          >
            Username: {appState.user.image_url}
          </Heading>
          <Heading
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            fontSize={"200%"}
            marginTop={"-32%"}
            marginBottom={"10px"}
            marginLeft={"20%"}
          >
           Points: {appState.user.total_points}
          </Heading>
        </Flex>
        <Heading
          color={useColorModeValue("var(--grey)", "var(--midnight)")}
          fontSize={"200%"}
          textAlign={"center"}
          marginTop={"-20%"}
          marginBottom={"10px"}
        >
          Completed Modules
        </Heading>
        <Box
          backgroundColor={"white"}
          maxHeight={"100px"}
          maxWidth={"100px"}
        ></Box>
        <Container backgroundColor={"white"}></Container>
      </Box>
    </Fragment>
  );
}
