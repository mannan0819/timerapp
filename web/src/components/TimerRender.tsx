import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select, useColorMode } from "@chakra-ui/react";
import { resetClient } from "next-urql/dist/types/init-urql-client";
import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  Timer,
  useCreateTimerMutation,
  useEndtimerMutation,
  useProjectsQuery,
  useTimerMutation,
  useTimersQuery,
} from "../generated/graphql";
import { convertErrors } from "../utils/converErrors";
import NextLink from "next/link";

interface TimerProps {
  refetch: any;
  timer: Timer;
}

export const TimerRender: React.FC<TimerProps> = ({ refetch, timer }) => {
  const [startTime, setStartTime] = useState(null);
  const [diff, setDiff] = useState(0);
  const [start, setStart] = useState(false);
  const [createTimer] = useCreateTimerMutation();
  const [title, setTitle] = useState("");
  const [id, setId] = useState(-1);
  const [endTimer] = useEndtimerMutation();
  const [errors, setErrors] = useState(null);
  const { data: projectsData } = useProjectsQuery();
  const [project, setProject] = useState("Select Your Project Type");
  const [projId, setProjID] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();

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
      setProject(timer.project.title);
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
      <Box>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {project}
          </MenuButton>
          <MenuList>
            {projectsData &&
              projectsData.Projects.map((proj) => {
                return (
                  <MenuItem
                    key={proj.id}
                    value={proj.id}
                    onClick={() => {
                      setProjID(proj.id);
                      setProject(proj.title);
                    }}
                    fontSize="20px"
                  >
                    {proj.title}
                  </MenuItem>
                );
              })}
            <MenuDivider />
            <MenuItem fontSize="20px">
              <NextLink href="/create-project">Create New Project</NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
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
    </Box>
  );
};
