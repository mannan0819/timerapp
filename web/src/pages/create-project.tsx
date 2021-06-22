import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateProjectMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/isAuth";

interface ProjectProps {}

const CreateProject: React.FC<ProjectProps> = ({}) => {
  const router = useRouter();
  const [createRead] = useCreateProjectMutation();
  // useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "", colorhex: "" }}
        onSubmit={async (values) => {
          const res = await createRead({
            variables: {
              input: {
                title: values.title,
                text: values.text,
                colorhex: values.colorhex,
              },
            },
          });
          if (!res.errors) router.push("/");
          //if (res.error.message.includes("Not Authenticated"))
          // router.replace("/login");
          //else console.log(values);
          // console.log(router);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField name="title" type="text" label="Title" />
              <Box mt={4}>
                <InputField
                  textarea
                  name="text"
                  type="text"
                  label="Description"
                />
              </Box>
              <InputField name="colorhex" type="text" label="Color" />
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              create project
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateProject;
