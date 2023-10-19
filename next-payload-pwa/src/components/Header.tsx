import React, { ReactNode } from "react";
import styled from "styled-components";

type HeaderProps = {
  children: ReactNode;
};
export const Header = ({ children }: HeaderProps) => {
  return <TopBar>{children}</TopBar>;
};

const TopBar = styled.div`
  //todo: if want to centralise text then prob shouldnt flex
  //but need vertical alignment
  display: flex;
  justify-content: center;
  /* justify-content: space-around; */
  align-items: center;
  /* overflow: auto; */
  /* mobile and desktop heights might be diff*/
  height: 5vh;
  padding: 0 1em;
  /* mobile and desktop thickness might be diff*/
  border-bottom: 0.5vh solid white;
  background-color: black;
  color: white;
`;
