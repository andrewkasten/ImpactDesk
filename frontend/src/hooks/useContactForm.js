import { useReducer } from "react";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { API_BASE } from "../api/config";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  title: "",
  website: "",
  phone: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  selectTypeContact: "",
};

function contactsReducer(stateContact, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...stateContact, [action.field]: action.value };
    case "LOAD_CONTACT":
      return { ...stateContact, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return stateContact;
  }
}

export default function useContactForm() {
  const [stateContact, dispatch] = useReducer(contactsReducer, initialState);
  const { userToken } = useContext(AuthContext);

  const { data: people, mutate: refreshPeople } = useSWR(
    userToken ? [`${API_BASE}/api/people/`, userToken] : null,
   fetcher,
 );

 const { data: organization, mutate: refreshOrganization } = useSWR(
  userToken ? [`${API_BASE}/api/organizations/`, userToken] : null,
   fetcher,
 );

 const setContactField = (field, value) => {
   dispatch({ type: "SET_FIELD", field, value });
 };
  const loadContact = (contact) => {
    dispatch({
      type: "LOAD_CONTACT",
      payload: {
        firstName: contact.first_name,
        lastName: contact.last_name,
        title: contact.title,
        website: contact.website,
        phone: contact.phone,
        email: contact.email,
        street: contact.street,
        city: contact.city,
        state: contact.state,
        zipCode: contact.zip_code,
        selectTypeContact: contact.people ? "Person" : "Organization",
      },
    });
  };

  const buildPeopleObject = () => ({
    first_name: stateContact.firstName,
    last_name: stateContact.lastName,  
    phone: stateContact.phone,
    email: stateContact.email,
    street: stateContact.street,
    city: stateContact.city,
    state: stateContact.state,
    zip_code: stateContact.zipCode,
  });

  const buildOrganizationObject = () => ({   
   title: stateContact.title,
   website: stateContact.website,
   phone: stateContact.phone,
   email: stateContact.email,
   street: stateContact.street,
   city: stateContact.city,
   state: stateContact.state,
   zip_code: stateContact.zipCode,
 });

  const handleContactSubmit = async () => {
    const obj = buildPeopleObject();
    if (stateContact.selectTypeContact === "Person") {
      await axios.post(
        `${API_BASE}/api/people/`,
        obj,
        { headers: {
          Authorization: `Token ${userToken}`,
       }},
      );
      await refreshPeople();
    }

    if (stateContact.selectTypeContact === "Organization") {
      const obj = buildOrganizationObject();
      await axios.post(
        `${API_BASE}/api/organizations/`,
        obj,
        { headers: {
          Authorization: `Token ${userToken}`,
       }},
      );
      await refreshOrganization()
    }
  };

  const handleContactDelete = async (id, selectTypeContact) => {
    const endpoint = selectTypeContact === "Person" ? "people" : "organizations";
    await axios.delete(`${API_BASE}/api/${endpoint}/${id}`, { headers: {
      Authorization: `Token ${userToken}`,
    }});
    await refreshPeople();
    await refreshOrganization();
  };

  return {
   stateContact,
   setContactField,
   loadContact,
   handleContactSubmit, 
   handleContactDelete,
   buildOrganizationObject,
   buildPeopleObject,
   people,
   organization,
 };


}
