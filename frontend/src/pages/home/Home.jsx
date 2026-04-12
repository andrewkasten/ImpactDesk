import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import idHero from "../../assets/ID-hero.webp"
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import Features from "../../components/Features";


export default function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "grey.800",
          backgroundBlendMode: "multiply",
          backgroundImage: `url(${idHero})`,
          backgroundSize: "100%",
          backgroundPosition: "center 0%",
          backgroundRepeat: {xs: "repeat", md: "no-repeat"},          
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
        <Hero />
        </Container>
      </Box>
       <Box
        sx={{
          bgcolor: "grey.800",          
          backgroundSize: "100%",
          display: "flex",          
        }}
      >
        <Features />
        
        </Box>
      <Footer />
    </>
  );
}

