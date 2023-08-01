import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Heading,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import apiClient from "../../services/apiClient";


export default function Complete({ setQuizInfo, setAppState, appState, score, quizInfo, module_name }) {
  const navigate = useNavigate(); // Hook to get the navigation function
  const [isLoading, setIsLoading] = useState(false);

  async function updateUserTotalPoints(userId, total_points) {
    try {
      const token = localStorage.getItem("CashFlow_Token");
      apiClient.setToken(token);
      const { data } = await apiClient.total_points({
        id: userId,
        updateValue: total_points,
      });
      console.log("Data:", data)
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const handleFinish = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //console.log("current:" , currentTotalPoints, score)
    try {
      const token = localStorage.getItem("CashFlow_Token");
      apiClient.setToken(token);
      const { data, error, message } = await apiClient.quiz({
        id: appState.user.id,
        topic: quizInfo.topic,
        points: quizInfo.points,
      });

      const pointdata = await updateUserTotalPoints(appState.user.id, score);
      console.log("point data," , pointdata)
      const updatedUser = { ...appState.user };
      updatedUser.total_points = pointdata.total_points;

      setAppState((prevState) => ({
        ...prevState,
        quizzes: [...prevState.quizzes, { topic: module_name, points: score }],
        user: updatedUser
      }));

      navigate('/'); // After successful submission, navigate to "/"
    } catch (err) {
      console.log(err);
    }
    
    setQuizInfo((prevState) => ({
      ...prevState,
      topic: "",
      points: 0,
    }));

    setIsLoading(false);
  };

  //console.log("complete", score);

    return (
    <Box
      left={"12%"}
      position={"absolute"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="800px"
    >
      <Box mt={20}>
      <Image src='/tiffany.png' position={'absolute'} top={'-100px'} ml={'450px'} h={600} zIndex={'1'}/>
      <Box position={'relative'} height={'800px'} width={'100vh'} overflow={'inherit'} borderRadius={'3xl'} color={'var(--midnight)'} backgroundColor={'var(--lightblue)'}>

        {/* Menu Icon */}
        <IconButton
          aria-label="start"
          variant="ghost"
          position="absolute"
          transform={'translate(0%, -50%)'}
          zIndex={10}
          mt={700}
          ml={600}
          icon={<Image src="/menu.png" maxH={'300px'} />}
          onClick={handleFinish}
        />
        <Box 
        position="relative"
        height="800px"
        width="800px"
        overflow="inherit"
        borderRadius="3xl"
        color="var(--midnight)"
        backgroundColor="var(--lightblue)">
        <Heading display={'flex'} size={'4xl'} justifyContent={'center'} >CONGRATS!</Heading>
        <Heading pt={100} display={'flex'} justifyContent={'center'} >YOU HAVE COMPLETED THIS LEARNING MODULE, EARNING {score} POINTS.</Heading>
        <Heading pt={100} display={'flex'} justifyContent={'center'} >YOU ARE ONE STEP CLOSER TO REACHING FINANCIAL FREEDOM!</Heading>
        </Box>
   
      </Box>
      </Box>
    </Box>
  );

}