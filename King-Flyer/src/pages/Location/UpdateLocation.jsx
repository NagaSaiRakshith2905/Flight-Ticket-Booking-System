import {
  Backdrop,
  Button,
  Fade,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 275,
  bgcolor: "#eee",
  border: "1px solid rgb(65, 65, 65)",
  borderRadius: "15px",
  p: 2,
};

const UpdateLocation = ({
  openUpdate,
  setOpenUpdate,
  credentials,
  data,
  setRowData,
}) => {
  const [loading, setLoading] = useState(false);

  async function update(event) {
    event.preventDefault();
    if (
      data.name.length > 0 &&
      data.airportName.length > 0 &&
      data.code.length > 0 &&
      data.country.length > 0
    ) {
      setLoading(true);
      const jsonData = JSON.stringify(data);
      const url = "http://localhost:8080/api/location/update";
      console.log(url, " : ", jsonData);
      await axios
        .put(url, jsonData, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.access_token}`,
          },
        })
        .then((res) => {
          console.log(res.data, res.status);
          if (res.status === 201) alert("added new location sucessfully");
          setLoading(false);
          setOpenUpdate(false);
        });
    } else {
      alert("fill all the details");
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openUpdate}
      onClose={(e) => setOpenUpdate(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openUpdate}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h4" component="h2">
            Update Location
          </Typography>

          <Box sx={{ mt: 2, mb: 2 }}></Box>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="City Name*"
                  fullWidth
                  value={data.name}
                  onChange={(e) => {
                    setRowData({ ...data, name: e.target.value });
                  }}
                  placeholder="City Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Airport Name*"
                  value={data.airportName}
                  onChange={(e) => {
                    setRowData({ ...data, airportName: e.target.value });
                  }}
                  placeholder="Airport Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Code*"
                  value={data.code}
                  onChange={(e) => {
                    setRowData({ ...data, code: e.target.value });
                  }}
                  placeholder="code"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Country*"
                  value={data.country}
                  onChange={(e) => {
                    setRowData({ ...data, country: e.target.value });
                  }}
                  placeholder="country"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={1}>
            <Grid item xs={12}>
              <LoadingButton
                size="large"
                fullWidth
                onClick={update}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                color="warning"
              >
                update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateLocation;
