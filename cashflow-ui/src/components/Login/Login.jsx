import React, { Fragment, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  Image,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Puff } from "react-loading-icons";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import CashBot from "../Cashbot/Cashbot";
import "./Login.css";

export default function Login({ setAppState }) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigateTo = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (userInfo.email.includes("@")) {
      setIsLoading(true);
      try {
        const { data, error, message } = await apiClient.login({
          email: userInfo.email,
          password: userInfo.password,
        });
        if (error) {
          setLoginError("Invalid email and/or password.");
          setIsLoading(false);
          return;
        }
        console.log(data);
        if (data) {
          setLoginError("");
          setAppState((prevState) => ({
            ...prevState,
            user: data.user,
            isAuthenticated: true,
            quizzes: data.quizzes,
            goals: data.goals,
          }));

          localStorage.setItem("CashFlow_Token", data.token);
          navigateTo("/");
        } else {
          setLoginError("Invalid email and/or password.");
        }
      } catch (err) {
        console.log(err);
        setLoginError("Invalid email and/or password.");
      }

      setUserInfo((prevState) => ({
        ...prevState,
        email: "",
        password: "",
      }));
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <Box marginTop={"5%"} height={"100vh"} color={"white"}>
        <Heading
          textAlign={"center"}
          width={"40%"}
          fontSize={"300%"}
          margin={"0 auto"}
          color={useColorModeValue("var(--midnight)", "var(--grey)")}
        >
          Welcome Back Academic
        </Heading>
        <Image
          marginTop={"-80px"}
          textAlign={"center"}
          marginLeft={"auto"}
          marginRight={"auto"}
          width={"500px"}
          height={"500px"}
          src="/tiffany.png"
        ></Image>

        <Flex
          minH={"20vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("var(--grey)", "var(--midnight)")}
        >
          <Stack
            bg={useColorModeValue("var(--grey)", "var(--midnight)")}
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
          >
            <Box
              marginTop={"-80px"}
              rounded={"lg"}
              max-height={"40vh"}
              borderRadius={"40px"}
              width={"40vh"}
              bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack align={"center"}>
                <Heading
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                  fontSize={"150%"}
                  marginTop={"10px"}
                  marginBottom={"20px"}
                >
                  Let’s Keep That Cash Flowin’
                </Heading>
              </Stack>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <Input
                    padding={"7px"}
                    borderRadius={"5px"}
                    width={"90%"}
                    type="email"
                    color={"var(--midnight)"}
                    marginLeft={"5%"}
                    bg={"var(--grey)"}
                    placeholder="Email"
                    _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <InputGroup justifyContent={"center"}>
                    <Input
                      borderRadius={"5px"}
                      padding={"7px"}
                      marginTop={"7px"}
                      width={"90%"}
                      bg={"var(--grey)"}
                      color={"var(--midnight)"}
                      placeholder="Password"
                      _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                      value={userInfo.password}
                      onChange={(e) =>
                        setUserInfo((prevState) => ({
                          ...prevState,
                          password: e.target.value,
                        }))
                      }
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        paddingTop={"10px"}
                        marginLeft={"100%"}
                        color={useColorModeValue(
                          "var(--grey)",
                          "var(--midnight)"
                        )}
                        fontSize={"x-large"}
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10}>
                  {userInfo.email.length === 0 ||
                  userInfo.email.includes("@") ? null : (
                    <span
                      style={{
                        color: "red",
                        marginBottom: "-45px",
                        marginLeft: "37%",
                      }}
                    >
                      Your email must have an '@'.
                    </span>
                  )}
                  {loginError !== "" && (
                    <span style={{ color: "red", marginLeft: "34%" }}>
                      {loginError}
                    </span>
                  )}
                  <Button
                    onClick={handleSubmit}
                    width={"40%"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={"x-large"}
                    margin={"0 auto"}
                    bg={"var(--midnight)"}
                    color={"var(--lightblue)"}
                    _hover={{
                      bg: "var(--darkblue)",
                    }}
                  >
                    {isLoading ? (
                      <Puff stroke="var(--midnight)" speed={1.25} />
                    ) : (
                      <span>Login</span>
                    )}
                  </Button>
                </Stack>
              </Stack>
              <Text
                marginTop={"5px"}
                textAlign={"center"}
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
                fontSize={"x-large"}
              >
                New to Us?
                <Link to="/register" style={{ color: "var(--blue)" }}>
                  <em> Register</em>
                </Link>
              </Text>
            </Box>
          </Stack>
        </Flex>
      </Box>
      <CashBot />
    </Fragment>
  );
}
