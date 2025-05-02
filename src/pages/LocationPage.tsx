import React, { useEffect, useState } from "react";
import { ButtonComp } from "../components/ButtonComp";
import { FormInputComp } from "../components/FormInputComp";
import getLocationImg from "../resources/get-location_1@2x.png";
import "./location-page.css";
import { useSetProfile } from "../hooks/useSetProfile";

export function LocationPage() {
  const setProfile = useSetProfile();
  const [coords, setCoords] = useState(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const addressValue = e.target.address.value;
    const townValue = e.target.town.value;

    try {
      await setProfile(coords, addressValue, townValue);
    } catch (error) {
      console.error("LocationPage Error: ", error);
    }
  };

  useEffect(() => {
    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = (error) => {
      console.log("geolocation error: ", error);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div className="general-container">
      <img
        className="main-page-picture"
        src={getLocationImg}
        alt="main-page-picture"
      />
      <form className="location-form" onSubmit={HandleSubmit}>
        <FormInputComp
          className="input1"
          type="text"
          name="address"
          textContent="DIRECCIÓN"
        />
        <FormInputComp
          className="input2"
          type="text"
          name="town"
          textContent="LOCALIDAD"
        />
        <ButtonComp
          className="button-next"
          color="#00a884"
          textContent="Siguiente"
        />
      </form>
    </div>
  );
}
