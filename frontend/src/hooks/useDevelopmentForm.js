import { useReducer, useContext, useState } from "react";
import axios from "axios";
import { setKey, fromAddress, setLocationType } from "react-geocode";
import DevelopmentsContext from "../contexts/DevelopmentsContext";
import AuthContext from "../contexts/AuthContext";
import dayjs from "dayjs";
import { API_BASE } from "../api/config";

setKey(import.meta.env.VITE_GEOCODE_KEY);
setLocationType("ROOFTOP");

const initialState = {
  type: "",
  date: dayjs().format("YYYY-MM-DD"),
  time: "",
  endTime: "",
  status: "pending",
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
  editId: null,
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
  const [formError, setFormError] = useState(null);
  const { userToken } = useContext(AuthContext);

  // Get
  const { refreshDevelopments: refresh } = useContext(DevelopmentsContext);

  const clearFormError = () => setFormError(null);
 

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
        selectTypeContact: dev.people ? "Person" : "Organization",
        open: true,
        editId: dev.id,
      },
    });
  };



const geocode = async () => {
   const { street, city, state, zipCode } = stateDev;
   if (!street || !city || !state || !zipCode) {
     throw new Error("Address is incomplete — street, city, state, and zip are all required.");
   }
   const address = `${street}, ${city}, ${state} ${zipCode}`;
   let results;
   try {
     ({ results } = await fromAddress(address));
   } catch (err) {
     throw new Error(`Address lookup failed: ${err?.message ?? "geocoding service error"}`);
   }
   const location = results?.[0]?.geometry?.location;
   if (!location) {
     throw new Error("Address not found. Check spelling or try a more specific address.");
   }
   return { lat: location.lat, lng: location.lng };
 };

 
 const buildDevelopmentObject = () => ({
   type: stateDev.type,
   date: stateDev.date,
   time: stateDev.time || null,
   end_time: stateDev.endTime || null,
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
   setFormError(null);
   let coords;
   try {
     coords = await geocode();
   } catch (err) {
     setFormError(err.message);
     return;
   }
   const obj = { ...buildDevelopmentObject(), lat: coords.lat, lng: coords.lng };
   await axios.post(`${API_BASE}/api/developments/`, obj, { headers: {
    Authorization: `Token ${userToken}`,
    }});
   dispatch({ type: "RESET" });
   await refresh();
 };

 // Put

 const handleEdit = async (id) => {
   setFormError(null);
   let coords;
   try {
     coords = await geocode();
   } catch (err) {
     setFormError(err.message);
     return;
   }
   const obj = { ...buildDevelopmentObject(), lat: coords.lat, lng: coords.lng };
   await axios.put(`${API_BASE}/api/developments/${id}`, obj, { headers: {
    Authorization: `Token ${userToken}`,
    }});
   setField("open", false);
   await refresh();
 };

 // Delete
 const handleDelete = async (id) => {
   await axios.delete(`${API_BASE}/api/developments/${id}`, { headers: {
    Authorization: `Token ${userToken}`,
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
   formError,
   clearFormError,
 };
}

