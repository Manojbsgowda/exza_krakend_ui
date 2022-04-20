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
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { setDialogData } = props;
  const initialDialogValues = {
    rate_limit: "",
    user_quota: "",
  };

  const [inputValue, setinputValue] = useState(initialDialogValues);
  const handleInputChange = (e) => {
    setinputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addRateLimit = () => {
    handleClose();
    const data = {
      rate_limit: inputValue.rate_limit,
      user_quota: inputValue.user_quota,
    };
    setDialogData(data);
    // console.log(data);
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<SettingsIcon className="animate-spin " />}
        onClick={handleClickOpen}
      >
        Rate limiting
      </Button>
      <span className="textbox_hints ml-4">
        Enable usage limits for this endpoint
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
          <span>Rate limiting (throttling)</span>
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
              {/* <TextField
                sx={{ padding: "2px" }}
                id="rate_limit"
                name="rate_limit"
                label="Rate limit"
                variant="outlined"
                type="number"
                fullWidth
              /> */}
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="endpoint">Rate limit</InputLabel>
                <OutlinedInput
                  id="rate_limit"
                  name="rate_limit"
                  label="Rate limit"
                  variant="outlined"
                  type="number"
                  value={inputValue.rate_limit}
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
                Maximum requests per second you want to let this endpoint
                handle. Leave 0 for no default limit.
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="user_quota">user quota </InputLabel>
                <OutlinedInput
                  id="user_quota"
                  name="user_quota"
                  label="User Quota"
                  variant="outlined"
                  type="number"
                  value={inputValue.user_quota}
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
                Maximum requests per second you want to allow to each different
                API user.Use 0 for no limitation.
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
