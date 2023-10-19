// /**
//  * https://www.chrisberry.io/garden/tinder-style-swipe-with-framer-motion
//  */

// import React from "react";
// import "./styles.css";
// import { Stack } from "../swipe-cards-v2/components/stack";
// import styled from "styled-components";

// export default function App() {
//   const CardStack = styled(Stack)`
//     background: #1f2937;
//   `;

//   // NOTE: looks like this creates card stack effect - NICE
//   // TODO: but could be on Stack component
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

//   // removing functionality while not yet implemented
//   // (tutorial is not very mvp/incremental cuz not typed)
//   return (
//     <div className="App">
//       {/* <CardStack onVote={(item, vote) => console.log(item.props, vote)}> */}
//       <CardStack onVote={() => console.log("onVote triggered")}>
//         {/* <Item data-value="waffles" whileTap={{ scale: 1.15 }}> */}
//         <Item data-value="waffles">🧇</Item>
//         {/* <Item data-value="pancakes" whileTap={{ scale: 1.15 }}> */}
//         <Item data-value="pancakes">🥞</Item>
//         {/* <Item data-value="donuts" whileTap={{ scale: 1.15 }}> */}
//         <Item data-value="donuts">🍩</Item>
//       </CardStack>
//     </div>
//   );
// }
