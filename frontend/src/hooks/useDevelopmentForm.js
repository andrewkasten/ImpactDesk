import { useReducer, useContext } from "react";
import axios from "axios";
import { setKey, fromAddress, setLocationType } from "react-geocode";
import useSWR from "swr";
import DevelopmentsContext from "../contexts/DevelopmentsContext";
import dayjs from "dayjs";
import { fetcher } from "../api/fetcher";

setKey(import.meta.env.VITE_GEOCODE_KEY);
setLocationType("ROOFTOP");

const initialState = {
  type: "",
  date: dayjs().format("YYYY-MM-DD"),
  time: "",
  endTime: "",
  status: "Pending",
  note: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  peopleID: "",
  organizationID: "",
  lat: 0,
  lng: 0,
  selectTypeContact: "",
  open: false,
};

function developmentReducer(stateDev, action) {
  switch (action.type) {
    case "SET_FIELD": // Update one field:  dispatch({ type: "SET_FIELD", field: "street", value: "123 Main" })
      return { ...stateDev, [action.field]: action.value };
    case "LOAD_DEVELOPMENT": // Load all fields from an existing development (for editing)
      return { ...stateDev, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return stateDev;
  }
}

export default function useDevelopmentForm() {
  const [stateDev, dispatch] = useReducer(developmentReducer, initialState);

  // Get
  const { refreshDevelopments: refresh } = useContext(DevelopmentsContext);
 

  // update any field
  const setField = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  // load into form for edit 
  const loadDevelopment = (dev) => {
    dispatch({
      type: "LOAD_DEVELOPMENT",
      payload: {
        type: dev.type,
        date: dev.date,
        time: dev.time,
        endTime: dev.end_time,
        status: dev.status,
        note: dev.note,
        street: dev.street,
        city: dev.city,
        state: dev.state,
        zipCode: dev.zip_code,
        lat: dev.lat,
        lng: dev.lng,
        peopleID: dev.people || "",
        organizationID: dev.organization || "",
        open: true,
      },
    });
  };



const geocode = async () => {
   const address = `${stateDev.street} ${stateDev.city} ${stateDev.state} ${stateDev.zipCode}`;
   if (stateDev.zipCode) {
     try {
       const { results } = await fromAddress(address);
       const { lat, lng } = results[0].geometry.location;
       setField("lat", lat);
       setField("lng", lng);
       return { lat, lng };
     } catch (error) {
       console.error(error);
     }
   }
   return { lat: stateDev.lat, lng: stateDev.lng };
 };

 
 const buildDevelopmentObject = () => ({
   type: stateDev.type,
   date: stateDev.date,
   time: stateDev.time,
   end_time: stateDev.endTime,
   status: stateDev.status,
   note: stateDev.note,
   street: stateDev.street,
   city: stateDev.city,
   state: stateDev.state,
   zip_code: stateDev.zipCode,
   people: stateDev.peopleID || null,
   organization: stateDev.organizationID || null,
   lat: stateDev.lat,
   lng: stateDev.lng,
 });

 // Post
 const handleSubmit = async () => {
   const obj = buildDevelopmentObject();
   const coords = await geocode();
   obj.lat = coords.lat;
   obj.lng = coords.lng;
   await axios.post("http://localhost:8000/api/developments/", obj, { headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    }});
   dispatch({ type: "RESET" });
   await refresh();
 };

 // Put

 const handleEdit = async (id) => {
   const obj = buildDevelopmentObject();
   const coords = await geocode();
   obj.lat = coords.lat;
   obj.lng = coords.lng;
   await axios.put(`http://localhost:8000/api/developments/${id}`, obj, { headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    }});
   setField("open", false);
   await refresh();
 };

 // Delete
 const handleDelete = async (id) => {
   await axios.delete(`http://localhost:8000/api/developments/${id}`, { headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    }});
   await refresh();
 };

 // everything components need 
 return {
   stateDev,
   setField,
   loadDevelopment,
   handleSubmit,
   handleEdit,
   handleDelete,  
 };
}

