import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import useDonationForm from "../../../hooks/useDonationForm";
import useContactForm from "../../../hooks/useContactForm";

export default function DonationForm() {
  const {
    stateDonation: state,
    setField,
    handleSubmit,
    formError,
    clearFormError,
  } = useDonationForm();
  const { people, organization } = useContactForm();

  return (
    <Card elevation={2} sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="subtitle">New Donation</Typography>
        <Box
          component="form"
          autoComplete="on"
          sx={{ pt: 2 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 1.8 }}
            columns={{ md: 11 }}
            sx={{ p: 1 }}
          >
            <Grid size={{ xs: 5, sm: 5, md: 5, lg: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="donation-contact-type">Contact</InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true }}
                  labelId="donation-contact-type"
                  label="Contact"
                  value={state.selectTypeContact}
                  onChange={(e) => setField("selectTypeContact", e.target.value)}
                  fullWidth
                  required
                >
                  <MenuItem value={"Person"}>Person</MenuItem>
                  <MenuItem value={"Organization"}>Organization</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="donation-donor">Donor</InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true }}
                  labelId="donation-donor"
                  label="Donor"
                  value={
                    state.selectTypeContact === "Person"
                      ? state.peopleID
                      : state.organizationID
                  }
                  onChange={(e) =>
                    state.selectTypeContact === "Person"
                      ? setField("peopleID", e.target.value)
                      : setField("organizationID", e.target.value)
                  }
                  fullWidth
                  required
                >
                  {state.selectTypeContact === "Person"
                    ? people?.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.first_name} {p.last_name}
                        </MenuItem>
                      ))
                    : organization?.map((o) => (
                        <MenuItem key={o.id} value={o.id}>
                          {o.title}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 5, sm: 5, md: 5, lg: 2 }}>
              <TextField
                label="Amount"
                type="number"
                variant="outlined"
                value={state.donations}
                onChange={(e) => setField("donations", e.target.value)}
                fullWidth
                required
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                  htmlInput: { min: 0, step: "0.01" },
                }}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 5, md: 5, lg: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="donation-type">Type</InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true }}
                  labelId="donation-type"
                  label="Type"
                  value={state.donate_type}
                  onChange={(e) => setField("donate_type", e.target.value)}
                  fullWidth
                >
                  <MenuItem value={"Cash"}>Cash</MenuItem>
                  <MenuItem value={"Check"}>Check</MenuItem>
                  <MenuItem value={"In-kind"}>In-kind</MenuItem>
                  <MenuItem value={"Recurring"}>Recurring</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 5, sm: 5, md: 5, lg: 2 }}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                value={state.date}
                onChange={(e) => setField("date", e.target.value)}
                fullWidth
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>

          {formError && (
            <Alert
              severity="error"
              onClose={clearFormError}
              sx={{ mt: 1, mx: 1 }}
            >
              {formError}
            </Alert>
          )}

          <Grid
            container
            direction="row"
            sx={{ justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <Button sx={{ mt: 1 }} variant="contained" type="submit">
              Add Donation
            </Button>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
