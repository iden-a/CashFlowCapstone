import AboutCard from "../AboutCard/AboutCard";
import { Flex, Spacer, Center, Image, Heading, useMediaQuery } from "@chakra-ui/react";
import Footer from "../App/Footer";

export default function AboutGrid() {
  const [media] = useMediaQuery("(max-width: 768px)");

  const aboutInfo = [
    {
      name: "Marley Burrows",
      school: "Florida A&M University",
      aspiration: "Aspiring  Software Engineer, UX/UI Designer",
      bio: "Hailing from Atlanta, Georgia, Marley enjoys reading a good book and traveling with friends and family.",
      image: "/marley.png",
      animatedImage: "/marleyA.png",
      isUnlocked: false,
      linkedIn: 'https://www.linkedin.com/in/marleyburrows/'
    },
    {
      name: "Oluwapelumi Tayo-Orisadare",
      school: "Wesleyan University",
      aspiration: "Aspiring Software Engineer",
      bio: "Born in Nigeria, raised in the Midwest, Pelumi likes tennis, playing her saxophone, and watching tiktoks. 🙂",
      image: "/pelumi.png",
      animatedImage: "/pelumiA.png",
      isUnlocked: false,
      linkedIn: 'https://www.linkedin.com/in/oluwapelumi-tayo-orisadare/'
    },
    {
      name: "Iden Amoako",
      school: "Baruch College",
      aspiration: "Aspiring Software Engineer, Product Manager",
      bio: "Coming in from New York City, Iden enjoys all things health and fitness, photography, and fashion!",
      image: "/iden.jpg",
      animatedImage: "/idenA.png",
      isUnlocked: false,
      linkedIn: 'https://www.linkedin.com/in/iden-amoako-37695724b/'
    },
  ];

  return (
    <>
      <Center h="25vh">
        <Image src="/meet.png" />
      </Center>
      <Flex  flexDirection={`${media ? ("column") : ("row")}`} height={'auto'} >
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
            />
            <Spacer />
          </>
        ))}
      </Flex>
      <Footer />
    </>
  );
}
