import { useMotionValue } from "framer-motion";
import React from "react";
import styled from "styled-components";

type CardProps = {
  onSwipe: Function;
  name: string;
  className?: string;
};

const StyledCard = styled.div`
  // center content x&y
  display: flex;
  align-items: center;
  justify-content: center;
  // inherit dimensions of parent
  width: 100%;
  height: 100%;
`;

//could just replace clasName with ...props
export const Card = ({ onSwipe, name }: CardProps) => {
  // const mv = useMotionValue(0);
  return (
    <StyledCard>
      <p>{name}</p>
    </StyledCard>
  );
};
