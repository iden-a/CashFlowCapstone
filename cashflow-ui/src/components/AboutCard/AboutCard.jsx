import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function AboutCard({ name, school, aspiration, bio, image, animatedImage, isOpen }) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        h={'550px'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        borderWidth="1px"
        borderRadius="lg"
        overflow= "hidden"
      >
        <Box
          rounded={'lg'}
          pos={'relative'}
          height={'230px'}
          
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={isExpanded ? animatedImage : image} />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading color={'white'} fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
          <Text color={'white'} fontSize={'sm'} textTransform={'uppercase'} mt={2}>
                {aspiration}
              </Text>
          {isExpanded ? (
            <>
              <IconButton aria-label="Collapse info" onClick={handleExpand} icon={<MinusIcon />} />
              <Text color={'white'} fontSize={'sm'} mt={2}>
                {bio}
              </Text>
            </>
          ) : (
            <>
              <IconButton aria-label="Expand info" onClick={handleExpand} icon={<AddIcon />} />
              <Text color={'white'} fontWeight={800} fontSize={'xl'} mt={2}>
                {school}
              </Text>
            </>
          )}
        </Stack>
      </Box>
    </Center>
  );
}
