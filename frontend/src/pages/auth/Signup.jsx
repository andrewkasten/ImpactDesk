import { useState } from "react";
import { signup } from "../../api/authApi";
import { Navigate } from "react-router-dom";
import {
  Container,
  Stack,
  Card,
  Button,
  Typography,
  OutlinedInput,
  Box,
  InputLabel,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import idMonogram from '../../assets/id-Monogram.png'


export default function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    password: "",
  });
  const [responseMsg, setResponseMsg] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const context = {
      first_name: formData.first_name,
      username: formData.username,
      password: formData.password,
    };
    const response = await signup(context);
      console.log('response',response.first_name)
      if (!response.first_name) {
        setShouldRedirect(false)
        setResponseMsg(response)
        console.log('msg',responseMsg.username)
      } else {
        setResponseMsg(response)
        setSignupSuccess(true)
        setTimeout(() => setShouldRedirect(true), 1500)
      
       
      }
    console.log(shouldRedirect)
   
  };
 
  if (shouldRedirect) {
    return <Navigate to="/login" replace={true} />
   
  } else {
    return (
      <>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "grey.600",
            backgroundBlendMode: "multiply",
            // image distracting with 3D rectangles, change to one without them
            backgroundImage: `url(https://lh3.googleusercontent.com/pw/AP1GczMmeE7IsdjaDjubQh55oqnwygGnyV1lr86MdXcH4MNP-LiyFSHZouo-oNQOsCRgm5iVV6JNzqwoDitFl7xMCaMb0sPwKlok2RHDUeWkLLdDvAd59_0=w2400)`,
            minHeight: "100vh",
            backgroundSize: "100%",
            backgroundPosition: "center 43%",
            textAlign: "center",
            backgroundSize: "cover",
            backgroundRepeat: { xs: "repeat", md: "no-repeat" },
          }}
        >
         

          <Container direction="column" justifyContent="space-between">
          <Box sx={{pb:5}}>
          <img width="360px" src={idMonogram}/>
          </Box>
            <Card
              sx={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                maxWidth: "450px",
                margin: "auto",
                gap: 2,
                boxShadow: 3,
                
               }}
            >
             
            
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", pt:3, fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >

                Signup
              </Typography>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3, }}
                onSubmit={handleSubmit}
              >
                <InputLabel htmlFor="first_name">First Name*</InputLabel>
                <OutlinedInput
                  variant="outlined"
                  type="text"
                  name="first_name"
                  placeholder="Jon"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                <InputLabel htmlFor="username">Username*</InputLabel>
                <OutlinedInput
                  variant="outlined"
                  type="text"
                  name="username"                  
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <InputLabel htmlFor="password">Password*</InputLabel>
                <OutlinedInput
                  type="password"
                  name="password"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button variant="contained" type="submit">
                  Signup
                </Button>
              </Box>
              
            </Card>
            {shouldRedirect === false && <Alert sx={{mt:3}} variant="filled" severity="error">{responseMsg.username}</Alert>}

            {signupSuccess && <Alert sx={{mt:3}} variant="filled" severity="success">Signup Successful</Alert>}
          </Container>
        </Stack>
      </>
    );
  }
}
