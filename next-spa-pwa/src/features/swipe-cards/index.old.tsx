/**
 * https://www.chrisberry.io/garden/tinder-style-swipe-with-framer-motion
 * BUT!!!!!!!!
 * Breaking down massively complicated and poorly articulated original and building back up step by step
 */

// import React from "react";
// import "./styles.css";
// import { CardStack } from ".";
// import styled from "styled-components";

// export default function App() {
//   const CardStack = styled(CardStack)`
//     background: #1f2937;
//   `;

//   // NOTE: looks like this creates card stack effect - NICE
//   // TODO: but could be on Stack component to make less complex composition
//   const Item = styled.div`
//     background: #f9fafb;
//     width: 200px;
//     height: 250px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 80px;
//     text-shadow: 0 10px 10px #d1d5db;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
//     border-radius: 8px;
//     transform: ${() => {
//       let rotation = Math.random() * (5 - -5) + -5;
//       return `rotate(${rotation}deg)`;
//     }};
//   `;

//   return (
//     <div className="App">
//       <CardStack>
//         <Item data-value="waffles">🧇</Item>
//         <Item data-value="pancakes">🥞</Item>
//         <Item data-value="donuts">🍩</Item>
//       </CardStack>
//     </div>
//   );
// }
