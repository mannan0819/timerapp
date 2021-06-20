import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { resetClient } from "next-urql/dist/types/init-urql-client";
import { useEffect, useState } from "react";
import Clock from "react-clock";
import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Timer,
  useCreateTimerMutation,
  useEndtimerMutation,
  useProjectsQuery,
  useTimerMutation,
  useTimersQuery,
} from "../generated/graphql";
import { convertErrors } from "../utils/converErrors";

interface TimerProps {
  refetch: any;

  timer: Timer;
}

export const TimerRender: React.FC<TimerProps> = ({ refetch, timer }) => {
  const [value, setValue] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [diff, setDiff] = useState(0);
  const [pause, setPause] = useState(true);
  const [start, setStart] = useState(false);
  const [createTimer] = useCreateTimerMutation();
  const [title, setTitle] = useState("");
  const [id, setId] = useState(-1);
  const [endTimer] = useEndtimerMutation();
  const [errors, setErrors] = useState(null);
  const { data: projectsData } = useProjectsQuery();
  const [projects, setProjects] = useState(null);
  const [projId, setProjID] = useState(0);

  useEffect(() => {
    console.log("PROJECT ID: ", projId);
  }, [projId]);
  //console.log("PROJECT ID: ", projId);
  // console.log(pause);
  //   console.log("HOURS: " + value.getHours());
  //   console.log("Minutes: " + value.getMinutes());
  //   console.log("second: " + value.getSeconds());
  useEffect(() => {
    if (timer) {
      setTitle(timer.title);
      setStartTime(new Date(timer.starttime));
      setStart(true);
      setId(timer.id);
      // console.log(timer.id);
    }
  }, [timer]);

  useEffect(() => {
    const interval =
      startTime != null && start
        ? setInterval(() => {
            // if (pause) {
            setDiff((new Date() as any) - startTime);
            // }
          }, 1000)
        : null;

    return () => {
      clearInterval(interval);
    };
  }, [start, startTime]);

  const reset = () => {
    setTitle("");
    setDiff(0);
  };

  return (
    <Box>
      <Input
        placeholder="What are you woking on...."
        size="md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors ? (
        <Text fontSize="20px" color="tomato">
          {errors.title}
        </Text>
      ) : null}
      <Select
        colorScheme="whiteAlpha"
        // color="aqua"
        placeholder="Project Name"
        onChange={(e) => {
          setProjID(e.target.value as any);
        }}
      >
        {projectsData &&
          projectsData.Projects.map((proj) => {
            return (
              <option key={proj.id} value={proj.id}>
                {proj.title}
              </option>
            );
          })}
        <option>asdfj</option>
      </Select>
      Timer: {Math.floor(diff / (1000 * 60 * 60))}:
      {Math.floor((diff / (1000 * 60)) % 60)}: {Math.floor(diff / 1000) % 60}
      {!start && (
        <Button
          colorScheme="teal"
          size="md"
          m={3}
          onClick={async () => {
            const start = new Date();
            let response = await createTimer({
              variables: {
                timerinput: {
                  starttime: start,
                  text: "test",
                  title,
                  complete: false,
                  projectId: parseInt(projId as any),
                },
              },
            });
            //console.log(t.data.createTimer.timer.id);
            if (response.data?.createTimer.error) {
              setErrors(convertErrors(response.data.createTimer.error));
              // setErrors()
            } else {
              setStartTime(start);
              setStart(true);
              setId(response.data.createTimer.timer.id);
            }
          }}
        >
          Start
        </Button>
      )}
      {start && (
        <Button
          colorScheme="teal"
          size="md"
          m={3}
          onClick={async () => {
            setDiff((new Date() as any) - startTime);
            setStart(false);
            console.log("HERE " + id);
            if (id != -1) {
              console.log("ENDED " + id);
              await endTimer({ variables: { id } });
            }
            refetch();
            reset();
          }}
        >
          Stop
        </Button>
      )}
      {/* Current time: {value.getHours()}:{value.getMinutes()}: */}
      {/* {value.getSeconds()} */}
      {/* <Clock value={value} /> */}
    </Box>
  );
};
