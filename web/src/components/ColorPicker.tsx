import { Box, Text } from "@chakra-ui/layout";
import { Button, Flex, FormLabel, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChromePicker, TwitterPicker } from "react-color";
import { defaultProjectColor } from "../constants";

interface ColorProps {
  label?: String;
  setColorState: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorPicker: React.FC<ColorProps> = ({ label, setColorState }) => {
  const [display, setDisplay] = useState(false);
  const [color, setColor] = useState(defaultProjectColor);
  const [buttontext, setButtontext] = useState("Pick Color");

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    setColorState(color.hex);
  };

  return (
    <Flex>
      <FormLabel>{label}</FormLabel>
      <Box>
        <Button
          bgColor={color}
          onClick={() => {
            setDisplay(!display);
          }}
        >
          {/* <Icon viewBox="0 0 250 185" color={color}>
            <path
              fill="currentColor"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon> */}
        </Button>
        {display ? (
          <Box position="relative" zIndex="2">
            <TwitterPicker
              color={color}
              onChange={null}
              onChangeComplete={handleChangeComplete}
            />
            {/* onChange={setColor} */}
          </Box>
        ) : null}
      </Box>
    </Flex>
  );
};
