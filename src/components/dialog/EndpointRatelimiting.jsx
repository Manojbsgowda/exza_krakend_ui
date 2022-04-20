import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import { InputBase } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsApplicationsTwoToneIcon from "@mui/icons-material/SettingsApplicationsTwoTone";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlideForEndpoint(props) {
  const { setEndpointDialogData } = props;

  const [inputValue, setinputValue] = React.useState({
    endpoint_rate_limit: "",
    Capacity_burstsize: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setinputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const addRateLimit = () => {
    handleClose();
    const data = {
      endpoint_rate_limit: inputValue.endpoint_rate_limit,
      Capacity_burstsize: inputValue.Capacity_burstsize,
    };
    setEndpointDialogData(data);
    // console.log(data);
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<OfflineBoltIcon className="animate-pulse " />}
        onClick={handleClickOpen}
      >
        Endpoint Rate limit
      </Button>
      <span className="textbox_hints">
        Limit the number of requests this backend will receive.
      </span>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Rate limit requests to /</span>
          <span></span>
          <div>
            <IconButton aria-label="delete" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="endpoint">Rate limit</InputLabel>
                <OutlinedInput
                  id="endpoint_rate_limit"
                  name="endpoint_rate_limit"
                  label="Rate limit"
                  variant="outlined"
                  type="number"
                  value={inputValue.endpoint_rate_limit}
                  onChange={handleInputChange}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        color="success"
                        aria-label="toggle password visibility"
                        edge="end"
                        disabled
                      >
                        <p style={{ fontSize: 16 }}>reqs/sec</p>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{ fontSize: 15, marginLeft: 1.5 }}
              >
                Maximum requests per second you want to accept in this backend.
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="user_quota">Capacity Burst </InputLabel>
                <OutlinedInput
                  id="Capacity_burstsize"
                  name="Capacity_burstsize"
                  label="Capacity (burst size)"
                  variant="outlined"
                  type="number"
                  value={inputValue.Capacity_burstsize}
                  onChange={handleInputChange}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        color="success"
                        aria-label="toggle password visibility"
                        edge="end"
                        disabled
                      >
                        <p style={{ fontSize: 16 }}>reqs/sec</p>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{ fontSize: 15, marginLeft: 1.2 }}
              >
                Recommended value capacity=max_rate. A token bucket algorithm is
                used with a bucket capacity == tokens added per second. KrakenD
                is able to allow bursting on the request rates.
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ marginRight: 1, marginBottom: 1 }}>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button variant="contained" onClick={addRateLimit}>
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
