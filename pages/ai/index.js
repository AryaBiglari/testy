import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Paper } from "@mui/material";

// import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import useInput from "../../lib/use-input";

export default function AI() {
  //   const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingResponse, setIsLoadingResponse] = React.useState(false);

  const [successMsg, setSuccessMsg] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);

  const {
    value: inputDescription,
    inputHasError: inputDescriptionIsInvalid,
    inputValueChangeHandler: descriptionInputChangeHandler,
    resetInput: resetInputDescription,
    valueError: descriptionError,
    valueAdornment: descriptionAdornment,
  } = useInput(
    (value) => value.trim().length > 0 && value.trim().length <= 2000
  );
  //   const {
  //     value: response,
  //     inputHasError: responseIsInvalid,
  //     inputValueChangeHandler: responseChangeHandler,
  //     resetInput: resetResponseDescription,
  //     valueError: responseError,
  //     valueAdornment: responseAdornment,
  //   } = useInput(
  //     (value) => value.trim().length > 0 && value.trim().length <= 2000
  //   );
  const [responseValue, setResponseValue] = React.useState("");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  React.useEffect(() => {
    async function isLoadingHandler() {
      await sleep(700);
      setIsLoading(false);
    }
    const onPageLoad = () => {
      isLoadingHandler();
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  async function submitHandler(event) {
    setIsLoadingResponse(true);
    event.preventDefault();

    const prompt = inputDescription;

    try {
      //   const resp = await fetch("/api/openai/copywriting", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ prompt }),
      //   });
      // console.log("this is the prompt sent");
      // console.log(prompt);
      const resp = await fetch("api/openai/general-prompts", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();
      // console.log(data);

      setResponseValue(data.result.message.content);
      setIsLoadingResponse(false);
    } catch (error) {
      console.log(error);
    }
  }

  //   async function getAnswer() {
  //     console.log("get answer exec");
  //     const response = await fetch("api/openai/general-prompts", {
  //       method: "POST",
  //       body: JSON.stringify({ h: "hello" }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   return <Button onClick={getAnswer}>aa</Button>;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: 1,
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          size={65}
          thickness={4}
          sx={{
            color: "var(--primary75)",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        // marginTop: "62px",
        // pl: "24px",
        // pr: "24px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Paper
        sx={{
          // borderRadius: "12px",
          // backgroundColor: "red",
          mt: 0,
          pl: 2,
          pt: 0,
          pr: 2,
          mb: 1,
          // height: "60rem",
          width: "100%",
          maxWidth: "50rem",
          // border: "2px solid var(--secondary15)",
          //   border: "var(--mainBorder)",
          //   border: "none",
          boxShadow: "none",
          outline: "none",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          //   "@media (max-width: 850px)": {
          //     flexDirection: "column",
          //     alignItems: "center",
          //   },
          //   "@media (max-width: 460px)": {
          //     pl: 0.3,

          //     pr: 0.5,
          //   },
          // flexWrap: "wrap",
          //   backgroundColor: "green",
          // flexDirection: "column",
        }}
      >
        {isLoadingResponse && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              // bgcolor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // zIndex: "1000",
              pt: 12,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!successMsg && !errorMsg && (
          <form onSubmit={submitHandler}>
            <TextField
              spellCheck="false"
              label="Prompt"
              multiline
              rows={5}
              onChange={descriptionInputChangeHandler}
              error={descriptionError}
              value={inputDescription}
              helperText={
                descriptionError
                  ? "Please enter a text with less than 2000 characters."
                  : false
              }
              size="small"
              // color={!descriptionError ? "secondary50" : "error50"}
              sx={{
                mt: 2,
                minWidth: "46rem",

                borderRadius: "0.625rem",
                width: "100%",

                "& .MuiOutlinedInput-input": {
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--secondary75)",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.9rem",
                  ml: 0.3,
                  color: "var(--secondary35)",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0.625rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.6rem",
                  ml: 0,

                  mb: -0.8,
                },
                "& .Mui-error fieldset": {
                  border: "0.8px solid var(--error50)",
                },

                "&:hover fieldset": {
                  border: !false
                    ? "1px solid var(--secondary50) !important"
                    : "1.5px solid var(--error75) !important",
                },

                "& .Mui-focused fieldset": {
                  border: !false
                    ? "1px solid var(--secondary50) !important"
                    : "1px solid var(--error50) !important",
                },
              }}
              id="prompt"
              variant="outlined"
              placeholder="Prompt"
              autoComplete="Prompt"
            />

            <TextField
              spellCheck="false"
              label="Response"
              multiline
              rows={19}
              //   onChange={responseChangeHandler}
              //   error={descriptionError}
              value={responseValue}
              //   helperText={
              //     descriptionError
              //       ? "Please enter a text with less than 2000 characters."
              //       : false
              //   }
              size="small"
              //   color="secondary50"
              //   InputProps={{
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         {descriptionAdornment}
              //       </InputAdornment>
              //     ),
              //   }}
              sx={{
                mt: 2,
                minWidth: "46rem",
                borderRadius: "0.625rem",
                width: "100%",

                "& .MuiOutlinedInput-input": {
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--secondary75)",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                  ml: 0.3,
                  color: "var(--secondary35)",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0.625rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.6rem",
                  ml: 0,

                  mb: -0.8,
                },
                "& .Mui-error fieldset": {
                  border: "0.8px solid var(--error50)",
                },

                "&:hover fieldset": {
                  border: !false
                    ? "1px solid var(--secondary50) !important"
                    : "1.5px solid var(--error75) !important",
                },

                "& .Mui-focused fieldset": {
                  border: !false
                    ? "1px solid var(--secondary50) !important"
                    : "1px solid var(--error50) !important",
                },
              }}
              id="response"
              variant="outlined"
              placeholder="Response"
              autoComplete="Response"
            />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                sx={{
                  mt: 1,
                  textTransform: "none",
                  borderRadius: "0.625rem",
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  color: "white",
                  backgroundColor: "var(--primary)",
                  "&:hover": {
                    backgroundColor: "var(--primary75)",
                  },
                  "&:disabled": {
                    backgroundColor: "var(--secondary15)",
                    color: "var(--secondary35)",
                  },
                }}
                //   variant="outlined"
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
        {successMsg && (
          <Typography
            sx={{
              //   ml: 2,
              //   pl: "1.5rem",
              mt: 2,
              width: "60%",
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--success75)",
            }}
          >
            Success
          </Typography>
        )}
        {errorMsg && (
          <Typography
            sx={{
              //   ml: 2,
              pl: "1.5rem",
              mt: 4,
              width: "60%",
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--error75)",
            }}
          >
            There was an error. Please try again later
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
