import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
} from "@mui/material";

// action returns {current state}, {new action}, {isPending} boolean

async function formAction(prevState, formData) {

  const formObject = Object.fromEntries(formData.entries());

  await axios.post("http://localhost:8000/api/developments/", formObject, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
 
}




export default function DonationForm() {

  return (
    <>
      <Card elevation={2} sx={{ borderRadius: 4 }}>
        <CardContent>
          <h3>New Donation</h3>
          <Box
            component="form"
            action={formAction}
            autoComplete="on"
            sx={{ '& .MuiTextField-root': { m: .4, p: .4, width: '17ch' } }}
          >
            <TextField label="Title" variant="standard" />
            <TextField label="Donations" variant="standard" />
            <TextField label="Type" variant="standard" />
          </Box>
          <Button sx={{ mt: 1 }} variant="contained">Add</Button>
        </CardContent>
      </Card>
    </>
  );
}


//      title = models.CharField(max_length=255)
//     donations = models.DecimalField(decimal_places=2)
//     donate_type = models.CharField(max_length=255, null=True, blank=True)
//     date = models.DateField(default=date.today)
    
//     person = models.ForeignKey(People, on_delete=models.CASCADE, null=True, blank=True)
//     organization = models.ForeignKey(Organizations, on_delete=models.CASCADE, null=True, blank=True)
    