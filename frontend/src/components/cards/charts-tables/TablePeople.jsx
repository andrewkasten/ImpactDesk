import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR from "swr";
import { fetcher } from "../../../api/fetcher";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import { useTheme } from '@mui/material'
import {colors} from "../../../../theme"

export default function TablePeople() {
  const { data: people } = useSWR("http://localhost:8000/api/people/", fetcher);
 const theme = useTheme();
  const color = colors(theme.palette.mode);

    return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, p:1}}>
       <Typography sx={{ pl: 1}} variant="subtitle">
            People
          </Typography>
      <Table size="small" aria-label="a table of people contacts" >         
        <TableHead>        
          <TableRow >
            <TableCell style={{paddingTop:"20px"}} >Name</TableCell>
            <TableCell style={{paddingTop:"20px"}}align="center">Phone</TableCell>
            <TableCell style={{paddingTop:"20px"}}align="center">Email</TableCell>
            <TableCell style={{paddingTop:"20px"}}align="center">Street</TableCell>
            <TableCell style={{paddingTop:"20px"}}align="center">City</TableCell>
            <TableCell style={{paddingTop:"20px"}}align="center">State</TableCell>
            <TableCell style={{paddingTop:"20px"}}align="center">Zip Code</TableCell>
            <TableCell style={{paddingTop:"20px"}}align="center">Donations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people?.map((person, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell style={{color:`${color.secondary[600]}`}}component="th" scope="row">
                {person.first_name} {person.last_name}
              </TableCell>
              <TableCell align="center">{person.phone}</TableCell>
              <TableCell align="center">{person.email}</TableCell>
              <TableCell align="center">{person.street}</TableCell>
              <TableCell align="center">{person.city}</TableCell>
              <TableCell align="center">{person.state}</TableCell>
              <TableCell align="center">{person.zip_code}</TableCell>
              <TableCell style={{color:`${color.success[600]}`}} align="center">${person.donation_total}</TableCell>
              <TableCell>
                <IconButton>
                  <DeleteOutlineIcon sx={{color:`${color.error[400]}`}} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
