import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordions from "../components/accordion/Accordions";
import schedImg from "../assets/developments.png"
import map from "../assets/map.png"
import contacts from "../assets/contacts.png"
const features = [
  {
    title: "Schedule",
    image: schedImg,
    description: "",
  },
  {
    title: "Map",
    image: map,
    description: "",
  },
  {
    title: "Contacts",
    image: contacts,
    description: "",
  },
];

export default function Features() {
  return (
    <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 10 },
            pb: { xs: 8, sm: 12 },
          }}
        >
    <Box id="features" sx={{ width: "100%" }}>
      <Typography
        component="h2"
        variant="h4"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        Features
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", mb: { xs: 2, sm: 3 } }}
      ></Typography>
      <Accordions value={features} />
    </Box>
    </Container>
  );
}

