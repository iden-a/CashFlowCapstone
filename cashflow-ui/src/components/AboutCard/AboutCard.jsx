import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function AboutCard({
  name,
  school,
  aspiration,
  bio,
  image,
  animatedImage,
  isUnlocked,
  linkedIn,
}) {
  const [isExpanded, setIsExpanded] = useState(isUnlocked);
  const { isOpen, onToggle } = useDisclosure();
  function handleExpand() {
    setIsExpanded(!isExpanded);
    onToggle();
  }

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        h={"550px"}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={useColorModeValue("var(--grey)", "var(--midnight)")}
      >
        <AnimatePresence>
          {/* Container for the image */}
          <Box
            rounded={"lg"}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              filter: "blur(15px)",
              zIndex: -1,
              opacity: isExpanded ? 0 : 1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            {/* Conditionally renders the image or animated image */}
            {isExpanded ? (
              <motion.img
                src={animatedImage}
                alt="Animated Image"
                key={animatedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  rounded: "lg",
                }}
              />
            ) : (
              <motion.img
                src={image}
                alt="Image"
                key={image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  rounded: "lg",
                  borderRadius: 10,
                }}
              />
            )}
          </Box>
        </AnimatePresence>

        <Stack
          pt={10}
          align={"center"}
          bg={useColorModeValue("var(--grey)", "var(--midnight)")}
        >
          {/* Displays name and aspiration */}
          <center>
            <Heading
              color={useColorModeValue("var(--midnight)", "var(--grey)")}
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={500}
            >
              {name}
            </Heading>
          </center>
          <center>
            <Text
              color={useColorModeValue("var(--midnight)", "var(--grey)")}
              fontSize={"sm"}
              textTransform={"uppercase"}
              mt={2}
            >
              {aspiration}
            </Text>
          </center>

          <IconButton
            aria-label={isExpanded ? "Collapse info" : "Expand info"}
            onClick={handleExpand}
            icon={isExpanded ? <MinusIcon /> : <AddIcon />}
          />
          <a href={linkedIn}>
            <FaLinkedin fontSize={"180%"} />
          </a>

          {/* Conditionally displays bio or school */}
          {isExpanded ? (
            <Text
              color={useColorModeValue("var(--midnight)", "var(--grey)")}
              fontSize={"sm"}
              mt={2}
            >
              {bio}
            </Text>
          ) : (
            <Text
              color={useColorModeValue("var(--midnight)", "var(--grey)")}
              fontWeight={800}
              fontSize={"xl"}
              mt={2}
            >
              {school}
            </Text>
          )}
        </Stack>
      </Box>
    </Center>
  );
}
