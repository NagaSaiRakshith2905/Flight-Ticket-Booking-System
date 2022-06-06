import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "../../App.css";
import AddLocation from "./AddLocation";
import UpdateLocation from "./UpdateLocation";

function Location({ isLoggedIn, credentials }) {
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [rowData, setRowData] = useState({
    id: 0,
    name: "",
    airportName: "",
    code: "",
    country: "",
  });
  async function search(event) {
    event.preventDefault();
    const url = "http://localhost:8080/api/location/get_all";
    console.log(url);
    await axios
      .get(url, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      });
  }
  return (
    <div className="Main">
      {isLoggedIn ? (
        <div className="">
          <h1 className="title">Location Details</h1>
          <Button
            variant="contained"
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
              marginBottom: "30px",
            }}
            onClick={search}
          >
            view
          </Button>

          <Button
            variant="contained"
            sx={{ marginLeft: "10px", marginBottom: "30px" }}
            onClick={(e) => setOpen(true)}
            color="success"
          >
            add
          </Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>City</TableCell>
                  <TableCell align="left">Airport Name</TableCell>
                  <TableCell align="left">Code</TableCell>
                  <TableCell align="left">Country</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              {result !== null
                ? result.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.airportName}</TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="left">{row.country}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          size="small"
                          color="warning"
                          onClick={(e) => {
                            setRowData({
                              id: row.id,
                              name: row.name,
                              airportName: row.airportName,
                              code: row.code,
                              country: row.country,
                            });
                            setOpenUpdate(true);
                          }}
                        >
                          update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : ""}
            </Table>
          </TableContainer>
          <AddLocation
            open={open}
            setOpen={setOpen}
            credentials={credentials}
          />
          <UpdateLocation
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            credentials={credentials}
            data={rowData}
            setRowData={setRowData}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Location;
