import { Box } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  size?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  size = "regular",
}) => {
  return (
    <Box
      mx="auto"
      maxW={size === "small" ? "400px" : "1000px"}
      w="100%"
      mt={4}
      // border="1px"
      // borderColor="gray.200"
    >
      {children}
    </Box>
  );
};
