import { Button, TextField, Box, Card, CardContent, Typography, MenuItem, Select, InputLabel, FormControl, Grid, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import { useState } from "react";
import axios from "axios";


export default function ContactForm() {
    const token = localStorage.getItem("token");  
        
    const [selectType, setSelectType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipCode, setZipCode] = useState();
    const [title, setTitle] = useState("");
    const [website, setWebsite] = useState("");


    const handleSelectType = (e) => {
    setSelectType(e.target.value);
  }

  async function handleSubmit() { 
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

      if (selectType === "Person") {
      await axios.post("http://localhost:8000/api/people/", personObject ,{
      headers: {
        Authorization: `Token ${token}`,
      },
    }

      );
    }
    if (selectType === "Organization") {
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

        <Card elevation={2} sx={{ borderRadius: 4}}>
            <CardContent>
                <Typography variant="subtitle">New Contact </Typography>
                <Box component="form" autoComplete="on" sx={{pt:2}}>
                    <Grid 
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, }}
                    columns={{ md: 12 }}>
                        <Grid size={{ xs: 7, sm: 5, md: 5, lg: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="contact-type">Type</InputLabel>
                                <Select
                                fullWidth
                                labelID="contact-type"
                                value={selectType}
                                onChange={handleSelectType}
                                >
                                    <MenuItem value={"Person"}>Person</MenuItem>
                                    <MenuItem value={"Organization"}>Organization</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                            {selectType === "Person" ?
                                <>
                                <Grid size={{ xs: 8, sm: 5, md: 5, lg: 2 }}>
                                    <TextField
                                        variant="outlined"
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        fullWidth
                                        slotProps={{ inputLabel: { shrink: true } }}
                                    />
                                    </Grid>
                                     <Grid size={{ xs: 8, sm: 5, md: 5, lg: 2 }}>
                                    <TextField
                                        variant="outlined"
                                        label="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        fullWidth
                                        slotProps={{ inputLabel: { shrink: true } }}
                                    />
                                    </Grid>
                                </>
                                :
                                <> 
                                <Grid size={{ xs: 8, sm: 5, md: 5, lg: 3 }}>                             
                            <TextField
                              variant="outlined"
                              label="Name"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              fullWidth
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                            </Grid> 
                             <Grid size={{ xs: 9, sm: 5, md: 5, lg: 3 }}> 
                            <TextField
                              variant="outlined"
                              label="Website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              fullWidth
                              slotProps={{ inputLabel: { shrink: true } }}
                            />
                              </Grid> 
                          </>
                        }
                        <Grid size={{ xs: 8, sm: 5, md: 5, lg: 3 }}>
                        <TextField
                          variant="outlined"
                          label="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        </Grid>
                        <Grid size={{ xs: 9, sm: 5, md: 5, lg: 3 }}>
                        <TextField
                          variant="outlined"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                        </Grid>
                       <Grid size={{ xs: 9, sm: 5, md: 5, lg: 4 }}>
                <TextField
                  label="Street"
                  variant="outlined"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 7, sm: 4, md: 4, lg: 3 }}>
                <TextField
                  label="City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 2, md: 2, lg: 1 }}>
                <TextField
                  label="State"
                  variant="outlined"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 4, lg: 2 }}>
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
                  
                    </Grid>
                </Box>
                <Button sx={{ mt: 2 }} variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
            </CardContent>
        </Card>


    )

}