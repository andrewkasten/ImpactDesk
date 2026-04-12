import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { time12 } from "../../../functions/formatData";
import DevelopmentsContext from '../../../contexts/DevelopmentsContext'
import { useContext } from "react"

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Map() {
  const { developments } = useContext(DevelopmentsContext)  
  const developmentList = Array.isArray(developments) ? developments : []
   //activities?.map only checks if undefined or null not wrong type, .map needs an array []
  return (
    <>
      <Card elevation={1} sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="subtitle">Map</Typography>
          <MapContainer
            center={[40.3590, -111.7095]}
            zoom={10}
            style={{ height: "510px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {developmentList.map((development) => (
                <Marker
                  key={development.id}
                  position={[development.lat, development.lng]}
                >
                  <Popup>
                    {development.type} - {development?.people_name} {development?.organization_title}
                    <br />
                     {time12(development.time)} - {time12(development.end_time)}
                    <br /> {development.street}  <br /> {development?.city}, {development?.state} {development?.zip_code}                   
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </CardContent>
      </Card>
    </>
  );
}
