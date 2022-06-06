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

const AddLocation = ({ open, setOpen, credentials }) => {
  const [cityName, setCityName] = useState("Mysore");
  const [airportName, setAirportName] = useState(
    "Mysore International Airport"
  );
  const [code, setCode] = useState("MYS");
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);

  async function add(event) {
    event.preventDefault();
    if (
      cityName !== null &&
      airportName !== null &&
      code !== null &&
      country !== null
    ) {
      setLoading(true);
      const data = {
        name: cityName,
        airportName: airportName,
        code: code,
        country: country,
      };
      const jsonData = JSON.stringify(data);
      const url = "http://localhost:8080/api/location/add";
      console.log(url," : ",jsonData);
      await axios
        .post(url, jsonData, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.access_token}`,
          },
        })
        .then((res) => {
          console.log(res.data,res.status);
          if (res.status === 201) alert("added new location sucessfully");
          setLoading(false);
          setOpen(false);
        });
    } else {
      alert("fill all the details");
    }
  }

  const pay = async (e) => {
    e.preventDefault();
    // if (cityName !== null && airportName !== null && code !== null && country !== null) {
    setLoading(true);
    await setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
    // } else {
    //   alert("fill all card details");
    // }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={(e) => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h4" component="h2">
            Add new location
          </Typography>

          <Box sx={{ mt: 2, mb: 2 }}></Box>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="City Name*"
                  fullWidth
                  value={cityName}
                  onChange={(e) => {
                    setCityName(e.target.value);
                    console.log(e.target.value);
                  }}
                  placeholder="City Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Airport Name*"
                  value={airportName}
                  onChange={(e) => setAirportName(e.target.value)}
                  placeholder="Airport Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Code*"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="code"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Country*"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
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
                onClick={add}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                color="success"
              >
                add
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddLocation;
