import React, { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Image,
  useColorModeValue,
  Text,
  Flex,
  Center,
  useMediaQuery
} from "@chakra-ui/react";
import Slider from "react-slick";
import Cashbot from "../Cashbot/Cashbot";

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

// TODO: pass in specific module here
export default function ModuleInfo({
  module_data,
  num_pages,
  infoPage,
  setInfoPage,
  cashBotLink,
}) {
  const [imgMedia] = useMediaQuery("(max-height: 800px)");  
  const [imgMedia2] = useMediaQuery("(min-height: 1250px)");  
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "70%", md: "70%" });
  const side = useBreakpointValue({ base: "0%", md: "20%" });
  // Loads info from specified module

  console.log(imgMedia)
  console.log(imgMedia2)
  const handleNext = () => {
    if (infoPage < num_pages) setInfoPage(infoPage + 1);
    slider?.slickNext();
  };

  const handleBack = () => {
    if (infoPage > 0) setInfoPage(infoPage - 1);
    slider?.slickPrev();
  };

  return (
    <>
      <Heading textAlign={"center"} display={"flex"} justifyContent={"center"}>
        {module_data.title}
      </Heading>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box
        width="100%"
        height={'100vh'}
        >
          <Center>
          <Image
            src="/marcus.png"
            position={"absolute"}
            top={imgMedia2 ? "0vh" : (imgMedia ? "15vh" : "5vh")}
            width={"50%"}
            height={"32%"}
            objectFit={"contain"}
            // bottom={`${imgMedia2 ? ("56%") : ("53%")}`}
            zIndex={"1"}
            // width={`${imgMedia ? ("0%") : ("30%")}`}
          />
          </Center>
          <Center>
          <Box
          paddingTop={"3%"}
            width={'60%'}
            height={'80vh'}
            overflowX={"hidden"}
            overflowY={"scroll"}
            borderRadius={"3xl"}
            mt={'10%'}
            bg={useColorModeValue("var(--darkblue)", "var(--lightblue)")}
          >
            
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {module_data.sections.map((moduleData, index) => (
                <Box
                  key={index}
                  height={"auto"}
                  position="absolute"
                  left={`${index * 100}%`}
                >
                  <Container
                    marginTop={"-6vh"}
                    width={"100%"}
                    marginBottom={"10%"}
                    size="container.lg"
                    height="auto"
                  >
                    <Heading
                      textAlign={"center"}
                      mt={"180px"}
                      fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                      color={useColorModeValue("var(--grey)", "var(--midnight)")}
                    >
                      {moduleData.title}
                    </Heading>
                    <Stack
                      height={"auto"}
                      spacing={6}
                      w={"full"}
                      maxW={"lg"}
                      top="50%"
                      
                    >
                      <Box height={"auto"} display={"contents"}  >
                        {/* Displays information stored in json file  */}
                        {moduleData.content.map((line, idx) => (
                          <Text
                            key={idx}
                            fontSize={{ base: "l", md: "xl", lg: "2xl" }}
                            fontWeight={"bold"}
                            color={useColorModeValue("var(--grey)", "var(--midnight)")}
                          >
                            {line}
                          </Text>
                        ))}
                      </Box>
                    </Stack>
                  </Container>
                </Box>
              ))}
            </Slider>
            <Flex zIndex={100} bg='yellow'>
            {/* Left Icon */}
            <IconButton
              aria-label="left-arrow"
              variant="ghost"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              icon={<Image src="/back.png" maxH={"120px"} />}
              onClick={handleBack}
            />
            {/* Right Icon */}
            <IconButton
              aria-label="right-arrow"
              variant="ghost"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              icon={<Image src="/next.png" maxH={"120px"} />}
              onClick={handleNext}
            />
            </Flex>
          </Box>
          </Center>
        </Box>
      </Flex>
      <Cashbot cashBotLink={cashBotLink} />
    </>
  );
}
