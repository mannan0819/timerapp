import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const [logout] = useLogoutMutation();

  let body = (
    <>
      <Button mr={2} p={3}>
        <NextLink href="/login">login</NextLink>
      </Button>
      <Button mr={2} p={3}>
        <NextLink href="/register">register</NextLink>
      </Button>
    </>
  );

  if (!loading && data?.me) {
    body = (
      <>
        <Button mr={2} p={3}>
          {loading ? "loading" : data.me.username}
        </Button>
        <Button
          onClick={() => {
            logout();
          }}
        >
          <Link>logout</Link>
        </Button>
      </>
    );
  }

  return (
    <Flex bg="#B794F4" p={4} position="sticky" top="0" zIndex={5}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default NavBar;
