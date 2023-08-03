import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  Stack,
  Image,
  RadioGroup,
  Radio,
  Flex,
  useMediaQuery,
  useColorModeValue
} from "@chakra-ui/react";
import Slider from "react-slick";
import moduleQuiz from "../../../../cashflow-api/modules/modulequiz.json";
import NotQuite from "../Fail/NotQuite";
import Failure from "../Fail/Failure";
import GoodJob from "../Success/GoodJob";
import Complete from "../Success/Complete";
import ModuleAssist from "./ModuleAssist";

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
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        position={'absolute'}
        pt={'10%'}
      >
        <Box 
        fontWeight="bold" 
        color={useColorModeValue("var(--grey)", "var(--midnight)")}
        textAlign={'center'}
        margin={'10%'} 
        mt={'-10%'}
        // position={'absolute'}
        fontSize={{ base: "15px", md: "35px", lg: "45px", xl: "45px" }}>
          {scenario}
        </Box>
        <RadioGroup onChange={handleAnswerSelect} value={selectedOption}>
          <Stack spacing={4} color={useColorModeValue("var(--grey)", "var(--midnight)")}>
            {options.map((option, index) => (
              <Radio 
              textAlign={'center'}
              fontSize={{ base: "20px", md: "35px", lg: "45px", xl: "60px" }}      
              key={index} value={option}>
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
          mt={20}
          icon={<Image src="/next.png" maxH={"120px"} />}
          onClick={handleSubmit}
        />
      </Flex>
  );
}

export default function ModuleQuiz({ appState, setAppState, module_name }) {
  const [quizInfo, setQuizInfo] = useState({
    topic: module_name,
    points: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [media] = useMediaQuery("(max-width: 768px)");
  const [slider, setSlider] = useState(null);
  
  return (
    <>
      <Flex
        width={`${media ? ("50%") : ("50%")}`}
        justifyContent="center"
        display="contents"
        alignItems="center"
        position="relative"
        overflow="scroll" 
      >

        <Box
          position={"relative"}
          flexDirection={`${media ? ("column") : ("row")}`} 
          height={'100vh'}
          borderRadius={"3xl"}
          margin={`${media ? ('10%') : ("10%")}`}
          bg={useColorModeValue("var(--darkblue)", "var(--lightblue)")}
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


        
      </Flex>
    </>
  );
}
