import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import { colors } from "../../../../theme";
import { time12 } from "../../../functions/formatData";
import DevelopmentsContext from "../../../contexts/DevelopmentsContext";
import { useContext, useState } from "react";
import dayjs from "dayjs";

const EMPTY = "—";

// A draft lives only in this component until the user edits it into a real record.
const newDraft = (date) => ({
  draftId: `draft-${Date.now()}`,
  type: "",
  date,
  time: "",
  end_time: "",
  status: "pending",
  note: "",
  street: "",
  city: "",
  state: "",
  zip_code: "",
});

const showTime = (t) => (t ? time12(t) : EMPTY);

const showAddress = (row) => {
  const parts = [row.street, row.city, row.state, row.zip_code].filter(Boolean);
  return parts.length ? parts.join(", ") : EMPTY;
};

export default function TableDevelopments() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const { developments: developmentsList, selectedDay } = useContext(DevelopmentsContext);
  const [drafts, setDrafts] = useState([]);

  const draftDate = dayjs(selectedDay ?? undefined).format("YYYY-MM-DD");

  const addDraft = () => setDrafts((prev) => [...prev, newDraft(draftDate)]);

  const discardDraft = (draftId) =>
    setDrafts((prev) => prev.filter((draft) => draft.draftId !== draftId));

  const rows = [...developmentsList, ...drafts];

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, p: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ pl: 1 }} variant="subtitle">
          Schedule Entries
        </Typography>
        <IconButton aria-label="add development" color="primary" onClick={addDraft}>
          <AddIcon />
        </IconButton>
      </Box>
      <Table size="small" aria-label="a table of scheduled developments">
        <TableHead>
          <TableRow>
            <TableCell style={{ paddingTop: "20px" }}>Date</TableCell>
            <TableCell style={{ paddingTop: "20px" }} align="center">
              Start
            </TableCell>
            <TableCell style={{ paddingTop: "20px" }} align="center">
              End
            </TableCell>
            <TableCell style={{ paddingTop: "20px" }} align="center">
              Type
            </TableCell>
            <TableCell style={{ paddingTop: "20px" }} align="center">
              Contact
            </TableCell>
            <TableCell style={{ paddingTop: "20px" }} align="center">
              Address
            </TableCell>
            <TableCell style={{ paddingTop: "20px" }} align="center">
              Status
            </TableCell>
            <TableCell style={{ paddingTop: "20px" }} align="center">
              Note
            </TableCell>
            <TableCell style={{ paddingTop: "20px" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isDraft = Boolean(row.draftId);
            return (
              <TableRow
                key={row.id ?? row.draftId}
                sx={{
                  backgroundColor: isDraft ? theme.palette.action.hover : "inherit",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}>
                <TableCell
                  style={{ color: `${color.secondary[600]}` }}
                  component="th"
                  scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="center">{showTime(row.time)}</TableCell>
                <TableCell align="center">{showTime(row.end_time)}</TableCell>
                <TableCell align="center">{row.type || EMPTY}</TableCell>
                <TableCell align="center">
                  {row.people_name || row.organization_title || EMPTY}
                </TableCell>
                <TableCell align="center">{showAddress(row)}</TableCell>
                <TableCell align="center">
                  {isDraft ? (
                    <Chip label="Unsaved" size="small" variant="outlined" color="warning" />
                  ) : (
                    row.status
                  )}
                </TableCell>
                <TableCell align="center">{row.note || EMPTY}</TableCell>
                <TableCell align="center">
                  {isDraft && (
                    <IconButton
                      aria-label="discard draft"
                      onClick={() => discardDraft(row.draftId)}>
                      <CloseIcon sx={{ color: `${color.error[400]}` }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
