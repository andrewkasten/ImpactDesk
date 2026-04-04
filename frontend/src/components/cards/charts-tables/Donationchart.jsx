import { BarChart } from '@mui/x-charts/BarChart'
import {Box, Card, CardContent,Typography, Stack} from "@mui/material"
import useSWR from "swr";
import { useTheme } from '@mui/material'
import {colors} from "../../../../theme"
import {fetcher} from "../../../api/fetcher"

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec',
]

export default function DonationChart() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);


  const { data: donations } = useSWR(
    "http://localhost:8000/api/donations/", fetcher)

// console.log(donations)

let donationsByMonth = {
  "01": 0,
  "02": 0,
  "03": 0,
  "04": 0,
  "05": 0,
  "06": 0,
  "07": 0,
  "08": 0,
  "09": 0,
  "10": 0,
  "11": 0,
  "12": 0,
}

let month = []
let amount = []

function amountMonth(){
{donations?.map((donation) => (
  month = donation.date.split('-')[1],
  donationsByMonth[month] += Number(donation.donations)
))}

for (let [key, value] of Object.entries(donationsByMonth)) {
      amount.push(value)      
  }
return amount
}
amountMonth()

return (
   <Card elevation={2} sx={{ borderRadius: 4, pb:2}}>
        <CardContent>
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="subtitle"  >
        Donations
      </Typography>     
      <BarChart
        series={[
          { data: amount, label: `Total Monthly`, color: `${color.secondary[600]}` },
        ]}
        xAxis={[{ data: months, height: 28}]}
        yAxis={[{ width: 50 }]}
      />
    </Box>
    </CardContent>
    </Card>
  )
}