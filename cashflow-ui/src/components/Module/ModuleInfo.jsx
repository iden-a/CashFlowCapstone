import React, { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Image,
  Text,
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
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  // Loads info from specified module

  const handleNext = () => {
    if (infoPage < num_pages) setInfoPage(infoPage + 1);
    console.log(infoPage);
    slider?.slickNext();
  };

  const handleBack = () => {
    if (infoPage > 0) setInfoPage(infoPage - 1);
    console.log(infoPage);
    slider?.slickPrev();
  };

  return (
    <>
      <Heading display={"flex"} justifyContent={"center"}>
        {module_data.title}
      </Heading>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box>
          <Image
            src="/marcus.png"
            position={"absolute"}
            top={"1vh"}
            ml={"15%"}
            zIndex={"1"}
          />
          <Box
            // position={"relative"}
            height={"600px"}
            width={"100vh"}
            overflowX={"hidden"}
            overflowY={"scroll"}
            borderRadius={"3xl"}
            bg={"var(--lightblue)"}
          >
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
                      color="var(--midnight)"
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
                      <Box height={"auto"} display={"contents"}>
                        {/* Displays information stored in json file  */}
                        {moduleData.content.map((line, idx) => (
                          <Text
                            key={idx}
                            fontSize={"120%"}
                            fontWeight={"bold"}
                            color={"var(--midnight)"}
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
          </Box>
        </Box>
        <Cashbot cashBotLink={cashBotLink} />
      </Box>
    </>
  );
}
