import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Accordions({ value }) {
  return (
    <div>
      {value.map((item, i) => (
        <Accordion key={item.title ?? i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.description}</Typography>
            <img style={{borderRadius:8, border: "2px solid gray", maxWidth: "80%", 
              height:"auto", display:"block"}} 
              alt={item.description} src={item.image} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
