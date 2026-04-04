import { useState } from "react";
import { login } from "../../api/authApi";
import { Navigate } from "react-router-dom";
import {
  Stack,
  Card,
  Button,
  CardContent,
  Typography,
  OutlinedInput,
  Box,
  InputLabel,
  Container,
} from "@mui/material";
import idMonogram from '../../assets/id-Monogram.png'

export default function Login({}) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [responseMsg, setResponseMsg] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const handleToken = (token) => {
    setFormData({ username: "", password: "" });
    setUserToken(token);
    localStorage.setItem("token", token);
  };
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
      username: formData.username,
      password: formData.password,
    };
    const token = await login(context);
    if (!token) {
      setResponseMsg("Error logging in");
    } else {
      handleToken(token);
      setShouldRedirect(true);
      localStorage.setItem("token", token);
    }
  };
  if (shouldRedirect) {
    return <Navigate to="/dashboard" />;
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
            textAlign: "center",
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
          sx={{ width: "100%", pt: 3, fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>
            <CardContent>

              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3, }}
                onSubmit={handleSubmit}
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  type="text"
                  name="username"                 
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••"
                />
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Box>
            </CardContent>
          </Card>
          </Container>
        </Stack>
      </>
    );
  }
}
