import React, { Fragment, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  Image,
  Center,
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
  useColorModeValue,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import apiClient from "../../services/apiClient";
import { Puff } from "react-loading-icons";
import GoalTile from "../GoalTile/GoalTile";

export default function GoalsTracker({ setAppState, appState, cashBotLink }) {
  const [goalInfo, setGoalInfo] = useState({
    goal: "",
    start_date: "",
    end_date: "",
    category: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [goalForm, setGoalForm] = useState(false);
  const [media, moreMedia] = useMediaQuery([
    "(max-width: 746px)",
    "(max-width: 416px)",
  ]);
  

  function handleRecord(e) {
    e.preventDefault();
    setGoalForm(!goalForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (
      goalInfo.goal &&
      goalInfo.start_date &&
      goalInfo.end_date &&
      goalInfo.category &&
      goalInfo.description
    ) {
      try {
        const token = localStorage.getItem("CashFlow_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.goals({
          id: appState.user.id,
          goal: goalInfo.goal,
          start_date: goalInfo.start_date,
          end_date: goalInfo.end_date,
          category: goalInfo.category,
          description: goalInfo.description,
        });
        setAppState((prevState) => ({
          ...prevState,
          goals: [data.goal, ...prevState.goals],
        }));
      } catch (err) {
        console.log(err);
      }
      setGoalInfo((prevState) => ({
        ...prevState,
        goal: "",
        start_date: "",
        end_date: "",
        category: "",
        description: "",
      }));
      setGoalForm(!goalForm);
    }
    setIsLoading(false);
  }
  return (
    <Fragment>
      <Box
        marginBottom={"5%"}
        marginTop={"5%"}
        height={"100vh"}
        color={"white"}
      >
        <Box
          zIndex={"-1"}
          mx={"auto"}
          marginTop={moreMedia ? "20vh" : "30vh"}
          rounded={"lg"}
          minHeight={"70vh"}
          maxHeight={"auto"}
          borderRadius={"40px"}
          width={media ? "80vw" : "90vw"}
          maxWidth={"120vh"}
          bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
          boxShadow={"dark-lg"}
          p={8}
        >
          <Image
            marginTop={media ? "-200px" : "-300px"}
            mx={"auto"}
            width={media ? "300px" : "500px"}
            height={media ? "300px" : "500px"}
            objectFit={"cover"}
            src="goalGuy.png"
          />
          <Heading
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            fontSize={media ? "170%" : "300%"}
            textAlign={"center"}
            marginTop={media ? "-60px" : "-100px"}
            marginBottom={"10px"}
          >
            CashFlow Goals
          </Heading>
          <Center>
          <Button
            onClick={handleRecord}
            width={"fit-content"}
            borderRadius={"20px"}
            height={"45px"}
            fontSize={media ? "90%" : "130%"}
            display={"inline-block"}
            bg={"var(--midnight)"}
            color={"var(--lightblue)"}
            _hover={{
              borderColor: "var(--grey)",
              border: "1px solid",
            }}
          >
            {isLoading ? (
              <Puff stroke="var(--grey)" speed={1.25} />
            ) : (
              <span >Add New Goal</span>
            )}
          </Button>
          </Center>
          {goalForm ? (
            <Center>
            <Box
              margin={"0 auto"}
              border={`1px solid ${useColorModeValue(
                "var(--grey)",
                "var(--lightblue)"
              )}`}
              rounded={"lg"}
              marginTop={"10px"}
              max-height={"40vh"}
              borderRadius={"40px"}
              width={media ? "27vh" : "40vh"}
              bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
              boxShadow={"dark-lg"}
              p={8}
            >
              <Stack align={"center"}>
                <Heading
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                  fontSize={media ? "100%" : "150%"}
                  marginTop={"10px"}
                  marginBottom={"20px"}
                >
                  Add a New CashFlow Goal!
                </Heading>
              </Stack>
              <FormControl id="goal" isRequired>
                <Input
                  borderRadius={"5px"}
                  width={"90%"}
                  type="email"
                  color={"var(--midnight)"}
                  marginLeft={"5%"}
                  bg={"var(--grey)"}
                  placeholder="Goal"
                  _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                  value={goalInfo.goal}
                  onChange={(e) =>
                    setGoalInfo((prevState) => ({
                      ...prevState,
                      goal: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl id="start_date" isRequired>
                <InputGroup justifyContent={"center"}>
                  <Input
                    borderRadius={"5px"}
                    marginTop={"7px"}
                    width={"90%"}
                    bg={"var(--grey)"}
                    onFocus={() => {
                      const x = document.querySelector("#start_date");
                      x.type = "date";
                    }}
                    onBlur={() => {
                      const x = document.querySelector("#start_date");
                      x.type = "text";
                    }}
                    color={"var(--midnight)"}
                    placeholder="Start Date"
                    _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                    value={goalInfo.start_date}
                    onChange={(e) =>
                      setGoalInfo((prevState) => ({
                        ...prevState,
                        start_date: e.target.value,
                      }))
                    }
                    type={"text"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="end_date" isRequired>
                <InputGroup justifyContent={"center"}>
                  <Input
                    borderRadius={"5px"}
                    marginTop={"7px"}
                    width={"90%"}
                    bg={"var(--grey)"}
                    color={"var(--midnight)"}
                    placeholder="End Date"
                    onFocus={() => {
                      const x = document.querySelector("#end_date");
                      x.type = "date";
                    }}
                    onBlur={() => {
                      const x = document.querySelector("#end_date");
                      x.type = "text";
                    }}
                    _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                    value={goalInfo.end_date}
                    onChange={(e) =>
                      setGoalInfo((prevState) => ({
                        ...prevState,
                        end_date: e.target.value,
                      }))
                    }
                    type={"text"}
                  />
                </InputGroup>
              </FormControl>

              <Select
                marginTop={"7px"}
                borderRadius={"5px"}
                width={"90%"}
                type="text"
                color={"var(--midnight)"}
                marginLeft={"5%"}
                bg={"var(--grey)"}
                placeholder="Category -- Select an Option --"
                value={goalInfo.category}
                onChange={(e) =>
                  setGoalInfo((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }))
                }
              >
                <option value="Savings">Savings</option>
                <option value="Investing">Investing</option>
                <option value="Debt">Debt</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </Select>
              <FormControl id="description" isRequired>
                <Textarea
                  marginTop={"7px"}
                  borderRadius={"5px"}
                  height={"150px"}
                  maxHeight={"200px"}
                  width={"90%"}
                  maxWidth={"90%"}
                  marginBottom={"10px"}
                  type="text"
                  color={"var(--midnight)"}
                  marginLeft={"5%"}
                  bg={"var(--grey)"}
                  _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                  value={goalInfo.description}
                  onChange={(e) =>
                    setGoalInfo((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Description"
                />
              </FormControl>
              <Stack spacing={10}>
                <Flex display={"row"} margin={"0 auto"} width={"90%"} textAlign={"center"}>
                  <Button
                    onClick={handleRecord}
                    width={"fit-content"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={moreMedia ? "90%" :"130%"}
                    margin={"0 auto"}
                    bg={"var(--midnight)"}
                    color={"var(--lightblue)"}
                    _hover={{
                      borderColor: "var(--grey)",
                      border: "1px solid",
                    }}
                  >
                    {isLoading ? (
                      <Puff stroke="var(--grey)" speed={1.25} />
                    ) : (
                      <span>Cancel</span>
                    )}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    width={"fit-content"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={moreMedia ? "90%" :"130%"}
                    margin={"0 auto"}
                    bg={"var(--midnight)"}
                    color={"var(--lightblue)"}
                    _hover={{
                      borderColor: "var(--grey)",
                      border: "1px solid",
                    }}
                    marginLeft={"10px"}

                  >
                    {isLoading ? (
                      <Puff stroke="var(--grey)" speed={1.25} />
                    ) : (
                      <span>Create Goal</span>
                    )}
                  </Button>
                </Flex>
              </Stack>
            </Box>
            </Center>
          ) : (
            <Flex
              flexWrap={"wrap"}
              justifyContent={media ? "space-between" : "space-evenly"}
              marginTop={"20px"}
              direction={media ? "column" : "row"}
              spacing={"2%"}
            >
              {appState.goals.map((userGoal, ind) => {
                return (
                  userGoal.status === "In progress" && (
                    <GoalTile
                      ind={ind}
                      setAppState={setAppState}
                      appState={appState}
                      userGoal={userGoal}
                    />
                  )
                );
              })}
            </Flex>
          )}
        </Box>
      </Box>
    </Fragment>
  );
}
