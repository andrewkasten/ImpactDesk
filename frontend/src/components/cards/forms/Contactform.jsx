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
import useContactForm from "../../../hooks/useContactForm";

export default function ContactForm() {
  const { stateContact, setContactField, handleContactSubmit, people, organization } = useContactForm(); 

  return (
    <Card elevation={2} sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="subtitle">New Contact </Typography>
        <Box component="form" autoComplete="on" sx={{ pt: 2 }}
        onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }} >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
            columns={{ md: 12 }}
          >
            <Grid size={{ xs: 7, sm: 5, md: 5, lg: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="contact-type">Type</InputLabel>
                <Select
                  fullWidth
                  labelID="contact-type"
                  value={stateContact.selectTypeContact}
                  onChange={(e) =>
                    setContactField("selectTypeContact", e.target.value)
                  }
                >
                  <MenuItem value={"Person"}>Person</MenuItem>
                  <MenuItem value={"Organization"}>Organization</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {stateContact.selectTypeContact === "Person" ? (
              <>
                <Grid size={{ xs: 8, sm: 5, md: 5, lg: 2 }}>
                  <TextField
                    variant="outlined"
                    label="First Name"
                    value={stateContact.firstName}
                    onChange={(e) =>
                      setContactField("firstName", e.target.value)
                    }
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>
                <Grid size={{ xs: 8, sm: 5, md: 5, lg: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Last Name"
                    value={stateContact.lastName}
                    onChange={(e) =>
                      setContactField("lastName", e.target.value)
                    }
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid size={{ xs: 8, sm: 5, md: 5, lg: 3 }}>
                  <TextField
                    variant="outlined"
                    label="Name"
                    value={stateContact.title}
                    onChange={(e) =>
                      setContactField("title", e.target.value)
                    }
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>
                <Grid size={{ xs: 9, sm: 5, md: 5, lg: 3 }}>
                  <TextField
                    variant="outlined"
                    label="Website"
                    type="url"
                    placeholder="https://example.com"
                    value={stateContact.website}
                    onChange={(e) =>
                      setContactField("website", e.target.value)
                    }
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>
              </>
            )}
            <Grid size={{ xs: 8, sm: 5, md: 5, lg: 3 }}>
              <TextField
                variant="outlined"
                label="Phone"
                value={stateContact.phone}
                onChange={(e) => setContactField("phone", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 9, sm: 5, md: 5, lg: 3 }}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                placeholder="name@example.com"
                value={stateContact.email}
                onChange={(e) => setContactField("email", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 9, sm: 5, md: 5, lg: 4 }}>
              <TextField
                label="Street"
                variant="outlined"
                value={stateContact.street}
                onChange={(e) => setContactField("street", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 7, sm: 4, md: 4, lg: 3 }}>
              <TextField
                label="City"
                variant="outlined"
                value={stateContact.city}
                onChange={(e) => setContactField("city", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 3, sm: 2, md: 2, lg: 1 }}>
              <TextField
                label="State"
                variant="outlined"
                value={stateContact.state}
                onChange={(e) => setContactField("state", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 4, lg: 2 }}>
              <TextField
                label="Zip Code"
                variant="outlined"
                value={stateContact.zipCode}
                onChange={(e) => setContactField("zipCode", e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
