'use client'

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import ChromeDinoGame from 'react-chrome-dino';

const Logo = (props) => {
  return (
    <svg height={32} viewBox="0 0 120 28" xmlns="http://www.w3.org/2000/svg" {...props}>
      /cashflowLogo.png
    </svg>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};
export default function Footer() {
  const [media] = useMediaQuery("(max-width: 371px)")
  return (
    <Box bg={useColorModeValue('var(--grey)', 'var(--midnight)')} color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
      <Logo />
        <Stack width={"80vw"} fontSize={"x-large"} justifyContent={"space-evenly"}  direction={'row'} spacing={2}>
          <Box as="a" href={'/'}>
            Home
          </Box>
          <Box as="a" href={'/About'}>
            About
          </Box>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor={useColorModeValue('var(--midnight)', 'var(--grey)')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={'center'}
          align={'center'}>
          <Text>© 2023 Cashflow Enterprises. All rights reserved</Text>
        </Container>
      </Box>
      <ChromeDinoGame />
    </Box>
  );
}
