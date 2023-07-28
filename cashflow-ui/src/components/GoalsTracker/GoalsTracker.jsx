import React, { Fragment, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
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
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import "./GoalsTracker.css";
import apiClient from "../../services/apiClient";
import { Puff } from "react-loading-icons";
import GoalTile from "../GoalTile/GoalTile";
import CashBot from "../Cashbot/Cashbot";

export default function GoalsTracker({ setAppState, appState }) {
  const [goalInfo, setGoalInfo] = useState({
    goal: "",
    start_date: "",
    end_date: "",
    category: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [goalForm, setGoalForm] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  // const [checked, setChecked] = useState(false)

  console.log();
  console.log(goalInfo);
  // console.log(isChecked)
  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };

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
        const token = localStorage.getItem("LifeTracker_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.goals({
          id: appState.user.id,
          goal: goalInfo.goal,
          start_date: goalInfo.start_date,
          end_date: goalInfo.end_date,
          category: goalInfo.category,
          description: goalInfo.description,
        });
        console.log(data);
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
      <Box marginBottom={"5%"} marginTop={"5%"} height={"100vh"} color={"white"}>
        <Box
          zIndex={"-1"}
          mx={"auto"}
          marginTop={"11%"}
          rounded={"lg"}
          minHeight={"70vh"}
          maxHeight={"auto"}
          borderRadius={"40px"}
          width={"120vh"}
          bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
          boxShadow={"dark-lg"}
          p={8}
        >
          <Image
            marginTop={"-300px"}
            mx={"auto"}
            width={"500px"}
            height={"500px"}
            src="goalGuy.png"
          />
          <Heading
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            fontSize={"300%"}
            textAlign={"center"}
            marginTop={"-100px"}
            marginBottom={"10px"}
          >
            CashFlow Goals
          </Heading>
          <Button
            onClick={handleRecord}
            width={"25%"}
            borderRadius={"20px"}
            height={"45px"}
            fontSize={"130%"}
            marginLeft={"38%"}
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
              <span>Add New Goal</span>
            )}
          </Button>
          {goalForm ? (
            <Box
              margin={"0 auto"}
              rounded={"lg"}
              marginTop={"10px"}
              max-height={"40vh"}
              borderRadius={"40px"}
              width={"40vh"}
              bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
              boxShadow={"dark-lg"}
              p={8}
            >
              <Stack align={"center"}>
                <Heading
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                  fontSize={"150%"}
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
                <Flex margin={"0 auto"} width={"90%"}>
                  <Button
                    onClick={handleRecord}
                    width={"40%"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={"130%"}
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
                    width={"40%"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={"130%"}
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
                      <span>Create Goal</span>
                    )}
                  </Button>
                </Flex>
              </Stack>
            </Box>
          ) : (
            <Flex
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
              marginTop={"20px"}
              direction={"row"}
              // bg={"yellow"}
              spacing={"2%"}
            >
              {appState.goals.map((userGoal) => {
                return <GoalTile userGoal={userGoal} />;
              })}
            </Flex>
          )}
        </Box>
      </Box>
    </Fragment>
  );
}
