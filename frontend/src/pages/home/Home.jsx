import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import idHero from "../../assets/ID-hero.webp"
import mainDash from "../../assets/main-dash.webp"


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
          <Stack
            spacing={2}
            useFlexGap
            sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                textAlign: "center",
                fontSize: "clamp(3rem, 10vw, 3.5rem)",
              }}
            >
              Develop stronger donor relationships. 
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              Donor development is demanding. ImpactDesk helps your team plan, prioritize, and guide fundraising efforts with confidence — so you can stay focused on your mission and impact.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: "fit-content" }}
            >
              Start now
            </Button>
           <img style={{borderRadius:8, border: "2px solid gray", maxWidth: "105%", height:"auto", display:"block", margin:"20px"}} alt="image: dashboard home: side menu, development card, donation s card, donations graph, top donors list"src={mainDash} />             
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// backgroundImage: "url('https://lh3.googleusercontent.com/pw/AP1GczNvXQ9tsuFEvqnCUBXWP1rJL8U34YTg3eXYgRO4YGFNTw4h0KyFDDESXPqhY9E0Wv9cS8xS7OZDmEmEho9skZDcJahOxSJTGeb9jZKFttO0c8U363Q=w2400')",
