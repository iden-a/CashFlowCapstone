import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  IconButton,
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
  useMediaQuery,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar({ setAppState, appState }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navLinks = ["About", "Register", "Login"];
  const [media] = useMediaQuery("(max-width: 768px)");
  console.log(media);
  const handleLogout = () => {
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

  return (
    <>
      <Box
        bg={useColorModeValue("var(--grey)", "var(--midnight)")}
        px={4}
        position={"relative"}
      >
        {/* Clicking on logo leads back to homepage */}
        <Flex
          paddingTop={"1g%"}
          h={20}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link href="/">
            <Box marginLeft={30}>
              <img src={"/logo.png"} width={90} height={90} />
            </Box>
          </Link>

          {/* Navbar that links to pages on site  */}
          <Flex>
            {!appState.isAuthenticated ? (
              media ? (
                <Menu position={"fixed"}>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />

                  {/* Sidebar with user information */}
                  <MenuList zIndex={99}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                      <MenuItem>Home</MenuItem>
                    </Link>{" "}
                    <Link href="/about" style={{ textDecoration: "none" }}>
                      <MenuItem>About</MenuItem>
                    </Link>{" "}
                    <Link href="/register" style={{ textDecoration: "none" }}>
                      <MenuItem>Register</MenuItem>
                    </Link>{" "}
                    <Link href="/login" style={{ textDecoration: "none" }}>
                      <MenuItem>Login</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              ) : (
                <HStack
                  as={"nav"}
                  spacing={10}
                  display={{ base: "none", md: "flex" }}
                >
                  {navLinks.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}
                </HStack>
              )
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
                    size={"lg"}
                    src={
                      appState.user.image_url !== ""
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
                        appState.user.image_url !== ""
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
                  <Center>
                    <p>Status: {appState.user.status}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link href="/profile" style={{ textDecoration: "none" }}>
                    <MenuItem>Your Profile</MenuItem>
                  </Link>{" "}
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <MenuItem>Learning Dashboard</MenuItem>
                  </Link>{" "}
                  <Link href="/goals" style={{ textDecoration: "none" }}>
                    <MenuItem>Goals</MenuItem>
                  </Link>
                  <Link
                    href="/"
                    style={{ textDecoration: "none" }}
                    onClick={handleLogout}
                  >
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            )}

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7} ml={7}>
                <Button size={"md"} onClick={toggleColorMode}>
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
