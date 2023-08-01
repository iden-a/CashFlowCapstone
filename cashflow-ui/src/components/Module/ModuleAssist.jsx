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
}) {
  return (
    <Box
      key={index}
      height={"auto"}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position={"relative"}
      bg={"blue"}
      left={`${index * 100}%`}
    >
      {}
      {currentIndex === index ? (
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
            <>
              <GoodJob onNextClick={handleNextClick} />
            </>
          ) : (
            showNotQuite && <NotQuite onNextClick={handleNextClick} />
          )}
        </>
      )}
    </Box>
  );
}
