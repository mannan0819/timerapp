import { TimerInput } from "./timerInput";
import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const validateTimerInput = (timerInput: TimerInput) => {
  if (timerInput.title.length < 1) {
    return [
      {
        field: "title",
        message: "title field cannot be empty",
      },
    ];
  }
};

export const validateUserInput = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Not a valid email address",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "the username has to be at least 3 character long",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "the username can not include @",
      },
    ];
  }
  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "the password has to be at least 2 characters long",
      },
    ];
  }
  return null;
};

export const passwordValidate = (fieldname: string, password: string) => {
  if (password.length <= 2) {
    return [
      {
        field: fieldname,
        message: "the password has to be at least 2 characters long",
      },
    ];
  }
  return null;
};
