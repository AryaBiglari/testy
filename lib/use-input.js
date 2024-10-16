import { useState, useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";

const useInput = (validateValue) => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const inputValueIsValid = validateValue(inputValue);

  const inputHasError = !inputValueIsValid && inputIsTouched;

  const inputValueChangeHandler = (event) => {
    setInputValue(event.target.value);
    setInputIsTouched(true);
  };

  const resetInput = () => {
    setInputValue("");
    setInputIsTouched(false);
  };

  const [valueAdornment, setValueAdornment] = useState(-1);
  const [valueError, setValueError] = useState(false);

  useEffect(() => {
    const inputFeedback = setTimeout(
      () => {
        if (!inputHasError) {
          setValueError(false);
          setValueAdornment(
            <CheckIcon color="success50" sx={{ fontSize: 22, mr: -0.5 }} />
          );
        }
        if (inputHasError) {
          setValueError(true);
          setValueAdornment(
            <ErrorOutlineIcon color="error75" sx={{ fontSize: 22, mr: -0.5 }} />
          );
        }
        if (!inputHasError && inputValue.trim() < 4) {
          setValueError(false);
          setValueAdornment(null);
        }
      },
      !inputHasError ? 600 : 1200
    );

    return () => {
      clearTimeout(inputFeedback);
    };
  }, [inputValue, inputHasError]);

  return {
    value: inputValue,
    inputHasError,
    inputValueChangeHandler,
    resetInput,
    valueError,
    valueAdornment,
  };
};

export default useInput;
