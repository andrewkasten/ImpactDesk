import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import useDevelopmentForm from "../../../hooks/useDevelopmentForm";
import useContactForm from "../../../hooks/useContactForm";

export default function DevelopmentForm() {
  const { stateDev: state, setField, handleSubmit, formError, clearFormError } = useDevelopmentForm();
  const { stateContact, setContactField, handleContactSubmit, people, organization } = useContactForm(); 
  
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
                    value={state.type}
                    onChange={(e) => setField("type",e.target.value)}
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
                    value={stateContact.selectTypeContact}
                    onChange={(e) => setContactField("selectTypeContact",e.target.value)}
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
                onClick={() => setField("open", !state.open)}>
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
                      stateContact.selectTypeContact === "Person" ? state.peopleID : state.organizationID
                    }
                    onChange={(e) => {
                      stateContact.selectTypeContact === "Person" ?
                      setField("peopleID",e.target.value)
                      : 
                      setField("organizationID",e.target.value)
                    }}>
                    {stateContact.selectTypeContact === "Person" ?
                      people?.map((person) => (
                        <MenuItem key={person.id} value={person.id}>
                          {person.first_name} {person.last_name}
                        </MenuItem>
                      ))
                    : null}
                    {stateContact.selectTypeContact == "Organization" ?
                      organization?.map((organization) => (
                        <MenuItem key={organization.id} value={organization.id}>
                          {organization.title}
                        </MenuItem>
                      ))
                    : null}
                  </Select>
                </FormControl>

                <Dialog open={state.open} onClose={() => setField("open", !state.open)}>
                  <Box
                    component="form"
                    autoComplete="on"
                    sx={{
                      display: "grid",
                      direction: "row",
                    }}
                    onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}
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
                        {stateContact.selectTypeContact === "Person" ?
                          <>
                            <DialogTitle>Add Person</DialogTitle>
                            <br></br>

                            <TextField
                              variant="outlined"
                              label="First Name"
                              value={stateContact.firstName}
                              onChange={(e) => setContactField("firstName",e.target.value)}
                              fullWidth
                              required
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                              variant="outlined"
                              label="Last Name"
                              value={stateContact.lastName}
                              onChange={(e) => setContactField("lastName",e.target.value)}
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
                              value={stateContact.title}
                              onChange={(e) => setContactField("title",e.target.value)}
                              fullWidth
                              required
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                              variant="outlined"
                              label="Website"
                              type="url"
                              placeholder="https://example.com"
                              value={stateContact.website}
                              onChange={(e) => setContactField("website",e.target.value)}
                              fullWidth
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                          </>
                        }

                        <TextField
                          variant="outlined"
                          label="Phone"
                          value={stateContact.phone}
                          onChange={(e) => setContactField("phone",e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          variant="outlined"
                          label="Email"
                          type="email"
                          placeholder="name@example.com"
                          value={stateContact.email}
                          onChange={(e) => setContactField("email",e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Street"
                          variant="outlined"
                          value={stateContact.street}
                          onChange={(e) => setContactField("street",e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="City"
                          variant="outlined"
                          value={stateContact.city}
                          onChange={(e) => setContactField("city",e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="State"
                          variant="outlined"
                          value={stateContact.state}
                          onChange={(e) => setContactField("state",e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                          label="Zip Code"
                          variant="outlined"
                          value={stateContact.zipCode}
                          onChange={(e) => setContactField("zipCode",e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setField("open", !state.open)}>Cancel</Button>
                      <Button type="submit">Submit</Button>
                    </DialogActions>
                  </Box>
                </Dialog>
              </Grid>
             
              <Grid size={{ xs: 8, sm: 5, md: 5, lg: 2.5 }}>
                <TextField
                  label="Street"
                  variant="outlined"
                  value={state.street}
                  onChange={(e) => setField("street",e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 5, sm: 4, md: 4, lg: 2 }}>
                <TextField
                  label="City"
                  variant="outlined"
                  value={state.city}
                  onChange={(e) => setField("city",e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 4, sm: 2, md: 2, lg: .8 }}>
                <TextField
                  label="State"
                  variant="outlined"
                  value={state.state}
                  onChange={(e) => setField("state",e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 4, sm: 4, md: 4, lg: 1 }}>
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  value={state.zipCode}
                  onChange={(e) => setField("zipCode",e.target.value)}
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
                  value={state.note}
                  onChange={(e) => setField("note",e.target.value)}
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
                  value={state.date}
                  onChange={(e) => setField("date",e.target.value)}
                  fullWidth
                  required
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 3, lg: 1.3 }}>
                <TextField
                  label="Time"
                  type="time"
                  variant="outlined"
                  value={state.time}
                  onChange={(e) => setField("time",e.target.value)}
                  fullWidth
                  required
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 3, md: 3, lg: 1.3 }}>
                <TextField
                  label="End Time"
                  type="time"
                  variant="outlined"
                  value={state.endTime}
                  onChange={(e) => setField("endTime",e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 5, sm: 4, md: 4, lg: 1.7 }}>
                <FormControl fullWidth>
                  <InputLabel id="development-status">Status</InputLabel>
                  <Select
                    labelId="development-status"
                    label="Status"
                    value={state.status}
                    onChange={(e) => setField("status",e.target.value)}
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
            {formError && (
              <Alert severity="error" onClose={clearFormError} sx={{ mt: 1, mx: 1 }}>
                {formError}
              </Alert>
            )}
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
