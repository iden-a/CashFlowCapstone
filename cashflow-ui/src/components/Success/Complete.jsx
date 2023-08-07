import React, { useState } from "react";
import {
  Flex,
  Box,
  IconButton,
  Text,
  Image,
  useMediaQuery,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import apiClient from "../../services/apiClient";

export default function Complete({
  setQuizInfo,
  setAppState,
  appState,
  score,
  quizInfo,
  module_name,
}) {
  const navigate = useNavigate(); // Hook to get the navigation function
  const [isLoading, setIsLoading] = useState(false);
  const [media] = useMediaQuery("(max-width: 1000px)");

  // updates total points of user in appState
  async function updateUserTotalPoints(userId, total_points) {
    try {
      const token = localStorage.getItem("CashFlow_Token");
      apiClient.setToken(token);
      const { data } = await apiClient.total_points({
        id: userId,
        updateValue: total_points,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // when quiz is complete, quizzes are added to appState
  const handleFinish = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("CashFlow_Token");
      apiClient.setToken(token);

      const { data, error, message } = await apiClient.quiz({
        id: appState.user.id,
        topic: module_name,
        points: score,
      });

      const pointdata = await updateUserTotalPoints(appState.user.id, score);
      const updatedUser = { ...appState.user };
      updatedUser.total_points = pointdata.total_points;

      setAppState((prevState) => ({
        ...prevState,
        quizzes: [
          ...prevState.quizzes,
          { topic: data.topic, points: data.points },
        ],
        user: updatedUser,
      }));

      navigate("/"); // After successful submission, navigate back to dashboard
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Flex
      position="absolute"
      width={"100%"}
      flexDirection={`${media ? "column" : "row"}`}
      height={"70vh"}
      top={"25%"}
      zIndex={"10"}
    >
      <Image
        src="/tiffany.png"
        position="absolute"
        top="-50%"
        ml="30%"
        display={"flex"}
        alignContent={"center"}
        width={`${media ? "0%" : "40%"}`}
        zIndex="1"
      />
      <Flex
        borderRadius={"3xl"}
        width={"100%"}
        color={useColorModeValue("var(--grey)", "var(--midnight)")}
        position={"absolute"}
        backgroundColor={useColorModeValue(
          "var(--darkblue)",
          "var(--lightblue)"
        )}
      >
        <Box margin={"10%"}>
          <Text
            display={"flex"}
            justifyContent={"center"}
            textAlign={"center"}
            fontWeight={"bold"}
            pt={"10%"}
            fontSize={{ base: "20px", md: "40px", lg: "60px", xl: "80px" }}
          >
            CONGRATS!
          </Text>
          <Text
            display={"flex"}
            fontWeight={"bold"}
            justifyContent={"center"}
            textAlign={"center"}
            fontSize={{ base: "15px", md: "20px", lg: "30px", xl: "40px" }}
          >
            YOU HAVE COMPLETED THIS LEARNING MODULE, EARNING {score} POINTS. YOU
            ARE ONE STEP CLOSER TO REACHING FINANCIAL FREEDOM!
          </Text>
          {/* Menu Icon */}
          <IconButton
            aria-label="menu"
            variant="ghost"
            transform="translate(0%, -50%)"
            mt={"20%"}
            left={`${media ? "0%" : "22%"}`}
            icon={<Image src="/menu.png" width={"70%"} />}
            onClick={handleFinish}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
