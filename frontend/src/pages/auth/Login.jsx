import { useState, useContext } from "react";
import { login } from "../../api/authApi";
import { Navigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";
import idMonogram from '../../assets/id-Monogram.png'
import Alert from '@mui/material/Alert';
import AuthContext from "../../contexts/AuthContext";


export default function Login({}) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [responseMsg, setResponseMsg] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(null);
  const { handleToken } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitLogin = async (context) => {
    const result = await login(context);
    if (!result.ok) {
      setResponseMsg(result.error);
      setShouldRedirect(false);
    } else {
      handleToken(result.token);
      setFormData({ username: "", password: "" });
      setShouldRedirect(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitLogin({
      username: formData.username,
      password: formData.password,
    });
  };

  const handleDemoLogin = async () => {
    await submitLogin({ username: "demo", password: "demo" });
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
            // image loading slow
          backgroundImage: `url(https://lh3.googleusercontent.com/pw/AP1GczMmeE7IsdjaDjubQh55oqnwygGnyV1lr86MdXcH4MNP-LiyFSHZouo-oNQOsCRgm5iVV6JNzqwoDitFl7xMCaMb0sPwKlok2RHDUeWkLLdDvAd59_0=w2400)`,
            textAlign: "center",
            minHeight: "100vh",
            backgroundSize: "100%",
            backgroundPosition: "center 43%",                     
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
                <Button
                  variant="outlined"
                  type="button"
                  onClick={handleDemoLogin}
                >
                  Try Demo
                </Button>
                <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center" }}>
                  Demo account: <code>demo</code> / <code>demo</code>
                </Typography>
              </Box>
            </CardContent>
          </Card>
          {shouldRedirect === false && <Alert sx={{mt:3}} variant="filled" severity="error">{responseMsg}</Alert>}
          </Container>
        </Stack>
      </>
    );
  }
}
