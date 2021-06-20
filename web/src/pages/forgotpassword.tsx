import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Box, Text, Link } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotpasswordMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

interface forgotPassProps {}

const forgotPassword: React.FC<forgotPassProps> = ({}) => {
  const [, forgotpass] = useForgotpasswordMutation();
  const router = useRouter();
  const [sent, setSent] = useState(false);
  return (
    <Wrapper size="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          console.log("Email:" + values.email);
          const response = await forgotpass(values);
          setSent(true);
        }}
      >
        {({ isSubmitting }) =>
          sent ? (
            <Box>
              <Box>
                <Text as="abbr">
                  Reset Password link has been sent to the email if it exists
                </Text>
              </Box>
              <Box mt={4}>
                <Link mr={4} color="purple.500">
                  <NextLink href="/">Home</NextLink>
                </Link>
                <Link mt={4} color="teal.500">
                  <NextLink href="/login">Login</NextLink>
                </Link>
              </Box>
            </Box>
          ) : (
            <Form>
              <FormControl>
                <InputField name="email" type="text" label="Email" />
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                reset password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(forgotPassword);
