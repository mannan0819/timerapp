import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Clock from "react-clock";

export function Clocks() {
  const [value, setValue] = useState(new Date());
  //   console.log("HOURS: " + value.getHours());
  //   console.log("Minutes: " + value.getMinutes());
  //   console.log("second: " + value.getSeconds());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box>
      Current time: {value.getHours()}:{value.getMinutes()}:{value.getSeconds()}
      <Clock value={value} />
    </Box>
  );
}
