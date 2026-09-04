import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

// Turns a contact select value ("person:3" / "org:5") into the two FK fields the API expects.
const contactPatch = (value) => {
  if (!value) return { people: null, organization: null };
  const [kind, id] = String(value).split(":");
  return kind === "person"
    ? { people: Number(id), organization: null }
    : { organization: Number(id), people: null };
};

const contactValue = (row) => {
  if (row.people) return `person:${row.people}`;
  if (row.organization) return `org:${row.organization}`;
  return "";
};

/**
 * One click-to-edit table cell. Shows `column.display(row, ctx)` until clicked,
 * then swaps in the input named by `column.input`. Commits a patch object rather
 * than a bare value so the address popover and the contact select can each write
 * more than one field at a time.
 */
export default function EditableCell({
  column,
  row,
  ctx,
  editing,
  onStart,
  onCommit,
  onCancel,
  readOnly = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [buffer, setBuffer] = useState("");

  const start = (event) => {
    if (readOnly) return;
    if (column.input === "address") {
      setAnchorEl(event.currentTarget);
      setBuffer({
        street: row.street ?? "",
        city: row.city ?? "",
        state: row.state ?? "",
        zip_code: row.zip_code ?? "",
      });
    } else if (column.input === "contact") {
      setBuffer(contactValue(row));
    } else {
      setBuffer(row[column.field] ?? "");
    }
    onStart();
  };

  const close = () => {
    setAnchorEl(null);
    setBuffer("");
  };

  const cancel = () => {
    close();
    onCancel();
  };

  const commit = (next = buffer) => {
    if (column.input === "address") onCommit(next);
    else if (column.input === "contact") onCommit(contactPatch(next));
    else onCommit({ [column.field]: next });
    close();
  };

  const keys = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  };

  const cellSx = {
    minWidth: column.minWidth,
    cursor: readOnly ? "default" : "pointer",
    ...(readOnly ? {} : { "&:hover": { textDecoration: "underline dotted" } }),
  };

  if (!editing) {
    return (
      <TableCell align={column.align ?? "center"} onClick={start} sx={cellSx}>
        {column.display(row, ctx)}
      </TableCell>
    );
  }

  if (column.input === "address") {
    return (
      <TableCell align={column.align ?? "center"} sx={cellSx}>
        {column.display(row, ctx)}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => commit()}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}>
          <Box sx={{ display: "grid", gap: 1.5, p: 2, width: 260 }}>
            <TextField
              label="Street"
              size="small"
              autoFocus
              value={buffer.street}
              onChange={(e) => setBuffer({ ...buffer, street: e.target.value })}
              onKeyDown={keys}
            />
            <TextField
              label="City"
              size="small"
              value={buffer.city}
              onChange={(e) => setBuffer({ ...buffer, city: e.target.value })}
              onKeyDown={keys}
            />
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <TextField
                label="State"
                size="small"
                value={buffer.state}
                onChange={(e) => setBuffer({ ...buffer, state: e.target.value })}
                onKeyDown={keys}
              />
              <TextField
                label="Zip Code"
                size="small"
                value={buffer.zip_code}
                onChange={(e) => setBuffer({ ...buffer, zip_code: e.target.value })}
                onKeyDown={keys}
              />
            </Box>
            <Button onClick={() => commit()}>Done</Button>
          </Box>
        </Popover>
      </TableCell>
    );
  }

  if (column.input === "select") {
    return (
      <TableCell align={column.align ?? "center"} sx={cellSx}>
        <Select
          variant="standard"
          autoFocus
          defaultOpen
          fullWidth
          value={buffer}
          onChange={(e) => commit(e.target.value)}
          onClose={cancel}>
          {column.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    );
  }

  if (column.input === "contact") {
    return (
      <TableCell align={column.align ?? "center"} sx={cellSx}>
        <Select
          variant="standard"
          autoFocus
          defaultOpen
          fullWidth
          value={buffer}
          onChange={(e) => commit(e.target.value)}
          onClose={cancel}>
          <ListSubheader>People</ListSubheader>
          {ctx.people?.map((person) => (
            <MenuItem key={`person:${person.id}`} value={`person:${person.id}`}>
              {person.first_name} {person.last_name}
            </MenuItem>
          ))}
          <ListSubheader>Organizations</ListSubheader>
          {ctx.organization?.map((org) => (
            <MenuItem key={`org:${org.id}`} value={`org:${org.id}`}>
              {org.title}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    );
  }

  return (
    <TableCell align={column.align ?? "center"} sx={cellSx}>
      <TextField
        variant="standard"
        type={column.input === "text" ? "text" : column.input}
        size="small"
        autoFocus
        fullWidth
        value={buffer}
        onChange={(e) => setBuffer(e.target.value)}
        onBlur={() => commit()}
        onKeyDown={keys}
      />
    </TableCell>
  );
}
