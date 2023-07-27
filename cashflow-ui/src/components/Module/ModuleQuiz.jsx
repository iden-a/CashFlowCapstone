import React, { useState } from 'react';
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
  Text
} from '@chakra-ui/react';
import Slider from 'react-slick';
import moduleQuiz from '../../../../cashflow-api/modules/modulequiz.json';


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
export default function ModuleQuiz({module_name}) {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });


  function Quiz({ module_name }) {
    const quiz_data = moduleQuiz[module_name]; // Retrieve quiz_data for the specific module
    return (
      <Stack spacing={6}>
        {quiz_data.questions?.map((question, index) => (
          <Question key={index} question={question} />
        ))}
      </Stack>
    );
  }
  
  function Question({ question }) {
    const { scenario, options } = question;
  
    return (
      <Box>
        <FormControl as="fieldset" color={'black'}>
          <FormLabel as="legend">{scenario}</FormLabel>
          <RadioGroup>
            <Stack spacing={3}>
              {options.map((option, index) => (
                <Radio key={index}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  }
  
  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Box>
      <Image src='/marcus.png' position={'absolute'} top={'25px'} ml={'200px'} zIndex={'1'} />
      <Box position={'relative'} height={'800px'} width={'100vh'} overflow={'scroll'} borderRadius={'3xl'} backgroundColor={'var(--lightblue)'}>
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
          onClick={() => slider?.slickNext()}
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
          onClick={() => slider?.slickPrev()}
        />
        {/* Slider */}
        
        <Quiz module_name={module_name}/>


        
      </Box>
      </Box>
    </Box>

    </>
  );
}
