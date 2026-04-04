import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useSWR from 'swr'
import {fetcher} from "../../../api/fetcher"
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

export default function TableOrganization() {
  
  const { data: organization} = useSWR("http://localhost:8000/api/organizations/", fetcher)
  // console.log(people)
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, p:1}}>
      <Table  size="small" aria-label="a table of organization contacts">
        <TableHead>
            <Typography sx={{ pl:1}}
          variant="subtitle">
            Organizations
            </Typography>
          <TableRow>
            <TableCell>Name</TableCell>
             <TableCell align="right">Website</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Street</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Zip Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organization?.map((organization, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {organization.title} 
              </TableCell>
              <TableCell align="right">{organization.website}</TableCell>
              <TableCell align="right">{organization.phone}</TableCell>
              <TableCell align="right">{organization.email}</TableCell>
              <TableCell align="right">{organization.street}</TableCell>
              <TableCell align="right">{organization.city}</TableCell>
              <TableCell align="right">{organization.state}</TableCell>
              <TableCell align="right">{organization.zip_code}</TableCell>
               <TableCell>
                <IconButton>
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}