import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AlertDialogSlide from "./Dialog";
import AlertDialogSlideForEndpoint from "./EndpointRatelimiting";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { getServiceFormData } from "../../redux/formSubmit/formSubmitSlice";
import ChipTextField from "../Chips/ChipTextField";
import Chipcheckbox from "../Chips/Chipcheckbox";
import CheckboxesTags from "../Chips/Chipcheckbox";

const initialEndpointValue = {
  krakend_endpoint: "",
  http_method: "GET",
  parameters: "",
  headers_passing_to_backend: "",
  concurrent_calls: "",
  url_pattern: "",
  endpoint_http_method: "GET",
  host_names: [],
};

const initialDialogValues = {
  rate_limit: "",
  user_quota: "",
};

const initialEndpointDialogValues = {
  endpoint_rate_limit: "",
  Capacity_burstsize: "",
};

const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formInpuValues, setFormInpuValues] = useState(initialEndpointValue);
  const [getDialogInputValues, setgetDialogInputValues] =
    useState(initialDialogValues);
  const [getEndpointRatelimitDialog, setgetEndpointRatelimitDialog] = useState(
    initialEndpointDialogValues
  );

  const callbackParameters = useCallback((value) => {
    console.log(value);
    setFormInpuValues({ ...formInpuValues, parameters: value });
  });

  const callbackHostName = useCallback((value) => {
    setFormInpuValues({ ...formInpuValues, host_names: value });
  });

  const callbackDialog = useCallback((value) => {
    setgetDialogInputValues(value);
  });

  const callbackEndpoint = useCallback((value) => {
    setgetEndpointRatelimitDialog(value);
  });

  const formInputHandleChange = (e) => {
    setFormInpuValues({ ...formInpuValues, [e.target.name]: e.target.value });
  };

  const { setEndpointCollectionProp } = props;

  const [checked, setChecked] = useState(false);

  const handleCheckInput = (e) => {
    setChecked(e.target.checked);
  };

  console.log(checked);
  const handleSubmit = (e) => {
    const data = {
      endpoint: formInpuValues.krakend_endpoint,
      method: formInpuValues.http_method,
      extra_config: {
        qos_ratelimit_router: {
          max_rate: parseInt(getDialogInputValues.rate_limit),
          client_max_rate: parseInt(getDialogInputValues.user_quota),
        },
      },
      input_query_strings: [...formInpuValues.parameters],
      input_headers: [formInpuValues.headers_passing_to_backend],
      concurrent_calls: parseInt(formInpuValues.concurrent_calls),
      backend: [
        {
          extra_config: {
            qos_ratelimit_proxy: {
              max_rate: parseInt(
                getEndpointRatelimitDialog.endpoint_rate_limit
              ),
              capacity: parseInt(getEndpointRatelimitDialog.Capacity_burstsize),
            },
          },
          url_pattern: formInpuValues.url_pattern,
          method: formInpuValues.endpoint_http_method,
          host: formInpuValues.host_names,
        },
      ],
    };

    console.log("each endpoints", JSON.stringify(data, null, 2));
    setEndpointCollectionProp({
      ...data,
      id: uuidv4(),
      title1: "/v1/new-endpoint",
    });
    handleClose();

    setFormInpuValues(initialEndpointValue);
    setgetDialogInputValues(initialDialogValues);
    setgetEndpointRatelimitDialog(initialEndpointDialogValues);
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<AddCircleIcon />}
        onClick={handleClickOpen}
      >
        Add Endpoint
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="flex justify-between items-center"
        >
          <span>Add Endpoint</span>
          <div>
            <IconButton aria-label="delete" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ marginTop: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <TextField
                  id="krakend_endpoint"
                  name="krakend_endpoint"
                  label="krakenD Endpoint"
                  variant="outlined"
                  placeholder="/users/{username}"
                  fullWidth
                  required
                  value={formInpuValues.krakend_endpoint}
                  onChange={formInputHandleChange}
                />
                <span className="textbox_hints">
                  This is the URI your clients will connect to.
                </span>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="http_method_label">Http methods</InputLabel>
                  <Select
                    labelId="http_method_label"
                    id="http_method"
                    name="http_method"
                    label="Http methods"
                    value={formInpuValues.http_method}
                    onChange={formInputHandleChange}
                  >
                    <MenuItem value={"GET"}>GET</MenuItem>
                    <MenuItem value={"PUT"}>PUT</MenuItem>
                    <MenuItem value={"POST"}>POST</MenuItem>
                    <MenuItem value={"DELETE"}>DELETE</MenuItem>
                  </Select>
                  <span className="textbox_hints">HTTP verb</span>
                </FormControl>
              </Grid>

              {/* <Grid item xs={6}>
                <TextField
                  id="parameters"
                  name="parameters"
                  label="Parameters"
                  variant="outlined"
                  placeholder="param_value"
                  fullWidth
                  value={formInpuValues.parameters}
                  onChange={formInputHandleChange}
                />
                <span className="textbox_hints">
                  Query string parameters to be passed to the backends when
                  present,no question mark or equal symbols.
                </span>
              </Grid> */}

              <Grid item xs={6}>
                <ChipTextField
                  id="parameters"
                  name="parameters"
                  label="Parameters"
                  placeholder="Parameters"
                  setHostNames={callbackParameters}
                />
                <span className="service_textbox_hints">
                  Query string parameters to be passed to the backends when
                  present,no question mark or equal symbols.
                </span>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="headers_passing_to_backend"
                  name="headers_passing_to_backend"
                  label="Headers passing to backend"
                  placeholder="header_name"
                  variant="outlined"
                  fullWidth
                  value={formInpuValues.headers_passing_to_backend}
                  onChange={formInputHandleChange}
                />
                <span className="textbox_hints">
                  Allowed headers to pass from client to each of the backends.
                </span>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="concurrent_calls"
                  name="concurrent_calls"
                  label="Concurrent Calls"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={formInpuValues.concurrent_calls}
                  onChange={formInputHandleChange}
                />
                <span className="textbox_hints">
                  Parallel requests you want to send to the backend for the same
                  request.
                </span>
              </Grid>

              {/*  rate limit dialog screen */}
              <Grid item xs={3}>
                <AlertDialogSlide setDialogData={callbackDialog} />
              </Grid>

              <Grid item xs={12}>
                <hr
                  style={{
                    height: 0.5,
                    backgroundColor: "rgb(128,0,0)",
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Divider />

                <Typography variant="body1">Add Backend Inputs</Typography>
              </Grid>
            </Grid>

            {/* ....second form for backend query.......................  */}

            <Grid container spacing={3} sx={{ marginTop: 0.5 }}>
              <Grid item xs={6}>
                <TextField
                  id="url_pattern"
                  name="url_pattern"
                  label="Backend Endpoint"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  value={formInpuValues.url_pattern}
                  onChange={formInputHandleChange}
                />
                <span className="textbox_hints">
                  The endpoint of the backend server to query. Reuse here any
                  parameters defined in the parent endpoint.
                </span>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="http_method_label">Http methods</InputLabel>
                  <Select
                    labelId="http_method_label"
                    id="endpoint_http_method"
                    name="endpoint_http_method"
                    label="Http methods"
                    value={formInpuValues.endpoint_http_method}
                    onChange={formInputHandleChange}
                  >
                    <MenuItem value={"GET"}>GET</MenuItem>
                    <MenuItem value={"PUT"}>PUT</MenuItem>
                    <MenuItem value={"POST"}>POST</MenuItem>
                    <MenuItem value={"DELETE"}>DELETE</MenuItem>
                  </Select>
                </FormControl>
                <span className="textbox_hints">HTTP verb</span>
              </Grid>

              {/*  rate limit dialog for endpoint screen */}
              <Grid item xs={3} className="flex items-center">
                <AlertDialogSlideForEndpoint
                  setEndpointDialogData={callbackEndpoint}
                />
              </Grid>
              {/* <Grid item xs={3}>
                <div className="text-lg ">Select Host</div>
                <FormControlLabel
                  label={hostName}
                  control={
                    <Checkbox checked={checked} onChange={handleCheckInput} />
                  }
                />
              </Grid> */}

              <Grid item xs={3}>
                <div className="text-lg ">Select Host</div>
                <CheckboxesTags
                  checkedHostNames={callbackHostName}
                  // label={hostName}
                  // control={
                  //   <Checkbox checked={checked} onChange={handleCheckInput} />
                  // }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ marginRight: 3 }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
