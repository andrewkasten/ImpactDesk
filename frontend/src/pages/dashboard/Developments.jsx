import {   Grid,  Typography, Button,  IconButton,  Stack,} from "@mui/material";
import Map from "../../components/cards/maps/Map.jsx";
import ListDevelopments from "../../components/cards/lists/ListDevelopments.jsx";
import DevelopmentForm from "../../components/cards/forms/DevelopmentForm.jsx";
import { useState} from "react"
import dayjs from "dayjs"; //day.js.org
import useSWR from "swr"
import DevelopmentsContext from "../../contexts/DevelopmentsContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {fetcher} from "../../api/fetcher.js"
// get date, get List with filter, address to lat lng, with validation, fromAddress()


export default function Developments() {
  const firstWeekDay = dayjs().startOf("week")
  const today = dayjs()
  const [selectedWeek, setSelectedWeek] = useState(firstWeekDay)
  const [selectedDay, setSelectedDay] = useState(today)
  const token = localStorage.getItem("token")

  // console.log(selectedWeek)
  // console.log(selectedDay.format('MMM'))

  const { data: developments, mutate: refreshDevelopments} = useSWR(
    token ? `http://localhost:8000/api/developments/?date=${selectedDay.format("YYYY-MM-DD")}` : null,
    fetcher,    
  )
  const developmentsList = Array.isArray(developments) ? developments : []
 
//mutate(key) (or just mutate() with the bound mutate API) with no data will trigger a revalidation 

  const changePrevWeek = (prevWeek) => {
    setSelectedWeek(prevWeek)
  }
  const changeNextWeek = (nextWeek) => {
    setSelectedWeek(nextWeek)
  }
  const handleDateChange = (date) => {
    setSelectedDay(date);
  }

  return (
    <>
      <DevelopmentsContext.Provider value={{ developments: developmentsList, refreshDevelopments }}>
      <Typography variant="h4" textAlign="center" color="primary"> Development Schedule</Typography>
      <Typography sx={{pt:3}}variant="h6" fontSize= "18px" textAlign="center">{selectedDay.format('MMMM YYYY')}</Typography>
      <Grid sx={{display: "flex", pt:.5, justifyContent: "center"}}>
        <Stack direction="row" spacing={{xs:2.7, md:3, lg:3.1,}} >       
        <Typography variant="subtitle2">SUN</Typography>
        <Typography variant="subtitle2">MON</Typography>
        <Typography variant="subtitle2">TUE</Typography>
        <Typography variant="subtitle2">WED</Typography>
        <Typography variant="subtitle2">THU</Typography>
        <Typography variant="subtitle2">FRI</Typography>
        <Typography variant="subtitle2">SAT</Typography>
        </Stack>
      </Grid>     
        <Grid sx={{ pb: 1.5, pt:.5, display: "flex", justifyContent:"center",alignItems: "center", gap: 2 }}>
          <IconButton sx={{mr:{xs: -2, md: 0}}} onClick={() => changePrevWeek(selectedWeek.subtract(1, "week"))}>
               <ArrowBackIosNewIcon />
          </IconButton>          
          <Stack direction="row" spacing={{xs: 0.5, md:1}}>
         {[...Array(7)].map((_, i) => (                                
              <Button
              color="secondary"
                variant= {(selectedWeek.add(i, "day").format('DD') === selectedDay.format('DD')) ? 'contained' : 'outlined'}
                key={i}
                sx={{ borderRadius: 8, minWidth: 0, minHeight: "45px" }}
                onClick={() => handleDateChange(selectedWeek.add(i, "day"))} >
                  <Typography fontSize="13px">{selectedWeek.add(i, "day").format("DD")}</Typography>                
              </Button>            
            ))}
          </Stack>
          <IconButton sx={{ml:{xs: -2}}}  onClick={() => changeNextWeek(selectedWeek.add(1, "week"))}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Grid>
       <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <ListDevelopments />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <Map />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 13 }}>
            <DevelopmentForm />
          </Grid>
        </Grid>
      </DevelopmentsContext.Provider>
    </>
  );
}
