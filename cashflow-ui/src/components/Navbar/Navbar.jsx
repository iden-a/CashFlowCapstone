import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
  Img,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
  

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const Links = ['About', 'Register', 'Login'];

  const NavLink = ({ children }) => {
      const handleClick = () => {
        window.location.href = children;
      };
    
      return (
        <span
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            _hover:{
              textDecoration: 'none',
              bg: useColorModeValue('var(--midnight)', 'var(--grey)'),
              color: useColorModeValue('var(--grey)', 'var(--midnight)'),
              cursor: 'pointer',
            }
          }}
        >
          {children}
        </span>
      );
    };
  return (
    <>
      <Box bg={useColorModeValue('var(--grey)', 'var(--midnight)')} px={4} position={'relative'}>
        {/* Clicking on logo leads back to homepage */}
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
         <Link to='/'>
         <Box><img
          src={"/logo.png"} 
          width={100} height={100}
            /></Box>
         </Link>
         

        {/* Navbar that links to pages on site  */}

        <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu position={'fixed'}>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    // TODO: Insert profile image from user
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
             

                {/* TODO: Dynamically render sidebar if user is logged in */}
                
                {/* Sidebar with user information */}
                <MenuList alignItems={'center'} zIndex={9999}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                    {/* TODO: Insert profile image from user */}
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p> 
                    {/* TODO: Insert username from user */}
                  </Center>
                  <Center>
                    <p>Points: XXXX</p> 
                    {/* TODO: Insert points from user */}
                  </Center>
                  <br />
                  <MenuDivider />
                  {/* TODO: Add routes to sidebar links */}
                  <MenuItem>
                    <Link to="/profile">Your Profile</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/dashboard">Learning Dashboard</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/goals">Goals</Link>
                    </MenuItem>
                    {/* TODO: Does this link to logout or is a function called?  */}
                    <MenuItem>
                        <Link to="/logout">Logout</Link>
                    </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
