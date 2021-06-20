import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useProjectsQuery,
  useTimerMutation,
  useTimersQuery,
} from "../generated/graphql";

const projects = () => {
  const { data, loading } = useProjectsQuery();
  const [projects, setPorjects] = useState([]);
  const { data: timers } = useTimersQuery();
  const [timer] = useTimerMutation();
  console.log(data);
  useEffect(() => {
    if (data && data !== undefined) {
      console.log("HERE");
      setPorjects(data.Projects);
    }
  }, [data, loading]);
  return (
    <Box>
      {loading
        ? "LOADING"
        : projects.map((s) => {
            return s.title;
          })}
    </Box>
  );
};

export default projects;
