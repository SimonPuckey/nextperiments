import { motion, useAnimation } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "./components/card";
import CardData from "./data.json";

/* Resources
 * https://webdesign.tutsplus.com/how-to-build-a-full-screen-responsive-page-with-flexbox--cms-32086t
 */
/* TODO 
Constrain drag
remove card from stack once swiped
etc etc
*/

// basic default styles for container
const Container = styled.div`
  // fill viewport
  width: 100vw;
  height: 100vh;
  // centre children
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const StyledCardStack = styled.div`
  // border: 1px solid blue;
  position: relative;
  width: 200px;
  height: 250px;
`;

const StackedCard = styled(motion.div)`
  // stack cards
  position: absolute;
  // inherit dimensions of parent
  width: 100%;
  height: 100%;
  background: #f9fafb;
  font-size: 10px;
  color: black;
  text-shadow: 0 10px 10px #d1d5db;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  transform: ${() => {
    let rotation = Math.random() * (5 - -5) + -5;
    return `rotate(${rotation}deg)`;
  }};
`;

type Card = {
  name: string;
};

const CardStack = () => {
  const animControls = useAnimation();
  // TODO: will need a useInfiniteQuery to get data
  // NOTE: but for now just use static json
  const [stack, setStack] = useState(CardData);

  const cycleStack = () => {
    const top = stack.pop();
    if (top) {
      const newStack = [...stack].toSpliced(0, 0, top);
      setStack(newStack);
    }
  };

  // is 'flyAway' in original
  const dragEndHandler = (info: any) => {
    cycleStack();

    // BELOW IS ALL ANIM IDEAS - WORRY ABOUT LATER
    // not going t o worry about making card fly away just yet
    // if (Math.abs(info.point.x) < 200) {
    //   animControls.start({ x: 0 });
    // } else {
    //   if (info.point.x < 0) {
    //     animControls.start({ x: -300 });
    //   } else {
    //     animControls.start({ x: 300 });
    //   }
    // }
    // flyAway fn orig
    // const flyAwayDistance = (direction) => {
    //   const parentWidth = cardElem.current.parentNode.getBoundingClientRect()
    //     .width
    //   const childWidth = cardElem.current.getBoundingClientRect().width
    //   return direction === "left"
    //     ? -parentWidth / 2 - childWidth / 2
    //     : parentWidth / 2 childWidth / 2
    // }
    // if (direction && Math.abs(velocity) > min) {
    //   setConstrained(false)
    //   controls.start({
    //     x: flyAwayDistance(direction)
    //   })
    // }
  };

  return (
    <>
      <Container>
        <StyledCardStack>
          {stack.map((item, index) => {
            let isTop = index === stack.length - 1;
            return (
              <StackedCard
                key={index}
                // Only top card is draggable, only on X axis
                drag={isTop && "x"}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_: any, info: any) => dragEndHandler(info)}
                animate={animControls}
              >
                <Card onSwipe={() => handleSwipe()} name={item.name} />
              </StackedCard>
            );
          })}
        </StyledCardStack>
      </Container>
    </>
  );
};

export default CardStack;
