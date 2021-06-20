import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import { Clocks } from "../components/clock";
import { EditDeletePostButtons } from "../components/EditDeleteButton";
import { Layout } from "../components/Layout";
import { TimerRender } from "../components/TimerRender";
import { useCreateTimerMutation, useTimersQuery } from "../generated/graphql";

const Index = () => {
  const [variables, setVariables] = useState({ limit: 50, cursor: "" });
  //const [{ data, fetching }] = useReadsQuery({ variables });
  const { data, refetch } = useTimersQuery();
  const [createtimer] = useCreateTimerMutation();
  const [reset, setreset] = useState(false);
  const [unfinished, setunFinished] = useState(null);
  // console.log(data);

  useEffect(() => {
    if (data) {
      if (!data.Timers[0].complete) {
        setunFinished(data.Timers[0]);
        console.log(data.Timers[0].id);
      }
    }
  }, [data]);

  return (
    <Layout variant="regular">
      <Heading fontSize="xl" mb={4}>
        TimerApp
      </Heading>
      <Heading>
        <Clocks />
        <Box p={6} mb={4} shadow="md" borderWidth="1px">
          <TimerRender refetch={refetch} timer={unfinished} />
        </Box>
      </Heading>
      <Stack spacing={8}>
        {data?.Timers.map((timer) => (
          <Box key={timer.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="lg">{timer.title}</Heading>
            <Heading fontSize="md">{timer.project.title}</Heading>
            <Flex align="left">
              <Text flex={1} mt={4}>
                {timer.complete
                  ? "Timer: " + timer.clocktimer + " seconds"
                  : "NC: " + timer.starttime}
              </Text>
              <Box ml="auto">
                <EditDeletePostButtons id={timer.id} refetch={refetch} />
                <button onClick={() => refetch()}>Refetch!</button>
              </Box>
            </Flex>
          </Box>
        ))}
      </Stack>
      {/* {data ? (
        <>
          <Stack spacing={8}>
            {data.Reads.reads.map((read) => (
              <Box key={read.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{read.title}</Heading>
                <Flex align="center">
                  <Text flex={1} mt={4}>
                    {read.textSnippet}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Stack>
          {data && data.Reads.hasMore ? (
            <Flex>
              <Button
                m="auto"
                my={8}
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  setVariables({
                    limit: variables.limit,
                    cursor:
                      data.Reads.reads[data.Reads.reads.length - 1].createdAt,
                  });
                }}
                isLoading={fetching}
              >
                load more
              </Button>
            </Flex>
          ) : null}
        </>
      ) : (
        <div>Loading</div>
      )} */}
    </Layout>
  );
};

export default Index;
