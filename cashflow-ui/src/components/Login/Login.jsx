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
  Link,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Puff } from "react-loading-icons";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./Login.css";

export default function Login({ setAppState }) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  console.log(emailPattern.test(userInfo.email))
  const navigateTo = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (emailPattern.test(userInfo.email)) {
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
          apiClient.setToken(data.token);
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
                  emailPattern.test(userInfo.email) ? null : (
                    <Text as="span"
                      style={{
                        color: "red",
                        marginBottom: "-40px",
                        marginLeft: "57.5%",
                      }}
                    >
                      Invalid email input.
                    </Text>
                  )}
                  {loginError !== "" && (
                    <Text as="span" style={{ color: "red", marginBottom: "-40px", marginLeft: "34%" }}>
                      {loginError}
                    </Text>
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
                      borderColor: "var(--grey)",
                      border: "1px solid"
                    }}
                  >
                    {isLoading ? (
                      <Puff stroke="var(--grey)" speed={1.25} />
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
    </Fragment>
  );
}
