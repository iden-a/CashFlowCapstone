import AboutCard from "../AboutCard/AboutCard";

export default function AboutGrid() {
  const aboutInfo = [
    {
      name: "Marley Burrows",
      school: "Florida A&M University",
      aspiration: "Aspiring UX/UI Designer, Software Engineer",
      bio: "Hailing from Atlanta, Georgia, Marley enjoys reading a good book and traveling with friends and family.",
      image: "XXX"
    },
    {
      name: "XXX",
      school: "XXX",
      aspiration: "XXX",
      bio: "XXX",
      image: "XXX"
    },
    {
      name: "XXX",
      school: "XXX",
      aspiration: "Aspiring XXX",
      bio: "XXX",
      image: "XXX"
    }
  ];


  return (
    <>
      {aboutInfo.map((creator) => (
        <AboutCard
          name={creator.name}
          school={creator.school}
          aspiration={creator.aspiration}
          bio={creator.bio}
          image={creator.image}
        />
      ))}
    </>
  );
}
