import React from "react";
import NavBar from "./NavBar";
import { WrapperVariant, Wrapper } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper size={variant}>{children}</Wrapper>
    </>
  );
};
