import {
  Card,
  CardContent,
  List,
  ListItem,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  ListItemIcon,
  ListItemText,
  FormControl,  
} from "@mui/material";
import { useState, useContext } from "react";
import axios from "axios"
import { setKey, fromAddress, setLocationType } from "react-geocode"
import { time12 } from "../../../functions/formatData";
import DevelopmentsContext from "../../../contexts/DevelopmentsContext"
import useSWR from "swr";
import dayjs from "dayjs";
import { fetcher } from "../../../api/fetcher";
import SvgIcon from "@mui/material/SvgIcon";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material";
import { colors } from "../../../../theme";

setKey(import.meta.env.VITE_GEOCODE_KEY);
setLocationType("ROOFTOP");

export default function ListDevelopments() {
   const theme = useTheme();
    const color = colors(theme.palette.mode);
  const today = dayjs();
  const { developments, refreshDevelopments: refresh } =
    useContext(DevelopmentsContext);
  const developmentsList = Array.isArray(developments) ? developments : [];
  const token = localStorage.getItem("token");
  const { data: people } = useSWR(
    token ? "http://localhost:8000/api/people/" : null,
    fetcher,
  );
  const { data: organization } = useSWR(
    token ? "http://localhost:8000/api/organizations/" : null,
    fetcher,
  );

  const [type, setType] = useState();
  const [date, setDate] = useState(today.format("YYYY-MM-DD"));
  const [time, setTime] = useState("08:00:00");
  const [endTime, setEndTime] = useState("09:00:00");
  const [status, setStatus] = useState("scheduled");
  const [note, setNote] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState(84062);
  const [peopleID, setPeopleID] = useState("");
  const [organizationID, setOrganizationID] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [open, setOpen] = useState(false);
  const [selectTypeContact, setSelectTypeContact] = useState("");
  const [selectPerson, setSelectPerson] = useState("");


  //  console.log('setLatitude:',latitude)
  //   console.log('setLongitude:',longitude)

  const handleClickOpen = (development) => {
    setOpen(true);
    setSelectTypeContact(development.people ? "Person" : "Organization");
    setSelectPerson(development.people ? development.people : development.organization);
    setType(development.type);
    setDate(development.date);
    setTime(development.time);
    setEndTime(development.end_time);
    setStatus(development.status);
    setNote(development.note);
    setStreet(development.street);
    setCity(development.city);
    setState(development.state);
    setZipCode(development.zip_code);
    setLatitude(development.lat);
    setLongitude(development.lng);
    development.people ? setPeopleID(development.people) : setOrganizationID(development.organization);
    console.log('timeOpen',development.time)

  };
 

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (e) => {
    setSelectTypeContact(e.target.value);
  };

  const geocode = async () => {
    const address = `${street} ${city} ${state} ${zipCode}`;
    if (address) {
      try {
        const { results } = await fromAddress(address);
        const { lat, lng } = results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        // console.log('geoLat:', lat);
        // console.log('geoLng:', lng);
        return { lat, lng };
      } catch (error) {
        console.error(error);
      }
    }
    return { lat: latitude, lng: longitude };
  };

  async function handleEdit (id) {
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
      lat: latitude,
      lng: longitude,
    };
    console.log('timeObj',developmentObject)
    try {
      await geocode();
      await axios.put(`http://localhost:8000/api/developments/${id}`, developmentObject,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      );
      await refresh();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/developments/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    await refresh();
  };

  return (
    <>
      <Card elevation={1} sx={{ borderRadius: 4, pb:2,}}>
        <CardContent>
          <Typography variant="subtitle">Schedule</Typography>
          {developmentsList.map((development, index) => (
            <List>
              <ListItem key={index}>
                <ListItemIcon>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke={`${color.primary[500]}`}
                      overflow="visible">
                      <circle  stroke="1"
                        stroke-width="3" fill="none" cx="15" cy="12" r="8" />
                      <line
                        x1="15"
                        y1="19"
                        x2="15"
                        y2="71"
                        stroke="1"
                        stroke-width="3"
                      />
                    </svg>
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="details">
                      <Box
                        component="summary"
                        sx={{
                          cursor: "pointer",
                          listStyle: "none",
                          display: "flex",
                          alignItems: "center",
                          "&::-webkit-details-marker": {
                            display: "none",
                          },
                        }}>
                       {`${time12(development?.time)} - ${time12(development?.end_time)} ${development?.type}`}
                        <InfoOutlinedIcon sx={{ pl: 1, color: `${color.secondary[500]}` }} />
                      </Box>
                      <Box sx={{ mt: 0 }}>
                        <Typography component="span"
                          variant="body3"
                          sx={{ color: "text.primary"}}>
                  {development?.people_name} {development?.organization_title}

                        </Typography>
                          <Typography  variant="body2" sx={{ color: "text.secondary"}}> 
                            {`${development?.street} `}
                            <br/>
                            {`${development?.city} ${development?.state} ${development?.zip_code}`}
                          </Typography>
                        {development?.note}
                      </Box>
                    </Box>
                  }
                />
                <Button
                    sx={{ ml: 0 }}
                    onClick={() => handleClickOpen(development)}>
                    Edit
                  </Button>
                  <Button
                    sx={{ mr: 1, color: `${color.error[600]}` }}
                    onClick={() => handleDelete(development.id)}>
                    Delete
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                  <Box
                    autoComplete="on"
                    sx={{
                      display: "grid",
                      direction: "row",
                    }}>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{
                          display: "grid",
                          gridRow: { xs: 1, sm: 1, md: 2, lg: 3 },
                          gap: 2,
                          m: 1,
                        }}
                        onSubmit={(e) => { e.preventDefault(); handleEdit(development.id); }}
                        >
                        <FormControl fullWidth>
                          <InputLabel id="development-type">Type</InputLabel>
                          <Select
                            labelId="development-type"
                            label="Type"
                            defaultValue={type}
                            onChange={(e) => setType(e.target.value)}
                            fullWidth>
                            <MenuItem value={"Meeting"}>Meeting</MenuItem>
                            <MenuItem value={"Visit"}>Visit</MenuItem>
                            <MenuItem value={"Event"}>Event</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <InputLabel id="development-contact-label">
                            Contact
                          </InputLabel>
                          <Select
                            labelId="development-contact-label"
                            label="contact"
                            defaultValue={selectTypeContact}
                            onChange={handleSelect}
                            fullWidth>
                            <MenuItem value={"Person"}>Person</MenuItem>
                            <MenuItem value={"Organization"}>
                              Organization
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <Box sx={{ gridRow: { xs: 1, sm: 1, md: 2, lg: 3 } }}>
                          <FormControl>
                            <InputLabel id="development-person-label"></InputLabel>
                            <Select
                              labelId="development-person-label"
                              onChange={(e) => {
                                selectTypeContact === "Person" ?
                                  setPeopleID(e.target.value)
                                : setOrganizationID(e.target.value);
                              }}
                              defaultValue={selectPerson}
                              fullWidth>
                              {selectTypeContact === "Person" ?
                                people?.map((person) => (
                                  <MenuItem key={person.id} value={person.id}>
                                    {person.first_name} {person.last_name}
                                  </MenuItem>
                                ))
                              : null}
                              {selectTypeContact == "Organization" ?
                                organization?.map((organization) => (
                                  <MenuItem
                                    key={organization.id}
                                    value={organization.id}>
                                    {organization.title}
                                  </MenuItem>
                                ))
                              : null}
                            </Select>
                          </FormControl>
                        </Box>
                        <TextField
                          label="Street"
                          variant="outlined"
                          defaultValue={street}
                          onChange={(e) => setStreet(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="City"
                          variant="outlined"
                          defaultValue={city}
                          onChange={(e) => setCity(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="State"
                          variant="outlined"
                          defaultValue={state}
                          onChange={(e) => setState(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Zip Code"
                          variant="outlined"
                          defaultValue={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Notes"
                          id="standard-multiline-static"
                          multiline
                          rows={2.5}
                          variant="outlined"
                          defaultValue={note}
                          onChange={(e) => setNote(e.target.value)}
                          fullWidth
                          sx={{ gridRow: { xs: 2, md: 2, lg: 3 } }}
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Date"
                          type="date"
                          variant="outlined"
                          defaultValue={date}
                          onChange={(e) => setDate(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Start Time"
                          type="time"
                          variant="outlined"
                          defaultValue={time}
                          onChange={(e) => setTime(e.target.value) }

                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="End Time"
                          type="time"
                          variant="outlined"
                          defaultValue={endTime}
                          onChange={(e) => setEndTime(e.target.value) }
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <FormControl fullWidth>
                          <InputLabel id="development-status">Status</InputLabel>
                          <Select
                            labelId="development-status"
                            label="Status"
                            defaultValue={status}
                            onChange={(e) => setStatus(e.target.value)}
                            fullWidth>
                            <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
                            <MenuItem value={"Completed"}>Completed</MenuItem>
                            <MenuItem value={"Canceled"}>Canceled</MenuItem>
                          </Select>
                        </FormControl>
                        <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">
                        Submit
                      </Button>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                     
                    </DialogActions>
                  </Box>
                </Dialog>
              </ListItem>
            </List>
          ))}          
        </CardContent>
      </Card>
    </>
  );
}
