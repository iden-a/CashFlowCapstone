import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Image,
  Text
} from '@chakra-ui/react';
import Slider from 'react-slick';
import modulesInfo from '../../../../cashflow-api/modules/modulesInfo.json';
import Cashbot from '../Cashbot/Cashbot'

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
export default function ModuleInfo({module_name}) {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  // Loads info from specified module
  const moduleDataArray = modulesInfo[`${module_name}`];

  return (
    <>
    <Heading display={'flex'} justifyContent={'center'} >{moduleDataArray.title}</Heading>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Box>
      <Image src='marcus.png' position={'absolute'} top={'25px'} ml={'200px'} zIndex={'1'} />
      <Box position={'relative'} height={'800px'} width={'1500px'} overflow={'scroll'} borderRadius={'3xl'} backgroundColor={'var(--lightblue)'}>
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          icon={<Image src="/back.png" maxH={'120px'} />}
          onClick={() => slider?.slickPrev()}
        />
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          icon={<Image src="/next.png" maxH={'120px'} />}
          onClick={() => slider?.slickNext()}
        />
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {moduleDataArray.sections.map((moduleData, index) => (
          <Box
            key={index}
            height={'6xl'}
            position="absolute"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            left={`${index * 100}%`}
          >
            <Container size="container.lg" height="600px" pt={'20px'}>
              <Heading
                textAlign={'center'}
                mt={'180px'}
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                color="var(--midnight)"
              >
                {moduleData.title}
              </Heading>
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                top="50%"
                transform="translate(0, -50%)"
                
              >
                <Box w={'1000px'} display={'contents'}>
                  {/* Displays information stored in json file  */}
                {moduleData.content.map((line, idx) => (
                      <Text key={idx} fontWeight={'bold'} color={'var(--midnight)'} >
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
      {/* <Cashbot /> */}
    </Box>

    </>
  );
}
