import React from "react";
import { Flex, IconButton, Box, Text, Image, useMediaQuery } from "@chakra-ui/react";

export default function GoodJob({ onNextClick }) {
  const [media] = useMediaQuery("(max-width: 1000px)");  

  return (
    <>
      <Flex
        position="absolute"
        width={`${media ? ("70%") : ("100%")}`} 
        flexDirection={`${media ? ("column") : ("row")}`} 
        alignContent={'center'}
        height={'70vh'}
        top={'25%'}
      >
          <Image
            src="/tiffany.png"
            position="absolute"
            top="-50%"
            ml="30%"
            display={'flex'}
            alignContent={'center'}
            width={`${media ? ("0%") : ("40%")}`}
            zIndex="1"
          />
            <Flex
            borderRadius={"3xl"}
            width={`${media ? ("130%") : ("100%")}`} 
            color={"var(--midnight)"}
            position={'absolute'} 
            >
              <Box
            margin={'10%'}
            >
              <Text 
              display={"flex"} 
              justifyContent={"center"} 
              fontWeight={'bold'}
              pt={'15%'}
              fontSize={{ base: "20px", md: "40px", lg: "60px", xl: "80px" }}              
              >
                GOOD JOB!
              </Text>
              <Text 
              display={"flex"} 
              fontWeight={'bold'}
              justifyContent={"center"} 
              textAlign={'center'}
              fontSize={{ base: "15px", md: "20px", lg: "30px", xl: "40px" }}
              >
                YOU HAVE EARNED 100 POINTS. KEEP UP THE GREAT WORK!
              </Text>
              {/* Next Icon */}
              <IconButton
                aria-label="right-arrow"
                variant="ghost"
                display={'flex'}
                left={'45%'}
                transform="translate(0%, -50%)"
                zIndex={2}
                mt={50}
                icon={<Image src="/next.png" marginLeft="-70%" width="40%"  />}
                onClick={onNextClick}
              />
              </Box>
            </Flex>
          </Flex>
    </>
  );
}
