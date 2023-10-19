import { motion } from "framer-motion";
import React, { Children, ReactNode, useState } from "react";
import styled from "styled-components";
import { Card } from "../../../components/card";

// basic default styles for container
const Frame = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

type StackProps = {
  children: ReactNode[];
  onVote: Function;
};

export const Stack = ({ children, onVote, ...props }: StackProps) => {
  const [stack, setStack] = useState(Children.toArray(children));

  // return new array with last item removed
  const pop = (array: any) => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (item, vote) => {
    // update the stack
    let newStack = pop(stack);
    setStack(newStack) +
      // run function from onVote prop, passing the current item and value of vote
      onVote(item, vote);
  };

  return (
    <>
      <Frame {...props}>
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;
          return (
            <Card
              drag={isTop} // Only top card is draggable
              //   key={item.key || index}
              key={index}
              onVote={(result) => handleVote(item, result)}
            >
              {item}
            </Card>
          );
        })}
      </Frame>
    </>
  );
};
