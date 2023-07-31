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
import { useNavigate } from 'react-router';
export default function QuizPreview({module_name}) {
    // TODO: counter for module info pages 
    console.log(module_name)
    const page_count = 0
    const navigate = useNavigate()
    const handleBegin= () => {
        navigate(`/${module_name}/quiz`)
      }
      
    const handleBack = () => {
        navigate(`/${module_name}`)
        window.location.reload(false)
      }

    return (
        // TODO: Ternary operator for if the module info is complete
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Box>
      <Image src='/tiffany.png' position={'absolute'} top={'-50px'} ml={'500px'} h={500} zIndex={'1'}/>
      <Box position={'relative'} height={'800px'} width={'1500px'} overflow={'inherit'} borderRadius={'3xl'} color={'var(--midnight)'} backgroundColor={'var(--lightblue)'}>

        

        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          transform={'translate(0%, -50%)'}
          zIndex={2}
          mt={700}
          icon={<Image src="/back.png" maxH={'200px'} />}
          onClick={handleBack}
        />
        {/* Start Icon */}
        <IconButton
          aria-label="start"
          variant="ghost"
          position="absolute"
          transform={'translate(0%, -50%)'}
          zIndex={2}
          mt={700}
          ml={1200}
          icon={<Image src="/start.png" maxH={'300px'} />}
          onClick={handleBegin}
        />
        <Box pt={300}>
        <Heading display={'flex'} size={'4xl'} justifyContent={'center'} >READY TO TEST YOUR KNOWLEDGE?</Heading>
        <Heading pt={100} display={'flex'} justifyContent={'center'} >PRESS START TO BEGIN YOUR CASHFLOW QUIZ!</Heading>
        </Box>
   
      </Box>
      </Box>
    </Box>

    </>
  );

}