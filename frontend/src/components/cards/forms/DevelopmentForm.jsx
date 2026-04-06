import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState, useContext } from "react";
import axios from "axios";
import { setKey, fromAddress, setLocationType } from "react-geocode";
import useSWR from "swr";
import DevelopmentsContext from "../../../contexts/DevelopmentsContext";
import dayjs from "dayjs";
import {fetcher} from "../../../api/fetcher";

setKey(import.meta.env.VITE_GEOCODE_KEY)
setLocationType("ROOFTOP")

export default function DevelopmentForm() {
  const { refreshDevelopments: refresh } = useContext(DevelopmentsContext);
  const token = localStorage.getItem("token");
  const { data: people = [] } = useSWR(token ? "http://localhost:8000/api/people/" : null, fetcher);
  const { data: organization = [] } = useSWR(
    token ? "http://localhost:8000/api/organizations/" : null, fetcher
  );
  const today = dayjs();

  const [type, setType] = useState("");
  const [date, setDate] = useState(today.format("YYYY-MM-DD"));
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Pending");
  const [note, setNote] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [peopleID, setPeopleID] = useState("");
  const [organizationID, setOrganizationID] = useState("");
  const lat = 0;
  const lng = 0;
  const [selectTypeContact, setSelectTypeContact] = useState("");
  const [selectType, setSelectType] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSelect = (e) => {
    setSelectTypeContact(e.target.value);
  };

  const handleSelectType = (e) => {
    setSelectType(e.target.value);
    setType(e.target.value);
  };

  async function handleSubmit() {
    const developmentObject = {
      type: type,
      date: date,
      time: time,
      end_time: endTime,
      status: status,
      note: note,
      street: street,
      city: city,
      state: state,
      zip_code: zipCode,
      people: peopleID,
      organization: organizationID,
      lat: lat,
      lng: lng,
    };
    const address = `${street} ${city} ${state} ${zipCode}`;
    if (zipCode) {
      await fromAddress(address)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          developmentObject.lat = lat;
          developmentObject.lng = lng;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    await axios.post("http://localhost:8000/api/developments/", developmentObject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    await refresh();
  }

  async function handleAdd() {
    const personObject = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      street: street,
      city: city,
      state: state,
      zip_code: zipCode,
    };
    const organizationObject = {
      title: title,
      website: website,
      phone: phone,
      email: email,
      street: street,
      city: city,
      state: state,
      zip_code: zipCode,
    };

    if (selectTypeContact === "Person") {
      await axios.post("http://localhost:8000/api/people/", personObject ,{
      headers: {
        Authorization: `Token ${token}`,
      },
    }
      );
    }
    if (selectTypeContact === "Organization") {
      await axios.post(
        "http://localhost:8000/api/organizations/",
        organizationObject,
        {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
      );
    }
  }


  

  return (
    <>
      <Card elevation={2} sx={{ borderRadius: 4}} >
        <CardContent>
          <Typography variant="subtitle">New Development</Typography>
          <Typography variant="subtitle2" color="teal">*Addresses will show on the map</Typography>
           <Box component="form" autoComplete="on" sx={{pt:2,}} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} >
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 1.8 }}
              columns={{ md: 11 }}
              sx={{p:1}}
              >                
              <Grid size={{ xs: 5, sm: 5, md: 5, lg: 1.5 }}>                
                <FormControl fullWidth>
                  <InputLabel id="development-type">Type</InputLabel>
                  <Select
                  MenuProps={{ disableScrollLock: true }}
                    labelId="development-type"
                    label="Type"
                    value={selectType}
                    onChange={handleSelectType}
                    fullWidth
                    required
                    >
                    <MenuItem value={"Meeting"}>Meeting</MenuItem>
                    <MenuItem value={"Event"}>Visit</MenuItem>
                    <MenuItem value={"Event"}>Event</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 4, sm: 4, md: 4, lg: 1.5 }}>
                
                <FormControl fullWidth>
                  <InputLabel id="development-contact">Contact</InputLabel>
                  <Select
                  MenuProps={{ disableScrollLock: true }}
                    labelId="development-contact"
                    label="Contact"
                    value={selectTypeContact}
                    onChange={handleSelect}
                    fullWidth>
                    <MenuItem value={"Person"}>Person</MenuItem>
                    <MenuItem value={"Organization"}>Organization</MenuItem>
                  </Select>
                </FormControl>
                
              </Grid>
              <Grid sx={{ml:-1, mr:-3}}size={{ xs: 4, sm: 4, md: 4, lg: 1.8 }}>
              <Button
                sx={{ m: 1,p:.5 }}
                variant="outlined"
                onClick={() => handleClickOpen()}>
                Add Contact
              </Button>
              </Grid>
              <Grid size={{ xs: 5, sm: 5, md: 5, lg: 3 }}>
                
                <FormControl fullWidth>
                  <InputLabel id="development-list">List</InputLabel>
                  <Select
                  MenuProps={{ disableScrollLock: true }}
                    labelId="development-list"
                    label="List"
                    value={
                      selectTypeContact === "Person" ? peopleID : organizationID
                    }
                    onChange={(e) => {
                      selectTypeContact === "Person" ?
                        setPeopleID(e.target.value)
                      : setOrganizationID(e.target.value);
                    }}>
                    {selectTypeContact === "Person" ?
                      people?.map((person) => (
                        <MenuItem key={person.id} value={person.id}>
                          {person.first_name} {person.last_name}
                        </MenuItem>
                      ))
                    : null}
                    {selectTypeContact == "Organization" ?
                      organization?.map((organization) => (
                        <MenuItem key={organization.id} value={organization.id}>
                          {organization.title}
                        </MenuItem>
                      ))
                    : null}
                  </Select>
                </FormControl>

                <Dialog open={open} onClose={handleClose}>
                  <Box
                    component="form"
                    autoComplete="on"
                    sx={{
                      display: "grid",
                      direction: "row",
                    }}
                    onSubmit={(e) => { e.preventDefault(); handleAdd(); }}
                    >
                      
                    <DialogContent>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "2fr 2fr",
                          },
                          gap: 2,
                          m: 0,
                        }}>
                        {selectTypeContact === "Person" ?
                          <>
                            <DialogTitle>Add Person</DialogTitle>
                            <br></br>

                            <TextField
                              variant="outlined"
                              label="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              fullWidth
                              required
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                              variant="outlined"
                              label="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              fullWidth
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                          </>
                        : <>
                            <DialogTitle>Add Organization</DialogTitle>
                            <br></br>
                            <TextField
                              variant="outlined"
                              label="Title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              fullWidth
                              required
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                              variant="outlined"
                              label="Website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              fullWidth
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                          </>
                        }

                        <TextField
                          variant="outlined"
                          label="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          variant="outlined"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Street"
                          variant="outlined"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="City"
                          variant="outlined"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="State"
                          variant="outlined"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Zip Code"
                          variant="outlined"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Submit</Button>
                    </DialogActions>
                  </Box>
                </Dialog>
              </Grid>
             
              <Grid size={{ xs: 8, sm: 5, md: 5, lg: 2.5 }}>
                <TextField
                  label="Street"
                  variant="outlined"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 5, sm: 4, md: 4, lg: 2 }}>
                <TextField
                  label="City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 4, sm: 2, md: 2, lg: .8 }}>
                <TextField
                  label="State"
                  variant="outlined"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 4, sm: 4, md: 4, lg: 1 }}>
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 5, md: 5, lg: 3 }}>
                <TextField
                  label="Notes"
                  id="standard-multiline-static"
                  multiline
                  rows={3}
                  variant="outlined"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 5, sm: 5, md: 5, lg: 2 }}>
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  pattern="\d{2}-\d{2}-\d{4}"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  required
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 3, lg: 1 }}>
                <TextField
                  label="Time"
                  type="time"
                  variant="outlined"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  fullWidth
                  required
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 3, lg: 1 }}>
                <TextField
                  label="End Time"
                  type="time"
                  variant="outlined"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 5, sm: 4, md: 4, lg: 1.5 }}>
                <FormControl fullWidth>
                  <InputLabel id="development-status">Status</InputLabel>
                  <Select
                    labelId="development-status"
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                    required
                    >
                    <MenuItem value={"scheduled"}>Scheduled</MenuItem>
                    <MenuItem value={"completed"}>Completed</MenuItem>
                    <MenuItem value={"canceled"}>Canceled</MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" sx={{justifyContent: "flex-end",
    alignItems: "flex-end",}} size={{ xs: 10.8, sm: 10.8, md: 10.9, lg:11.9 }}>
          <Button sx={{ mt: 0 }} variant="contained" type="submit">
            Submit
          </Button>
          </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
