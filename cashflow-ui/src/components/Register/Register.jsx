import * as React from "react";
import { useState, Fragment } from "react";
import apiClient from "../../services/apiClient";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Puff } from "react-loading-icons";
// import { useNavigate } from "react-router-dom";
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

export default function Register({ appState, setAppState }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //   const navigateTo = useNavigate();
  console.log(userInfo);
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      userInfo.email &&
      userInfo.username &&
      userInfo.first_name &&
      userInfo.first_name &&
      userInfo.last_name &&
      userInfo.password &&
      userInfo.password.length >= 8 &&
      userInfo.password === userInfo.confirmPassword &&
      userInfo.email.includes("@")
    ) {
      setIsLoading(true);
      try {
        const { data, error, message } = await apiClient.register({
          email: userInfo.email,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
        });
        if (error) {
          setRegisterError("Something went wrong with registration.");
          setIsLoading(false);
          return;
        }

        console.log(data);
        if (data) {
          setRegisterError("");
          setAppState((prevState) => ({
            ...prevState,
            user: data.user,
            isAuthenticated: true,
            goals: data.goals,
            quizzes: data.quizzes,
          }));
          localStorage.setItem("CashFlow_Token", data.token);
          apiClient.setToken(data.token);
          // navigateTo("/");
        } else {
          setRegisterError("Something went wrong with registration.");
        }
      } catch (err) {
        console.log(err);
        setRegisterError("Something went wrong with registration.");
      }

      setUserInfo((prevState) => ({
        ...prevState,
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
      }));
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <Box marginTop={"5%"} height={"100vh"} color={"white"}>
        <Heading
          textAlign={"center"}
          width={"50%"}
          fontSize={"300%"}
          margin={"0 auto"}
          color={useColorModeValue("var(--midnight)", "var(--grey)")}
        >
          Welcome To CashFlow Academy!
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
                  textAlign={"center"}
                >
                  Become a CashFlow Academic!
                </Heading>
              </Stack>
              <Stack spacing={4}>
                <Flex>
                  <FormControl id="first_name" isRequired>
                    <Input
                      padding={"7px"}
                      borderRadius={"5px"}
                      width={"85%"}
                      type="text"
                      color={"var(--midnight)"}
                      marginLeft={"9%"}
                      bg={"var(--grey)"}
                      placeholder="First Name"
                      _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                      value={userInfo.first_name}
                      onChange={(e) =>
                        setUserInfo((prevState) => ({
                          ...prevState,
                          first_name: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormControl id="last_name" isRequired>
                    <Input
                      padding={"7px"}
                      borderRadius={"5px"}
                      width={"85%"}
                      type="text"
                      color={"var(--midnight)"}
                      marginLeft={"5%"}
                      bg={"var(--grey)"}
                      placeholder="Last Name"
                      _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                      value={userInfo.last_name}
                      onChange={(e) =>
                        setUserInfo((prevState) => ({
                          ...prevState,
                          last_name: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Flex>
                <FormControl id="username" isRequired>
                  <Input
                    padding={"7px"}
                    borderRadius={"5px"}
                    width={"90%"}
                    type="username"
                    color={"var(--midnight)"}
                    marginLeft={"5%"}
                    bg={"var(--grey)"}
                    placeholder="Username"
                    _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                    value={userInfo.username}
                    onChange={(e) =>
                      setUserInfo((prevState) => ({
                        ...prevState,
                        username: e.target.value,
                      }))
                    }
                  />
                </FormControl>
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

                <FormControl id="confirmPassword" isRequired>
                  <InputGroup justifyContent={"center"}>
                    <Input
                      borderRadius={"5px"}
                      padding={"7px"}
                      marginTop={"7px"}
                      width={"90%"}
                      bg={"var(--grey)"}
                      color={"var(--midnight)"}
                      placeholder="Confirm Password"
                      _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                      value={userInfo.confirmPassword}
                      onChange={(e) =>
                        setUserInfo((prevState) => ({
                          ...prevState,
                          confirmPassword: e.target.value,
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
                        marginBottom: "-30px",
                        marginLeft: "37%",
                      }}
                    >
                      Your email must have an '@'.
                    </span>
                  )}
                  {userInfo.password !== userInfo.confirmPassword && (
                    <>
                      <span
                        style={{
                          color: "red",
                          marginLeft: "38%",
                          marginBottom: "-95px",
                        }}
                      >
                        Passwords do not match.
                      </span>{" "}
                      <br />
                    </>
                  )}
                  {userInfo.password.length >= 8 ||
                  userInfo.password.length === 0 ? null : (
                    <>
                      <span
                        style={{
                          color: "red",
                          marginLeft: "38%",
                        }}
                      >
                        Your password must have a minimum of 8 characters.
                      </span>
                    </>
                  )}

                  {registerError !== "" && (
                    <span style={{ color: "red", marginLeft: "34%" }}>
                      {registerError}
                    </span>
                  )}
                  <Button
                    onClick={handleSubmit}
                    width={"60%"}
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
                      <span>Create Account</span>
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
                Have an account?
                <Link to="/login" style={{ color: "var(--blue)" }}>
                  <em> Sign In</em>
                </Link>
              </Text>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Fragment>
  );
}
