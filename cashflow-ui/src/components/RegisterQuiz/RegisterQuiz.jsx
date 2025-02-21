import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  RadioGroup,
  useColorModeValue,
  Radio,
  Flex,
  InputGroup,
  InputLeftAddon,
  Heading,
  Image,
  Input,
  Button,
  useMediaQuery,
  Center,
} from "@chakra-ui/react";
import ErrorPage from "../ErrorPage/ErrorPage";
import apiClient from "../../services/apiClient";

export default function RegisterQuiz({ setAppState, appState, errorLink}) {
  const [quizInfo, setQuizInfo] = useState({
    imageUrl: "",
    scale: 1,
    levelOfDebt: "",
    finanGoal: "",
  });
  const [media, inputMedia, headingMedia, heading2Media] = useMediaQuery([
    "(max-width: 500px)",
    "(max-width: 388px)",
    "(max-width: 450px)",
    "(max-width: 1351px)",
  ]);
  const navigateTo = useNavigate();

  const formChange = (event) => {
    setQuizInfo((prevState) => ({
      ...prevState,
      scale: event.target.value,
    }));
  };

  function calculateFinancialLiteracyLevel(
    stabilityRating,
    debtRating,
    financialGoal
  ) {
    let stabilityScore = 0;
    let debtScore = 0;
    let goalScore = 0;

    // Assign scores based on stability rating
    switch (stabilityRating) {
      case "1":
      case "2":
      case "3":
        stabilityScore = 1; // Low financial stability
        break;
      case "4":
      case "5":
      case "6":
        stabilityScore = 2; // Moderate financial stability
        break;
      case "7":
      case "8":
      case "9":
      case "10":
        stabilityScore = 3; // High financial stability
        break;
      default:
        break;
    }

    // Assign scores based on debt rating
    switch (debtRating) {
      case "No debt":
        debtScore = 3; // No debt - high financial literacy in this area
        break;
      case "Minimal debt":
        debtScore = 2; // Minimal debt - moderate financial literacy in this area
        break;
      case "Moderate debt":
        debtScore = 1; // Moderate debt - low financial literacy in this area
        break;
      case "High debt":
        debtScore = 1; // High debt - low financial literacy in this area
        break;
      default:
        break;
    }

    // Assign scores based on financial goal
    switch (financialGoal) {
      case "Saving for a specific purchase or expense":
        goalScore = 2; // Intermediate financial literacy
        break;
      case "Building an emergency fund":
        goalScore = 3; // High financial literacy
        break;
      case "Paying off debt":
        goalScore = 2; // Intermediate financial literacy
        break;
      case "Investing for retirement":
        goalScore = 3; // High financial literacy
        break;
      case "Saving for education":
        goalScore = 3; // Intermediate financial literacy
        break;
      default:
        break;
    }
    // Calculate overall financial literacy level
    const totalScore = stabilityScore + debtScore + goalScore;
    const averageScore = totalScore / 3;
    // Determine the financial literacy level
    if (averageScore >= 2.5) {
      return "Intermediate";
    } else {
      return "Beginner";
    }
  }

  const handleStartLearning = async (e) => {
    e.preventDefault();
    if (
      quizInfo.scale <= 10 &&
      quizInfo.scale >= 1 &&
      quizInfo.levelOfDebt &&
      quizInfo.finanGoal
    ) {
      try {
        const { data, error, message } = await apiClient.imageStats({
          id: appState.user.id,
          image_url: quizInfo.imageUrl,
          status: calculateFinancialLiteracyLevel(
            quizInfo.scale,
            quizInfo.levelOfDebt,
            quizInfo.finanGoal
          ),
        });
        if (error) {
          return;
        }
        if (data) {
          const updatedUser = { ...appState.user };

          updatedUser.image_url = data.image_url;
          updatedUser.status = data.status;
          updatedUser.quiztaken = data.quiztaken;

          setAppState({ ...appState, user: updatedUser });
        }
      } catch (err) {
        console.log(err);
      }
      navigateTo("/");
    }
  };

  return (
    <Fragment>
      {appState.user.quiztaken === "N" ? (
        <Box marginBottom={"5%"}>
          <Stack bg={useColorModeValue("var(--grey)", "var(--midnight)")}>
            <Heading
              as="h3"
              size={media ? "md" : "lg"}
              marginLeft={heading2Media ? "35vw" : "39vw"}
              position={"relative"}
              top={headingMedia ? "1.5rem" : "3rem"}
              color={useColorModeValue("var(--midnight)", "var(--grey)")}
            >
              Let’s Examine Your Financial Goals...
            </Heading>
          </Stack>
          <Box
            maxWidth={"720px"}
            minHeight={"80vh"}
            maxHeight={"auto"}
            color={"white"}
            margin={"0 auto"}
            bg={useColorModeValue("var(--darkblue)", "var(--lightblue)")}
            borderRadius={"40px"}
          >
            <Image
              textAlign={"center"}
              width={"22rem"}
              height={"22rem"}
              objectFit={"cover"}
              position={"absolute"}
              top={"52px"}
              marginLeft={"-70px"}
              src="/registerguy.png"
            ></Image>
            <FormControl position={"relative"} top={"70px"}>
              <FormLabel
                fontWeight={"bold"}
                marginTop={"10%"}
                position={"relative"}
                top={"90px"}
                marginLeft={media ? "25px" : "50px"}
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {" "}
                1. On a scale of 1-10, how would you rate your current financial
                stability? <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <NumberInput
                color={"black"}
                position={"relative"}
                defaultValue={0}
                min={1}
                max={10}
                value={quizInfo.scale}
                onChange={(value) => formChange({ target: { value } })}
                top={"90px"}
                width={"50%"}
                marginLeft={media ? "25px" : "50px"}
                borderRadius={"20px"}
                marginBottom={inputMedia ? "40px" : null}
                bg={"var(--grey)"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl
              as="fieldset"
              marginTop={"10%"}
              position={"relative"}
              top={"70px"}
            >
              <FormLabel
                as="legend"
                fontWeight={"bold"}
                marginLeft={media ? "25px" : "50px"}
                position={"relative"}
                top={"50px"}
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {" "}
                2. How would you rate your current level of debt?{" "}
                <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <RadioGroup defaultValue="Question2">
                <Stack
                  spacing="24px"
                  direction={"column"}
                  marginLeft={media ? "25px" : "50px"}
                  position={"relative"}
                  top={"50px"}
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                >
                  <Radio
                    border={"1px solid white"}
                    value={"No debt"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        levelOfDebt: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    No debt{" "}
                  </Radio>
                  <Radio
                    border={"1px solid white"}
                    value={"Minimal debt"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        levelOfDebt: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    Minimal debt (e.g., student loans, small credit card
                    balance){" "}
                  </Radio>
                  <Radio
                    border={"1px solid white"}
                    value={"Moderate debt"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        levelOfDebt: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    Moderate debt (e.g., mortgage, car loan, significant credit
                    card balance){" "}
                  </Radio>
                  <Radio
                    border={"1px solid white"}
                    value={"High debt"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        levelOfDebt: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    High debt (e.g., multiple loans, large credit card balances){" "}
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl
              as="fieldset"
              marginTop={"10%"}
              position={"relative"}
              top={"50px"}
            >
              <FormLabel
                as="legend"
                fontWeight={"bold"}
                marginLeft={media ? "25px" : "50px"}
                position={"relative"}
                top={"50px"}
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {" "}
                3. What is your primary financial goal/objective?{" "}
                <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <RadioGroup
                defaultValue="Question3"
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                <Stack
                  spacing="24px"
                  direction={"column"}
                  marginLeft={media ? "25px" : "50px"}
                  position={"relative"}
                  top={"50px"}
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                >
                  <Radio
                    border={"1px solid white"}
                    value={"Saving for a specific purchase or expense"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        finanGoal: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    Saving for a specific purchase or expense{" "}
                  </Radio>
                  <Radio
                    border={"1px solid white"}
                    value={"Building an emergency fund"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        finanGoal: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    Building an emergency fund{" "}
                  </Radio>
                  <Radio
                    border={"1px solid white"}
                    value={"Paying off debt"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        finanGoal: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    Paying off debt (e.g., credit cards, loans){" "}
                  </Radio>
                  <Radio
                    border={"1px solid white"}
                    value={"Investing for retirement"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        finanGoal: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    Investing for retirement{" "}
                  </Radio>
                  <Radio
                    border={"1px solid white"}
                    value={"Saving for education"}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        finanGoal: e.target.value,
                      }))
                    }
                  >
                    {" "}
                    Saving for education (e.g., college fund){" "}
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Box margin={"0 auto"}>
              <FormControl
                encType="multipart/form-data"
                marginTop={"10%"}
                position={"relative"}
                top={"50px"}
              >
                <FormLabel
                  htmlFor="image"
                  fontWeight={"bold"}
                  marginLeft={media ? "25px" : "50px"}
                  position={"relative"}
                  top={"20px"}
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                >
                  {" "}
                  Lastly, would you like to add a profile photo?
                </FormLabel>
                <InputGroup
                  position={"relative"}
                  top={"20px"}
                  width={"80%"}
                  marginLeft={media ? "25px" : "50px"}
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                  size="sm"
                  border={"solid 2px white"}
                >
                  <InputLeftAddon
                    color={"var(--midnight)"}
                    children="https://"
                  />
                  <Input
                    _placeholder={{ opacity: 1, color: "grey" }}
                    placeholder="My profile picture"
                    value={quizInfo.imageUrl}
                    onChange={(e) =>
                      setQuizInfo((prevState) => ({
                        ...prevState,
                        imageUrl: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </FormControl>
              {quizInfo.imageUrl && (
                <Image
                  src={quizInfo.imageUrl}
                  alt="Uploaded preview"
                  mt={4}
                  filter={"drop-shadow(8px 5px 4px var(--blue))"}
                  borderRadius={"50%"}
                  backgroundColor={"white"}
                  mx={"auto"}
                  width={"100px"}
                  height={"100px"}
                  objectFit={"cover"}
                  position={"relative"}
                  top={"60px"}
                />
              )}
            </Box>

            <Flex alignItems="center" justifyContent="center">
              <Center>
                <Button
                  onClick={handleStartLearning}
                  width={"100%"}
                  borderRadius={"20px"}
                  height={"45px"}
                  fontSize={"x-large"}
                  marginTop={"110px"}
                  marginBottom={"20px"}
                  bg={"var(--midnight)"}
                  color={"var(--lightblue)"}
                  _hover={{
                    bg: "var(--darkblue)",
                  }}
                >
                  <span>Start Learning Now!</span>
                </Button>
              </Center>
            </Flex>
          </Box>
        </Box>
      ) : (
        <ErrorPage errorLink={errorLink} />
      )}
    </Fragment>
  );
}
