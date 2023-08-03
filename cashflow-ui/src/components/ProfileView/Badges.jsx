import { Heading, Image, useColorModeValue, useMediaQuery, Flex } from "@chakra-ui/react";

import { useState } from "react";

export default function Badges({ appState }) {
  let userPoints = appState.user.total_points;

  function determineBadges(userPoints) {
    let badges = [];
    if (userPoints >= 500) {
      badges.push("cash-cadet");
    }
    if (userPoints >= 1000) {
      badges.push("dolla-scholar");
    }
    if (userPoints > 1600) {
      badges.push("money-maverick");
    }
    if (userPoints > 2000) {
      badges.push("profit-prodigy");
    }
    if (userPoints > 3000) {
      badges.push("wealth-wizard");
    }
    if (userPoints > 3600) {
      badges.push("cashflow-champion");
    }
    return badges;
  }

  const earnedBadges = determineBadges(userPoints);
  const [media, moreMedia] = useMediaQuery([
    "(max-width: 1000px)",
    "(max-width: 330px)",
  ]);

  return (
    <>
      <Heading
        color={useColorModeValue("var(--grey)", "var(--midnight)")}
        fontWeight={"bold"}
        textAlign={"center"}
        marginTop={"5px"}
        padding={"3px"}
      >
        Badges Earned
      </Heading>
      <Flex justifyContent={'center'} >
      {earnedBadges.map((badge) => {
        return (
            <Flex className="flip"
            css={{
                width: '25vh',
                height: '25vh',

                '&:hover': {
                  '.flip-inner': {
                    transform: 'rotateY(180deg)',
                  },
                },
                '.flip-inner': {
                  transformStyle: 'preserve-3d',
                  transition: 'transform .8s ease',
                  height: '100%',
                  width: '100%',
                  '.front, .back': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    borderRadius: '50%',
                    overflow: 'hidden',
                  },
                  '.front': {
                    transform: 'translateZ(1px)',
                  },
                  '.back': {
                    transform: 'rotateY(180deg)',
                  },
                  '.thumbnail': {
                    width: '100%',
                  },
                },
              }}>
            <Flex className="flip-inner">
                <Flex className="front">
                <Image objectFit={'cover'} width={"25vh"} height={"25vh"} key={badge} src={`${badge}.png`} alt={badge} />
                </Flex>
                <Flex className="back">
                <Image objectFit={'cover'} width={"25vh"} height={"25vh"} key={badge} src={`${badge}2.png`} alt={badge} />
                </Flex>
            </Flex>
        </Flex>
        );
      })}
      </Flex>
    </>
  );
}


