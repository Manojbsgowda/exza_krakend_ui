import React, { useState, useCallback } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FormDialog from "../../components/dialog/FormDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialogSlide from "../../components/dialog/Dialog";
import AlertDialogSlideForEndpoint from "../../components/dialog/EndpointRatelimiting";
import { useDispatch } from "react-redux";
import {
  endpointsFormData,
  setIsDownload,
} from "../../redux/formSubmit/formSubmitSlice";

const Endpoint = () => {
  const dispatch = useDispatch();
  const [enpointCollections, setEnpointCollections] = useState([]);

  const callbackEnpoints = useCallback((value) => {
    console.log(value);
    setEnpointCollections([...enpointCollections, value]);
  });

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteEndpoint = (id) => {
    setEnpointCollections(enpointCollections.filter((item) => item.id !== id));
  };

  const handleFinalSubmit = () => {
    console.log("final", JSON.stringify(enpointCollections, null, 2));
    dispatch(endpointsFormData(enpointCollections));
    dispatch(setIsDownload(false));
  };
  return (
    <main>
      <div>
        {enpointCollections?.map((value) => {
          return (
            <>
              <Accordion
                key={value.id}
                expanded={expanded === value.id}
                onChange={handleChange(value.id)}
              >
                <AccordionSummary
                  sx={{
                    backgroundColor: "#eee",
                    display: "flex",
                    alignContent: "center",
                    marginTop: "18px",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>{value.title1}</Typography>

                  <Box sx={{ flexGrow: 1 }} />
                  <div style={{ marginRight: 0 }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteEndpoint(value.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Box component="form" sx={{ marginTop: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={9}>
                        <TextField
                          id="krakend_endpoint"
                          name="krakend_endpoint"
                          label="krakenD Endpoint"
                          variant="outlined"
                          placeholder="/users/{username}"
                          value={value.krakend_endpoint}
                          fullWidth
                          required
                          autoFocus
                          // onChange={handleEndpointInputs}
                        />
                        <span className="textbox_hints">
                          This is the URI your clients will connect to.
                        </span>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <InputLabel id="http_method_label">
                            Http methods
                          </InputLabel>
                          <Select
                            labelId="http_method_label"
                            id="http_method"
                            name="http_method"
                            label="Http methods"
                            value={value.http_method}
                            // onChange={handleEndpointInputs}
                          >
                            <MenuItem value={"GET"}>GET</MenuItem>
                            <MenuItem value={"PUT"}>PUT</MenuItem>
                            <MenuItem value={"POST"}>POST</MenuItem>
                            <MenuItem value={"DELETE"}>DELETE</MenuItem>
                          </Select>
                          <span className="textbox_hints">HTTP verb</span>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          id="parameters"
                          name="parameters"
                          label="Parameters"
                          variant="outlined"
                          placeholder="param_value"
                          value={value.parameters}
                          // onChange={handleEndpointInputs}
                          fullWidth
                        />
                        <span className="textbox_hints">
                          Query string parameters to be passed to the backends
                          when present,no question mark or equal symbols.
                        </span>
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          id="headers_passing_to_backend"
                          name="headers_passing_to_backend"
                          label="Headers passing to backend"
                          placeholder="header_name"
                          value={value.headers_passing_to_backend}
                          // onChange={handleEndpointInputs}
                          variant="outlined"
                          fullWidth
                        />
                        <span className="textbox_hints">
                          Allowed headers to pass from client to each of the
                          backends.
                        </span>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          id="concurrent_calls"
                          name="concurrent_calls"
                          label="Concurrent Calls"
                          variant="outlined"
                          type="number"
                          value={value.concurrent_calls}
                          // onChange={handleEndpointInputs}
                          fullWidth
                        />
                        <span className="textbox_hints">
                          Parallel requests you want to send to the backend for
                          the same request.
                        </span>
                      </Grid>

                      {/*  rate limit dialog screen */}
                      <Grid item xs={3}>
                        <AlertDialogSlide
                        //  setDialogData={callbackDialog}
                        />
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

                        <Typography variant="body1">
                          Add Backend Inputs
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* ....second form for backend query.......................  */}

                    <Grid container spacing={3} sx={{ marginTop: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          id="url_pattern"
                          name="url_pattern"
                          label="Backend Endpoint"
                          value={value.url_pattern}
                          // onChange={handleEndpointInputs}
                          variant="outlined"
                          fullWidth
                          required
                        />
                        <span className="textbox_hints">
                          The endpoint of the backend server to query. Reuse
                          here any parameters defined in the parent endpoint.
                        </span>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <InputLabel id="http_method_label">
                            Http methods
                          </InputLabel>
                          <Select
                            labelId="http_method_label"
                            id="endpoint_http_method"
                            name="endpoint_http_method"
                            value={value.endpoint_http_method}
                            // onChange={handleEndpointInputs}
                            label="Http methods"
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
                        // setEndpointDialogData={callbackEndpoint}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      {/* <Button onClick={(event) => handleSubmit(event, value.id)}>
                      Add
                    </Button> */}
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </div>
      <div className="text-left mt-3 ml-3">
        <FormDialog setEndpointCollectionProp={callbackEnpoints} />
      </div>
      <div className="flex justify-start mt-2 ml-3">
        <Button
          variant="outlined"
          disabled={enpointCollections.length === 0 ? true : false}
          onClick={handleFinalSubmit}
        >
          Final Submit
        </Button>
      </div>
    </main>
  );
};

export default Endpoint;
