import AboutCard from "../AboutCard/AboutCard";
import {
  Flex,
  Spacer,
  Center,
  Image,
  Heading,
  useMediaQuery,
  Box,
  Text,
} from "@chakra-ui/react";
import Footer from "../App/Footer";

export default function AboutGrid() {
  const [media, cashflowMedia] = useMediaQuery([
    "(max-width: 768px)",
    "(max-width: 546px)",
  ]);

  const aboutInfo = [
    {
      name: "Marley Burrows",
      school: "Florida A&M University",
      aspiration: "Aspiring  Software Engineer, UX/UI Designer",
      bio: "Hailing from Atlanta, Georgia, Marley enjoys reading a good book and traveling with friends and family.",
      image: "/marley.png",
      animatedImage: "/marleyA.png",
      isUnlocked: false,
      linkedIn: "https://www.linkedin.com/in/marleyburrows/",
      github: "https://github.com/marleybisme"

    },
    {
      name: "Oluwapelumi Tayo-Orisadare",
      school: "Wesleyan University",
      aspiration: "Aspiring Software Engineer",
      bio: "Born in Nigeria, raised in the Midwest, Pelumi likes tennis, playing her saxophone, and watching tiktoks. 🙂",
      image: "/pelumi.png",
      animatedImage: "/pelumiA.png",
      isUnlocked: false,
      linkedIn: "https://www.linkedin.com/in/oluwapelumi-tayo-orisadare/",
      github: "https://github.com/PelumiTayo"

    },
    {
      name: "Iden Amoako",
      school: "Baruch College",
      aspiration: "Aspiring Software Engineer, Product Manager",
      bio: "Coming in from New York City, Iden enjoys all things health and fitness, photography, and fashion!",
      image: "/iden.jpg",
      animatedImage: "/idenA.png",
      isUnlocked: false,
      linkedIn: "https://www.linkedin.com/in/iden-amoako-37695724b/",
      github: "https://github.com/iden-a"
    },
  ];

  return (
    <>
      <Box
        paddingBottom={"20px"}
        borderBottom={"1px solid white"}
        height={"fit-content"}
        maxHeight={"90vh"}
      >
        <Image
          marginTop={"2%"}
          mx={"auto"}
          objectFit={cashflowMedia ? "contain" : "cover"}
          src="whatiscashflow.png"
          height={"15vh"}
          width={"80%"}
        />

        <Flex flexDirection={"row"} justifyContent={"space-evenly"}>
          <>
            <Image
              objectFit={"contain"}
              src="cashflowLogo.png"
              width={"30%"}
              height={"30%"}
            />
          </>
          <>
            <Text
              fontSize={media ? "2vw" : "1.6vw"}
              fontWeight={media ? "bold" : ""}
              paddingTop={"4%"}
              width={"40%"}
              textAlign={"center"}
              fontFamily={"monospace"}
            >
              CashFlow Academy is a comprehensive financial literacy site
              designed to empower individuals of all levels of expertise to
              master and increase their cash flow management skills. With
              personalized learning paths, interactive quizzes, and our AI
              Cashbot, the app educates users on bank account basics, savings,
              credit usage, debt management, and more!
            </Text>
          </>
        </Flex>
      </Box>
      <Box>
        <Center h="25vh">
          <Image src="/meet.png" />
        </Center>
        <Flex flexDirection={`${media ? "column" : "row"}`} height={"auto"}>
          {aboutInfo.map((creator) => (
            <>
              <Spacer />
              <AboutCard
                name={creator.name}
                school={creator.school}
                aspiration={creator.aspiration}
                bio={creator.bio}
                image={creator.image}
                animatedImage={creator.animatedImage}
                isUnlocked={creator.isUnlocked}
                linkedIn={creator.linkedIn}
                github={creator.github}

              />
              <Spacer />
            </>
          ))}
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
