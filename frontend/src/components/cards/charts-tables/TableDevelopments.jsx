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
import useContactForm from "../../../hooks/useContactForm";
import useDevelopmentForm from "../../../hooks/useDevelopmentForm";
import Alert from "@mui/material/Alert";
import EditableCell from "./EditableCell";
import { useContext, useState } from "react";
import dayjs from "dayjs";

const EMPTY = "—";

const TYPE_OPTIONS = ["Meeting", "Visit", "Event"];
const STATUS_OPTIONS = ["scheduled", "completed", "canceled", "pending"];

const showTime = (t) => (t ? time12(t) : EMPTY);

const showAddress = (row) => {
  const parts = [row.street, row.city, row.state, row.zip_code].filter(Boolean);
  return parts.length ? parts.join(", ") : EMPTY;
};

// Saved rows arrive with the contact already denormalized; drafts only hold the FK.
const showContact = (row, { people, organization }) => {
  if (row.people_name) return row.people_name;
  if (row.organization_title) return row.organization_title;
  if (row.people) {
    const person = people?.find((p) => p.id === row.people);
    return person ? `${person.first_name} ${person.last_name}` : EMPTY;
  }
  if (row.organization) {
    const org = organization?.find((o) => o.id === row.organization);
    return org ? org.title : EMPTY;
  }
  return EMPTY;
};

const COLUMNS = [
  { field: "date", label: "Date", input: "date", align: "left", minWidth: 130, display: (r) => r.date || EMPTY },
  { field: "time", label: "Start", input: "time", minWidth: 90, display: (r) => showTime(r.time) },
  { field: "end_time", label: "End", input: "time", minWidth: 90, display: (r) => showTime(r.end_time) },
  { field: "type", label: "Type", input: "select", options: TYPE_OPTIONS, minWidth: 100, display: (r) => r.type || EMPTY },
  { field: "contact", label: "Contact", input: "contact", minWidth: 140, display: showContact },
  { field: "address", label: "Address", input: "address", minWidth: 180, display: showAddress },
  { field: "status", label: "Status", input: "select", options: STATUS_OPTIONS, minWidth: 110, display: (r) => r.status || EMPTY },
  { field: "note", label: "Note", input: "text", minWidth: 140, display: (r) => r.note || EMPTY },
];

// A draft lives only in this component until the user edits it into a real record.
let draftCount = 0;
const newDraft = (date) => ({
  draftId: `draft-${++draftCount}`,
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
  people: null,
  organization: null,
});

const draftFields = (draft) => {
  const fields = { ...draft };
  delete fields.draftId;
  return fields;
};

export default function TableDevelopments() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const { developments: developmentsList, selectedDay } = useContext(DevelopmentsContext);
  const { people, organization } = useContactForm();
  const { createDevelopment, patchDevelopment } = useDevelopmentForm();
  const [drafts, setDrafts] = useState([]);
  const [editing, setEditing] = useState(null); // { rowKey, field }
  const [savingKey, setSavingKey] = useState(null);
  const [error, setError] = useState(null);

  const draftDate = dayjs(selectedDay ?? undefined).format("YYYY-MM-DD");

  const addDraft = () => setDrafts((prev) => [...prev, newDraft(draftDate)]);

  const discardDraft = (draftId) => {
    setDrafts((prev) => prev.filter((draft) => draft.draftId !== draftId));
    setEditing((prev) => (prev?.rowKey === draftId ? null : prev));
  };

  // Every committed edit funnels through here: the first edit to a draft creates the
  // record, and from then on each edit is a one-field save.
  const commitCell = async (row, patch) => {
    setEditing(null);
    setError(null);
    const rowKey = row.id ?? row.draftId;
    if (savingKey === rowKey) return;
    setSavingKey(rowKey);
    try {
      if (row.draftId) {
        await createDevelopment({ ...draftFields(row), ...patch });
        setDrafts((prev) => prev.filter((draft) => draft.draftId !== row.draftId));
      } else {
        await patchDevelopment(row.id, patch);
      }
    } catch (err) {
      setError(
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : (err?.message ?? "Could not save that change."),
      );
    } finally {
      setSavingKey(null);
    }
  };

  const rows = [...developmentsList, ...drafts];
  const ctx = { people, organization };

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
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ m: 1 }}>
          {error}
        </Alert>
      )}
      <Table size="small" aria-label="a table of scheduled developments">
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell
                key={column.field}
                style={{ paddingTop: "20px" }}
                align={column.align ?? "center"}>
                {column.label}
              </TableCell>
            ))}
            <TableCell style={{ paddingTop: "20px" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isDraft = Boolean(row.draftId);
            const rowKey = row.id ?? row.draftId;
            return (
              <TableRow
                key={rowKey}
                sx={{
                  backgroundColor: isDraft ? theme.palette.action.hover : "inherit",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}>
                {COLUMNS.map((column) => (
                  <EditableCell
                    key={column.field}
                    column={column}
                    row={row}
                    ctx={ctx}
                    readOnly={savingKey === rowKey}
                    editing={editing?.rowKey === rowKey && editing?.field === column.field}
                    onStart={() => setEditing({ rowKey, field: column.field })}
                    onCommit={(patch) => commitCell(row, patch)}
                    onCancel={() => setEditing(null)}
                  />
                ))}
                <TableCell align="center">
                  {isDraft && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Chip
                        label={savingKey === rowKey ? "Saving…" : "Unsaved"}
                        size="small"
                        variant="outlined"
                        color="warning"
                      />
                      <IconButton
                        aria-label="discard draft"
                        onClick={() => discardDraft(row.draftId)}>
                        <CloseIcon sx={{ color: `${color.error[400]}` }} />
                      </IconButton>
                    </Box>
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
