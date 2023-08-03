import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Text,
  Image,
  Flex,
  useMediaQuery
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function Failure(module_name) {
  const [media] = useMediaQuery("(max-width: 1000px)");  
    const navigate = useNavigate();
    console.log(module_name.module_name)
    function handleRestart() {
      location.reload()
    }
    function handleExit() {
      navigate('/')
    }
    return (
    <Flex
      position="absolute"
      width={'100%'}
      flexDirection={`${media ? ("column") : ("row")}`} 
      height={'70vh'}
      top={'25%'}
      zIndex={'10'}
    >
      <Image 
      src='/gary.png' 
      position="absolute"
      top="-60%"
      ml="25%"
      display={'flex'}
      alignContent={'center'}
      width={`${media ? ("0%") : ("50%")}`}
      zIndex="1"
      />
      <Flex
            borderRadius={"3xl"}
            width={'100%'} 
            color={"var(--midnight)"}
            position={'absolute'}
            backgroundColor={'var(--lightblue)'}
          >
        <Box margin={'10%'}> 
        <Text 
              display={"flex"} 
              justifyContent={"center"}
              textAlign={'center'} 
              fontWeight={'bold'}
              pt={'10%'}
              fontSize={{ base: "20px", md: "40px", lg: "60px", xl: "80px" }}
              >
                YOU GOT THIS, TRY AGAIN!
                </Text>
                <Text 
               display={"flex"} 
               fontWeight={'bold'}
               justifyContent={"center"} 
               textAlign={'center'}
               fontSize={{ base: "15px", md: "20px", lg: "30px", xl: "40px" }}
               >
                YOU HAVE NOT EARNED ENOUGH POINTS TO COMPLETE THIS MODULE. TRY ASKING CASHBOT FOR MORE HELP!
                </Text>
        {/* Menu Icon */}
        <Flex >
        <IconButton
          aria-label="menu"
          variant="ghost"
          transform="translate(0%, -50%)"
          mt={'20%'}
          ml={'-10%'}
          icon={<Image src="/menu.png" 
          width={'70%'} />}
         onClick={handleExit}
        />
        {/* Start Icon */}
        <IconButton
          aria-label="start"
          variant="ghost"
          mt={'19%'}
          left={`${media ? ("0%") : ("20%")}`}
          transform="translate(0%, -50%)"
          icon={<Image src="/start.png" 
          width={'75%'} />}
          onClick={handleRestart}
        />
        </Flex>
        </Box>
        </Flex>
    </Flex>
  );

}