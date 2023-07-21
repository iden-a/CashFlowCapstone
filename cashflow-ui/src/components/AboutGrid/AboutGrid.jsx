import AboutCard from "../AboutCard/AboutCard";
import { Flex, Spacer, Center, Image, Heading } from "@chakra-ui/react";

export default function AboutGrid() {
  const aboutInfo = [
    {
      name: "Marley Burrows",
      school: "Florida A&M University",
      aspiration: "Aspiring  Software Engineer, UX/UI Designer",
      bio: "Hailing from Atlanta, Georgia, Marley enjoys reading a good book and traveling with friends and family.",
      image: "/marley.png",
      animatedImage: "/marleyA.png",
      isUnlocked: false,
    },
    {
      name: "Oluwapelumi Tayo-Orisadare",
      school: "Wesleyan University",
      aspiration: "Aspiring Software Engineer",
      bio: "Born in Nigeria, raised in the Midwest, Pelumi likes tennis, playing her saxophone, and watching tiktoks. 🙂",
      image: "/pelumi.png",
      animatedImage: "/pelumiA.png",
      isUnlocked: false,
    },
    {
      name: "Iden Amoako",
      school: "Baruch College",
      aspiration: "Aspiring Software Engineer, Product Manager",
      bio: "Coming in from New York City, Iden enjoys all things health and fitness, photography, and fashion!",
      image: "/iden.jpg",
      animatedImage: "/idenA.png",
      isUnlocked: false,
    },
  ];

  return (
    <>
      <Center h="250px">
        <Image src="/meet.png" />
      </Center>
      <Flex>
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
            />
            <Spacer />
          </>
        ))}
      </Flex>
    </>
  );
}
