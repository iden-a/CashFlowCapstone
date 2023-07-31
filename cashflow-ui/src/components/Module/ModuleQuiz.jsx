import React, { useState , useRef} from 'react';
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
  Button
} from '@chakra-ui/react';
import Slider from 'react-slick';
import moduleQuiz from '../../../../cashflow-api/modules/modulequiz.json';
import apiClient from "../../services/apiClient";
import NotQuite from '../Fail/NotQuite';
import Failure from '../Fail/Failure';
import GoodJob from '../Success/GoodJob'
import Complete from '../Success/Complete'



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

function Quiz({ module_name, slider, setAppState, isFinished, setIsFinished, score, setScore }) {
  const quiz_data = moduleQuiz[module_name] || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showGoodJob, setShowGoodJob] = useState(false);
  const [showNotQuite, setShowNotQuite] = useState(false);

  const handleNext = (isAnswerCorrect) => {
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
      setShowGoodJob(true); // Show the GoodJob component\
      console.log("Good Job!")
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next question
      // console.log(showGoodJob, showNotQuite)
    } else {
      setShowNotQuite(true); // Show the NotQuite component
      console.log("Not Quite!")
      // console.log(showGoodJob, showNotQuite)
    }

  };

  const handleNextClick = () => {
    if (showGoodJob && !showNotQuite) {
      // If the GoodJob component is shown, proceed to the next question
      setShowGoodJob(false); // Hide the GoodJob component
      // setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next question
      console.log("Next question")
    } else if (showNotQuite) {
      // If the NotQuite component is shown, proceed to the next question
      setShowNotQuite(false); // Hide the NotQuite component
      // setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next question
      console.log("Next question")
    }

  };
  console.log(showGoodJob && !showNotQuite)
  return (
    <Slider {...slider} >
      {quiz_data.questions?.map((question, index) => (
        <Box
        key={index}
        height={'6xl'}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        left={`${index * 100}%`}
        >
          {currentIndex === index ? (
            <>
              <Question question={question} onNext={handleNext} index={index} currentIndex={currentIndex} />
            </>
          ) : (
            <>
              {(showGoodJob && !showNotQuite) ? (
                <>
                <GoodJob onNextClick={handleNextClick} />
                </>
              ) : (
                showNotQuite && <NotQuite onNextClick ={handleNextClick} />
              )}
            </>
          )}
        </Box>
      ))}
    </Slider>
  )}

function Question({ question, onNext , index, currentIndex}) {
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
  console.log("QUESTION #", index, currentIndex)
  console.log(question)
  return (
    <Box>
      <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
        <Box fontWeight="bold" color={'var(--midnight)'} mb={4} fontSize={'xl'}>
          {scenario}
        </Box>
        <RadioGroup onChange={handleAnswerSelect} value={selectedOption}>
          <Stack spacing={3} color={'var(--midnight)'}>
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
          transform={'translate(0%, -50%)'}
          zIndex={2}
          mt={8}
          icon={<Image src="/next.png" maxH={'120px'} />}
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
}


export default function ModuleQuiz({appState, setAppState, module_name}) {
  const [quizInfo, setQuizInfo] = useState({
    topic: "",
    points: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if ( quizInfo.topic && quizInfo.points ) {
      try {
        const token = localStorage.getItem("CashFlow_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.quiz({
          id: appState.user.id,
          topic: quizInfo.topic,
          points: quizInfo.points,
        });
        console.log(data);
        onQuizFinish(score);
        setIsFinished(true);

      setAppState((prevState) => ({
        ...prevState,
        quiz: [
          ...prevState.quiz,
          { topic: module_name, points: score }
        ],
      }));
      } catch (err) {
        console.log(err);
      }
      setquizInfo((prevState) => ({
        ...prevState,
        topic: "",
        points: 0,
      }));    }
    setIsLoading(false);
  }


  
  const [slider, setSlider] = useState(settings);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
      position={'relative'}
      overflow="scroll"  // Add this line to enable scrolling when slides exceed container's visible area
    >
        {/* <Image src='/marcus.png' position={'absolute'} top={'25px'} ml={'200px'} zIndex={'1'} /> */}
          
          <Box position={'relative'} height={'900px'} width={'100vh'} overflow={'hidden'} borderRadius={'3xl'} backgroundColor={'var(--lightblue)'}>
        
          <Quiz
            module_name={module_name}
            slider={slider}
            setAppState={setAppState}
            isFinished={isFinished}
            setIsFinished={setIsFinished}
            score={score}
            setScore={setScore}
          />

      </Box>
    </Box>

    </>
  );
}
