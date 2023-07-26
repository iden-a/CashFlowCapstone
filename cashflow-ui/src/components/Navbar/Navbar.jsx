import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
// import { Link } from "react-router-dom";

export default function Navbar({ setAppState, appState }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navLinks = ["About", "Register", "Login"];
  const handleLogout = () => {
    console.log(appState);
    localStorage.setItem("CashFlow_Token", null);
    setAppState((appState) => ({ ...appState, isAuthenticated: false }));
  };

  const NavLink = ({ children }) => {
    const handleClick = () => {
      window.location.href = children;
    };
    return (
      <span
        onClick={handleClick}
        style={{
          cursor: "pointer",
          _hover: {
            textDecoration: "none",
            bg: useColorModeValue("var(--midnight)", "var(--grey)"),
            color: useColorModeValue("var(--grey)", "var(--midnight)"),
            cursor: "pointer",
          },
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

    return <span onClick={handleClick}>{children}</span>;
  };

  return (
    <>
      <Box
        bg={useColorModeValue("var(--grey)", "var(--midnight)")}
        px={4}
        position={"relative"}
      >
        {/* Clicking on logo leads back to homepage */}
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <Link href="/">
            <Box>
              <img src={"/logo.png"} width={90} height={90} />
            </Box>
          </Link>

          {/* Navbar that links to pages on site  */}
          <Flex>
            {!appState.isAuthenticated ? (
              <HStack
                as={"nav"}
                spacing={10}
                display={{ base: "none", md: "flex" }}
              >
                {navLinks.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            ) : (
              <Menu position={"fixed"}>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      appState.user.image_url 
                        ? appState.user.image_url
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }
                  />
                </MenuButton>

                {/* Sidebar with user information */}
                <MenuList zIndex={9999}>
                  <br />
                  <center>
                    <Avatar
                      size={"2xl"}
                      src={
                        appState.user.image_url
                          ? appState.user.image_url
                          : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                      }
                    />
                  </center>
                  <br />
                  <Center>
                    <p>{appState.user.username}</p>
                  </Center>
                  <Center>
                    <p>Points: {appState.user.total_points}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    <Link href="/profile" style={{textDecoration:"none"}} >
                      Your Profile
                    </Link>{" "}
                  </MenuItem>
                  <MenuItem>
                    <Link href="/dashboard" style={{textDecoration:"none"}}>
                      Learning Dashboard
                    </Link>{" "}
                  </MenuItem>
                  <MenuItem>
                    <Link href="/goals" style={{textDecoration:"none"}}>
                      Goals
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/"style={{textDecoration:"none"}} onClick={handleLogout}>
                      Logout
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7} ml={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
