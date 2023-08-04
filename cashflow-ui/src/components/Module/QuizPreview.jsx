import React, { useState } from 'react';
import {
  Flex,
  IconButton,
  Text,
  Image,
  Box,
  useMediaQuery,
  useColorModeValue
  
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
export default function QuizPreview({module_name}) {
  const [media] = useMediaQuery("(max-width: 1000px)");  
    const navigate = useNavigate()
    const handleBegin= () => {
        navigate(`/${module_name}/quiz`)
      }
      
    const handleBack = () => {
        navigate(`/${module_name}`)
        window.location.reload(false)
      }

    return (
    <Flex
      position="absolute"
      width={'100%'}
      flexDirection={`${media ? ("column") : ("row")}`} 
      height={'70vh'}
      zIndex={'10'}

      marginTop={'10%'}
    >
      <Image 
      src='/tiffany.png' 
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
      width={'100%'} 
      color={useColorModeValue("var(--grey)", "var(--midnight)")}
      position={'absolute'}
      bg={useColorModeValue("var(--darkblue)", "var(--lightblue)")}
      justifyContent={'center'}
      >
    <Box 
    margin={'10%'}> 
    <Text 
        display={"flex"} 
        justifyContent={"center"}
        textAlign={'center'} 
        fontWeight={'bold'}
        pt={'10%'}
        fontSize={{ base: "20px", md: "40px", lg: "60px", xl: "80px" }}
        >
          READY TO TEST YOUR KNOWLEDGE?
          </Text>
          <Text 
               display={"flex"} 
               fontWeight={'bold'}
               justifyContent={"center"} 
               textAlign={'center'}
               fontSize={{ base: "15px", md: "20px", lg: "30px", xl: "40px" }}
               >          
          PRESS START TO BEGIN YOUR CASHFLOW QUIZ!</Text>

        {/* Left Icon */}
        <Flex marginTop={'10%'} justifyContent={'center'}>
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          display={'flex'}
          transform="translate(0%, -50%)"
          marginTop={'10%'}
          icon={<Image src="/back.png" marginLeft={`${media ? ("0%") : ("-120%")}`} width="40%"  />}
          onClick={handleBack}
        />
        {/* Start Icon */}
        <IconButton
          aria-label="start"
          variant="ghost"
          left={`${media ? ("0%") : ("20%")}`}
          marginTop={'9%'}
          transform="translate(0%, -50%)"
          icon={<Image src="/start.png" 
          width={'75%'} />}
          onClick={handleBegin}
        />
       </Flex>
   </Box>
      </Flex>
      </Flex>

  );

}