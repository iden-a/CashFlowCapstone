import React, { useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
export default function ModuleAssist({
  Question,
  GoodJob,
  NotQuite,
  showGoodJob,
  showNotQuite,
  question,
  index,
  currentIndex,
  handleNext,
  handleNextClick,
  setQuizInfo, 
  setAppState, 
  appState, 
  score, 
  quizInfo, 
  module_name,
  Complete,
  Failure,
  quizLength}) {
  return (
    <Box
      key={index}
      height={"auto"}
       
      pt={'20px'}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position={"relative"}
      left={`${index * 100}%`}
    >
      {currentIndex === index && currentIndex < quizLength ? (
        <>
          <Question
            question={question}
            onNext={handleNext}
            index={index}
            currentIndex={currentIndex}
          />
          {console.log(
            "This message will be logged when currentIndex === index",
            currentIndex
          )}
        </>
      ) : (
        <>
          {showGoodJob && !showNotQuite ? (
            <GoodJob onNextClick={handleNextClick} />
          ) : (
            showNotQuite && <NotQuite onNextClick={handleNextClick} />
          )}
        </>
      )}
      {currentIndex === quizLength && (
        score >= ((quizLength / 2) * 100) ? (
          <Complete setQuizInfo={setQuizInfo} setAppState={setAppState} module_name={module_name} appState={appState} score={score} quizInfo={quizInfo} />
          ) : (
          <Failure module_name={module_name} />
        )
      )}
    </Box>
  );
}

