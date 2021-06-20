import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useResgisterMutation } from "../generated/graphql";
import { convertErrors } from "../utils/converErrors";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useResgisterMutation();
  const router = useRouter();
  return (
    <Wrapper size="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.error) {
            setErrors(convertErrors(response.data.register.error));
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField name="username" type="text" label="Username" />
              <Box mt={4}>
                <InputField name="email" type="text" label="Email" />
              </Box>
              <Box mt={4}>
                <InputField name="password" type="password" label="Password" />
              </Box>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
