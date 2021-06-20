import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation, useResgisterMutation } from "../generated/graphql";
import { convertErrors } from "../utils/converErrors";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper size="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.Login.error) {
            setErrors(convertErrors(response.data.Login.error));
          } else {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField name="username" type="text" label="Username" />
              <Box mt={4}>
                <InputField name="password" type="password" label="Password" />
              </Box>
            </FormControl>
            <Flex mt={1}>
              <Link
                ml={"auto"}
                onClick={() => {
                  router.push("/forgotpassword");
                }}
              >
                forgot password?
              </Link>
            </Flex>
            <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
