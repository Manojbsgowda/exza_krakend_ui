import React, { useState } from "react";
import "./createApi.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import Home from "../home/Home";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreateApi = () => {
  const navigate = useNavigate();
  const initialValues = {
    apiName: "",
    context: "",
    version: "",
    endpoint: "",
  };
  const [textInputValues, setTextInputValues] = useState(initialValues);
  const [validation, setValidation] = useState(false);

  const handleTextInput = (e) => {
    setTextInputValues({ ...textInputValues, [e.target.name]: e.target.value });
  };
  // console.log(textInputValues);
  const handleBlurTextInput = () => {
    setValidation(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      apiname: textInputValues.apiName,
      context: textInputValues.context,
      version: textInputValues.version,
      endpoint: textInputValues.endpoint,
    };

    console.log(JSON.stringify(data));
    axios
      .post("http://localhost:5000/create_api/create", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("SUCCESS");
        setTextInputValues(initialValues);
        toast.success("API Added Successfully");
        console.log(res?.data);
        console.log("Form Submitted");
      })
      .catch((err) => {
        console.log(err.response);
        if (err?.response?.status == "409") {
          return toast.error(err?.response?.data?.message);
        } else {
          return toast.error(err?.response?.statusText);
        }
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  console.log(textInputValues.apiName === "");
  console.log(validation);
  console.log("codition", validation && textInputValues.apiName === "");
  let buttonState;

  if (
    textInputValues.apiName !== "" &&
    textInputValues.context !== "" &&
    textInputValues.version !== "" &&
    textInputValues.endpoint !== ""
  ) {
    buttonState = false;
  } else {
    buttonState = true;
  }

  return (
    <>
      <main className="create_api_container">
        <div class="apipage_title_container">
          <p id="para_1" className="title">
            Create An API
          </p>
          <p id="para_2" className="title">
            Create an API by providing Api Name, Context, Version, Endpoint
          </p>
        </div>
        <Paper elevation={3} sx={{ maxWidth: "60vw" }}>
          <Box component="form" sx={{ padding: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="apiName"
                  name="apiName"
                  label="API Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  value={textInputValues.apiName}
                  // onFocus={() => setValidation(true)}
                  onChange={handleTextInput}
                  onBlur={handleBlurTextInput}
                  error={validation && textInputValues.apiName === ""}
                  helperText={
                    validation && textInputValues.apiName === ""
                      ? "enter API name"
                      : null
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="context"
                  name="context"
                  label="Context"
                  variant="outlined"
                  fullWidth
                  required
                  value={textInputValues.context}
                  onChange={handleTextInput}
                  onBlur={handleBlurTextInput}
                  error={validation && textInputValues.context === ""}
                  helperText={
                    validation && textInputValues.context === ""
                      ? "enter valid context"
                      : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="version"
                  name="version"
                  label="Version"
                  variant="outlined"
                  fullWidth
                  required
                  value={textInputValues.version}
                  onChange={handleTextInput}
                  onBlur={handleBlurTextInput}
                  error={validation && textInputValues.version === ""}
                  helperText={
                    validation && textInputValues.version === ""
                      ? "enter version"
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="endpoint">EndPoint</InputLabel>
                  <OutlinedInput
                    id="endpoint"
                    name="endpoint"
                    required
                    value={textInputValues.endpoint}
                    onChange={handleTextInput}
                    onBlur={handleBlurTextInput}
                    error={validation && textInputValues.endpoint === ""}
                    helperText={
                      validation && textInputValues.endpoint === ""
                        ? "enter endpoint"
                        : null
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          color="success"
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="End-point"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    disabled={buttonState}
                    onClick={handleSubmit}
                  >
                    Create
                  </Button>
                  <Button
                    variant="contained"
                    disabled={buttonState}
                    onClick={handleSubmit}
                  >
                    Create &#38; Publish
                  </Button>
                  <Button color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </main>
    </>
  );
};

export default CreateApi;
