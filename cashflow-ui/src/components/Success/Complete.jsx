import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Heading,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function Complete() {
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
      <Image src='/tiffany.png' position={'absolute'} top={'-100px'} ml={'450px'} h={600} zIndex={'1'}/>
      <Box position={'relative'} height={'800px'} width={'1500px'} overflow={'inherit'} borderRadius={'3xl'} color={'var(--midnight)'} backgroundColor={'var(--lightblue)'}>

        {/* Menu Icon */}
        <IconButton
          aria-label="start"
          variant="ghost"
          position="absolute"
          transform={'translate(0%, -50%)'}
          zIndex={2}
          mt={700}
          ml={600}
          icon={<Image src="/menu.png" maxH={'300px'} />}
          onClick={handleReturn}
        />
        <Box pt={250}>
        <Heading display={'flex'} size={'4xl'} justifyContent={'center'} >CONGRATS!</Heading>
        <Heading pt={100} display={'flex'} justifyContent={'center'} >YOU HAVE COMPLETED THIS LEARNING MODULE.</Heading>
        <Heading pt={100} display={'flex'} justifyContent={'center'} >YOU ARE ONE STEP CLOSER TO REACHING FINANCIAL FREEDOM!</Heading>
        </Box>
   
      </Box>
      </Box>
    </Box>

    </>
  );

}