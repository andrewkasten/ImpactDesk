import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import mainDash from "../assets/main-dash.webp"

export default function Hero() {

return (
<Stack
spacing={2}
useFlexGap
sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
>
<Typography
  component="h1"
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
  Donor development is demanding. Impact Desk helps your team plan, prioritize, and guide fundraising efforts with confidence — so you can stay focused on your mission and impact.
</Typography>
<Button
  variant="contained"
  color="primary"
  size="small"
  sx={{ minWidth: "fit-content" }}
>
  Explore
</Button>
<img style={{borderRadius:8, border: "2px solid gray", maxWidth: "105%", height:"auto", display:"block", margin:"20px"}} alt="image: dashboard home: side menu, development card, donation s card, donations graph, top donors list"src={mainDash} />             
</Stack>

)
}