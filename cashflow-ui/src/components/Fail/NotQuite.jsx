import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Heading,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function NotQuite({module_name}) {
    // TODO: Take in module, question #, correct explanation, point value
    const navigate = useNavigate()
    const handleReturn = () => {
        navigate('/')
      }
    
    return (
        
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Box mt={20}>
      <Image src='/gary.png' position={'absolute'} top={'-50px'} ml={'500px'} h={500} zIndex={'1'}/>
      <Box position={'relative'} height={'800px'} width={'1500px'} overflow={'inherit'} borderRadius={'3xl'} color={'var(--midnight)'} backgroundColor={'var(--lightblue)'}>

        {/* Start Icon */}
        <IconButton
          aria-label="start"
          variant="ghost"
          position="absolute"
          transform={'translate(0%, -50%)'}
          zIndex={2}
          mt={700}
          ml={1200}
          icon={<Image src="/next.png" maxH={'300px'} />}
          //onClick={}  next question
        />
        <Box pt={300}>
        <Heading display={'flex'} size={'4xl'} justifyContent={'center'} >NOT QUITE!</Heading>
        {/* TODO: Insert explanation  */}
        <Heading pt={100} display={'flex'} justifyContent={'center'} >EXPLAIN WHY ANSWER IS INCORRECT</Heading>
=        </Box>
   
      </Box>
      </Box>
    </Box>

    </>
  );

}