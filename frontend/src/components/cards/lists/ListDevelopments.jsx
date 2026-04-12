import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import { time12 } from "../../../functions/formatData";
import DevelopmentsContext from "../../../contexts/DevelopmentsContext";
import SvgIcon from "@mui/material/SvgIcon";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material/styles";
import { colors } from "../../../../theme";
import useDevelopmentForm from "../../../hooks/useDevelopmentForm";
import useContactForm from "../../../hooks/useContactForm";
import { useContext } from "react";

export default function ListDevelopments() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const { developments: developmentsList } = useContext(DevelopmentsContext);
  const { stateDev, setField, loadDevelopment, handleEdit, handleDelete } = useDevelopmentForm();
  const { stateContact, setContactField, people, organization } = useContactForm();

  return (
    <>
      <Card elevation={1} sx={{ borderRadius: 4, pb: 2 }}>
        <CardContent>
          <Typography variant="subtitle">Schedule</Typography>
          {developmentsList.map((development, index) => (
            <List key={index}>
              <ListItem>
                <ListItemIcon>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke={`${color.primary[500]}`}
                      overflow="visible"
                    >
                      <circle
                        stroke="1"
                        strokeWidth="3"
                        fill="none"
                        cx="15"
                        cy="12"
                        r="8"
                      />
                      <line
                        x1="15"
                        y1="19"
                        x2="15"
                        y2="71"
                        stroke="1"
                        strokeWidth="3"
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
                        }}
                      >
                        {`${time12(development?.time)} - ${time12(development?.end_time)} ${development?.type}`}
                        <InfoOutlinedIcon
                          sx={{ pl: 1, color: `${color.secondary[500]}` }}
                        />
                      </Box>
                      <Box sx={{ mt: 0 }}>
                        <Typography
                          component="span"
                          variant="body3"
                          sx={{ color: "text.primary" }}
                        >
                          {development?.people_name}{" "}
                          {development?.organization_title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {`${development?.street} `}
                          <br />
                          {`${development?.city} ${development?.state} ${development?.zip_code}`}
                        </Typography>
                        {development?.note}
                      </Box>
                    </Box>
                  }
                />
                <Button
                  sx={{ ml: 0 }}
                  onClick={() => loadDevelopment(development)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ mr: 1, color: `${color.error[600]}` }}
                  onClick={() => handleDelete(development.id)}
                >
                  Delete
                </Button>
              </ListItem>
            </List>
          ))}
        </CardContent>
      </Card>

      <Dialog open={stateDev.open} onClose={() => setField("open", false)}>
        <Box
          autoComplete="on"
          sx={{
            display: "grid",
            direction: "row",
          }}
        >
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
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(stateDev.editId);
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="development-type">Type</InputLabel>
                <Select
                  labelId="development-type"
                  label="Type"
                  value={stateDev.type}
                  onChange={(e) => setField("type", e.target.value)}
                  fullWidth
                >
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
                  value={stateDev.selectTypeContact}
                  onChange={(e) => setField("selectTypeContact", e.target.value)}
                  fullWidth
                >
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
                      stateDev.selectTypeContact === "Person"
                        ? setField("peopleID", e.target.value)
                        : setField("organizationID", e.target.value);
                    }}
                    value={
                      stateDev.selectTypeContact === "Person"
                        ? stateDev.peopleID
                        : stateDev.organizationID
                    }
                    fullWidth
                  >
                    {stateDev.selectTypeContact === "Person"
                      ? people?.map((person) => (
                          <MenuItem key={person.id} value={person.id}>
                            {person.first_name} {person.last_name}
                          </MenuItem>
                        ))
                      : null}
                    {stateDev.selectTypeContact === "Organization"
                      ? organization?.map((org) => (
                          <MenuItem
                            key={org.id}
                            value={org.id}
                          >
                            {org.title}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                label="Street"
                variant="outlined"
                value={stateDev.street}
                onChange={(e) => setField("street", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="City"
                variant="outlined"
                value={stateDev.city}
                onChange={(e) => setField("city", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="State"
                variant="outlined"
                value={stateDev.state}
                onChange={(e) => setField("state", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Zip Code"
                variant="outlined"
                value={stateDev.zipCode}
                onChange={(e) => setField("zipCode", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Notes"
                multiline
                rows={2.5}
                variant="outlined"
                value={stateDev.note}
                onChange={(e) => setField("note", e.target.value)}
                fullWidth
                sx={{ gridRow: { xs: 2, md: 2, lg: 3 } }}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                value={stateDev.date}
                onChange={(e) => setField("date", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Start Time"
                type="time"
                variant="outlined"
                value={stateDev.time}
                onChange={(e) => setField("time", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="End Time"
                type="time"
                variant="outlined"
                value={stateDev.endTime}
                onChange={(e) => setField("endTime", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <FormControl fullWidth>
                <InputLabel id="development-status">
                  Status
                </InputLabel>
                <Select
                  labelId="development-status"
                  label="Status"
                  value={stateDev.status}
                  onChange={(e) => setField("status", e.target.value)}
                  fullWidth
                >
                  <MenuItem value={"scheduled"}>Scheduled</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                  <MenuItem value={"canceled"}>Canceled</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={() => setField("open", false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </Box>
          </DialogContent>
          <DialogActions></DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
