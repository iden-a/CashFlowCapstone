import React, { useState } from "react";
import { Box, IconButton, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function NotQuite({ onNextClick }) {
  // TODO: Take in module, question #, correct explanation, point value
  const navigate = useNavigate();

  return (
    <>
      <Box
        left={"12%"}
        position={"absolute"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="800px"
      >
        <Box mt={20}>
          <Image
            src="/gary.png"
            position="absolute"
            top="-100px"
            ml="100px"
            h={600}
            zIndex="1"
          />
          <Box
            position={"relative"}
            height={"800px"}
            width={"800px"}
            overflow={"inherit"}
            borderRadius={"3xl"}
            color={"var(--midnight)"}
            backgroundColor={"var(--lightblue)"}
          >
            {/* Start Icon */}
            <Box pt={300}>
              <Heading display={"flex"} size={"4xl"} justifyContent={"center"}>
                NOT QUITE!
              </Heading>
              {/* TODO: Insert explanation  */}
              <Heading pt={100} display={"flex"} justifyContent={"center"}>
                EXPLAIN WHY ANSWER IS INCORRECT
              </Heading>
              <IconButton
                aria-label="right-arrow"
                variant="ghost"
                position="relative"
                transform="translate(0%, -50%)"
                zIndex={2}
                mt={50}
                icon={<Image src="/next.png" maxH="120px" />}
                onClick={onNextClick}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
