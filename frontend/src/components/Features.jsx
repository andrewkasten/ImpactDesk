import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordions from "../components/accordion/Accordions";

const features = [
  {
    title: "Schedule",
    image: "",
    description: "",
  },
  {
    title: "Map",
    image: "",
    description: "",
  },
  {
    title: "Contacts",
    image: "",
    description: "",
  },
];

export default function Features() {
  return (
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
  );
}

