import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Image,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
} from "@chakra-ui/react";
import Slider from "react-slick";
import moduleQuiz from "../../../../cashflow-api/modules/modulequiz.json";
import NotQuite from "../Fail/NotQuite";
import Failure from "../Fail/Failure";
import GoodJob from "../Success/GoodJob";
import Complete from "../Success/Complete";
import ModuleAssist from "./ModuleAssist";
import { Navigate } from "react-router";

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: false,
  autoplay: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Quiz({
  module_name,
  setSlider,
  slider,
  score,
  setScore,
  setQuizInfo,
  setAppState,
  appState,
  quizInfo
}) {
  const quiz_data = moduleQuiz[module_name] || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGoodJob, setShowGoodJob] = useState(false);
  const [showNotQuite, setShowNotQuite] = useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);
  console.log("score", score);

  const handleNext = (isAnswerCorrect) => {
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 100);
      setShowGoodJob(true); // Show the GoodJob component\
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next question
    } else {
      setShowNotQuite(true); // Show the NotQuite component
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next question
    }
    
  };


  const handleNextClick = () => {
    if (currentIndex === quiz_data.questions.length) {
      // If it's the last question, show the quiz result after clicking "Next"
      setShowGoodJob(false)
      setShowNotQuite(false)
      setShowQuizResult(true);
    } else {
      if (showGoodJob && !showNotQuite) {
        // If the GoodJob component is shown, proceed to the next question
        setShowGoodJob(false); // Hide the GoodJob component
      } else if (showNotQuite) {
        // If the NotQuite component is shown, proceed to the next question
        setShowNotQuite(false); // Hide the NotQuite component
      }
      console.log("Show results? ", showQuizResult )
      slider?.slickNext();
    }
  };

  const quizLength = quiz_data.questions.length

  return (
    <>
    <Slider {...settings} ref={(slider) => setSlider(slider)}>
      {quiz_data.questions?.map((question, index) => (
        <ModuleAssist
          Question={Question}
          GoodJob={GoodJob}
          NotQuite={NotQuite}
          showGoodJob={showGoodJob}
          showNotQuite={showNotQuite}
          question={question}
          index={index}
          currentIndex={currentIndex}
          handleNext={handleNext}
          handleNextClick={handleNextClick}
          Complete={Complete}
          Failure={Failure}
          setQuizInfo={setQuizInfo} 
          setAppState={setAppState} 
          module_name={module_name} 
          appState={appState} 
          score={score} 
          quizInfo={quizInfo}
          quizLength={quizLength}
        />
      ))}
      </Slider>
      </>
  );

}

function Question({ question, onNext }) {
  const { scenario, options, answer } = question;
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle user's answer selection
  const handleAnswerSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const isAnswerCorrect = selectedOption === answer;
      onNext(isAnswerCorrect);
    } else {
      alert("Please select an answer before continuing.");
    }
  };
  return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box fontWeight="bold" color={"var(--midnight)"} mb={4} fontSize={"xl"}>
          {scenario}
        </Box>
        <RadioGroup onChange={handleAnswerSelect} value={selectedOption}>
          <Stack spacing={4} color={"var(--midnight)"}>
            {options.map((option, index) => (
              <Radio key={index} value={option}>
                {option}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="relative"
          transform={"translate(0%, -50%)"}
          zIndex={2}
          mt={8}
          icon={<Image src="/next.png" maxH={"120px"} />}
          onClick={handleSubmit}
        />
      </Box>
  );
}

export default function ModuleQuiz({ appState, setAppState, module_name }) {
  const [quizInfo, setQuizInfo] = useState({
    topic: module_name,
    points: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);

  const [slider, setSlider] = useState(null);
  
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        position={"relative"}
        overflow="scroll" // Add this line to enable scrolling when slides exceed container's visible area
      >

        <Box
          position={"relative"}
          height={"900px"}
          width={"100vh"}
          borderRadius={"3xl"}
          backgroundColor={"var(--lightblue)"}
        >
          
          <Quiz
            module_name={module_name}
            slider={slider}
            setAppState={setAppState}
            setSlider={setSlider}
            score={score}
            setScore={setScore}
            setQuizInfo={setQuizInfo}
            appState={appState}
            quizInfo={quizInfo}
          />
        </Box>


        
      </Box>
    </>
  );
}
