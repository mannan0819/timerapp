import { FormControl } from "@chakra-ui/form-control";
import { Box, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useChangePasswordMutation } from "../../generated/graphql";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { convertErrors } from "../../utils/converErrors";
import { NextPage } from "next";
import NextLink from "next/link";

const changePassword: NextPage = () => {
  const router = useRouter();
  const [, changepassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState(false);

  console.log("token: ", router.query.token);
  return (
    <Wrapper size="small">
      <Formik
        initialValues={{
          newpassword: "",
          oldpassword: "",
          confirmpassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changepassword({
            newpassword: values.newpassword,
            oldpassword: values.oldpassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });
          if (values.confirmpassword != values.newpassword) {
            setErrors({
              confirmpassword: "password is not the same",
            });
          } else if (response.data?.changePassword.error) {
            const err = convertErrors(response.data.changePassword.error);
            setErrors(err);
            if ("token" in err) {
              setTokenError(true);
            }
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {tokenError ? (
              <>
                <Box color={"#C53030"}>
                  <Text fontSize="3xl">BAD TOKEN</Text>
                </Box>
                <Button mt={4} colorScheme="teal">
                  <NextLink href="/login">back to login</NextLink>
                </Button>
              </>
            ) : (
              <>
                <FormControl>
                  <InputField
                    name="oldpassword"
                    type="password"
                    label="Old Password"
                  />
                  <Box mt={4}>
                    <InputField
                      name="newpassword"
                      type="password"
                      label="New Password"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="confirmpassword"
                      type="password"
                      label="Confirm Password"
                    />
                  </Box>
                </FormControl>

                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  change password
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(changePassword);
