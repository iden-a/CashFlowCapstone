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
  MenuItemOption,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
  

export default function Navbar({setAppState, appState}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navLinks = ['About', 'Register', 'Login'];
  const handleLogout = () =>{
    console.log(appState)
    localStorage.setItem("CashFlow_Token", null)
    setAppState((appState) => ({...appState, isAuthenticated: false}))
    //window.location.reload();
}
  
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
    const SideLink = ({ children, to }) => {
      const handleClick = () => {
        window.location.href = to;
      };
    
      return (
        <span onClick={handleClick}>
          {children}
        </span>
      );
    };
    
  return (
    <>
      <Box bg={useColorModeValue('var(--grey)', 'var(--midnight)')} px={4} position={'relative'}>
        {/* Clicking on logo leads back to homepage */}
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
         <Link to='/'>
         <Box><img
          src={"/logo.png"} 
          width={90} height={90}
            /></Box>
         </Link>
         

        {/* Navbar that links to pages on site  */}
        <Flex>
                 {/* TODO: Dynamically render sidebar if user is logged in */}
                 {!appState.isAuthenticated ? 
                  <HStack
                 as={'nav'}
                 spacing={4}
                 display={{ base: 'none', md: 'flex' }}>
                 {navLinks.map((link) => (
                   <NavLink key={link}>{link}</NavLink>
                 ))}
               </HStack>
                 
                 : 
                 
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
                     src={appState.user.image_url ? appState.image_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
                   />
                 </MenuButton>
                 
                 {/* Sidebar with user information */}
                 <MenuList zIndex={9999}>
                   <br />
                   {/* TODO: Insert profile image from user */}
                   <center><Avatar
                       size={'2xl'}
                       src={appState.user.image_url ? appState.image_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
                       />
                     </center>
                   <br />
                   <Center>
                     <p>{appState.user.username}</p> 
                     {/* TODO: Insert username from user */}
                   </Center>
                   <Center>
                     <p>Points: {appState.user.total_points}</p> 
                     {/* TODO: Insert points from user */}
                   </Center>
                   <br />
                   <MenuDivider />
                   <MenuItem>
                   <SideLink to="/profile">Your Profile</SideLink>
                 </MenuItem>
                   <MenuItem>
                   <SideLink to="/dashboard">Learning Dashboard</SideLink>
                   </MenuItem>
                   <MenuItem>
                   <SideLink to="/goals">Goals</SideLink>
                   </MenuItem>
                   <MenuItem>
                   <Link to="/" onClick={handleLogout}>Logout</Link>
                   </MenuItem>
                 </MenuList>
               </Menu>
                 }

                 <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
