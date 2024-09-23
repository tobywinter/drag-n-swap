import { motion } from "framer-motion";
import styled from "styled-components";

export const BorderAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
`;

export const OnDropAnimation = styled(motion.div)<{ src: string }>`
  background: url(${(props) => props.src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const onDropInRevealAnimationVariants = {
  open: (height = 10) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 30,
      duration: 0.8,
    },
  }),
  openWithDelay: (height = 10) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 30,
      delay: 0.01,
    },
  }),
  closed: {
    clipPath: "circle(30px at 50% 50%)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
