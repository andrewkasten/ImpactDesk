import { useReducer, useState, useContext } from "react";
import axios from "axios";
import { useSWRConfig } from "swr";
import dayjs from "dayjs";
import { API_BASE } from "../api/config";
import AuthContext from "../contexts/AuthContext";

const initialState = {
  donations: "",
  donate_type: "",
  date: dayjs().format("YYYY-MM-DD"),
  selectTypeContact: "Person",
  peopleID: "",
  organizationID: "",
};

function donationReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function useDonationForm() {
  const [stateDonation, dispatch] = useReducer(donationReducer, initialState);
  const [formError, setFormError] = useState(null);
  const { userToken } = useContext(AuthContext);
  const { mutate } = useSWRConfig();

  const setField = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const clearFormError = () => setFormError(null);

  const buildDonationObject = () => ({
    person:
      stateDonation.selectTypeContact === "Person"
        ? stateDonation.peopleID || null
        : null,
    organization:
      stateDonation.selectTypeContact === "Organization"
        ? stateDonation.organizationID || null
        : null,
    donations: stateDonation.donations,
    donate_type: stateDonation.donate_type || null,
    date: stateDonation.date,
  });

  const handleSubmit = async () => {
    setFormError(null);
    const obj = buildDonationObject();
    if (!obj.person && !obj.organization) {
      setFormError("Pick a Person or Organization for this donation.");
      return;
    }
    if (!obj.donations || Number(obj.donations) <= 0) {
      setFormError("Enter a donation amount greater than 0.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/api/donations/`, obj, {
        headers: { Authorization: `Token ${userToken}` },
      });
      dispatch({ type: "RESET" });
      mutate(
        (key) =>
          Array.isArray(key) &&
          typeof key[0] === "string" &&
          key[0].includes("/api/donations"),
      );
    } catch (err) {
      const detail =
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : err?.message ?? "unknown error";
      setFormError(`Could not save donation: ${detail}`);
    }
  };

  return {
    stateDonation,
    setField,
    handleSubmit,
    formError,
    clearFormError,
  };
}
