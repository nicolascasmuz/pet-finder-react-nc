import React, { useState, useEffect } from "react";
import { ButtonComp } from "../components/ButtonComp";
import { FormInputComp } from "../components/FormInputComp";
import { dataSelector } from "../atoms/data-atoms";
import { useRecoilValue } from "recoil";
import { useEditData } from "../hooks/useEditData";
import "./edit-data-page.css";

export function EditDataPage() {
  const editData = useEditData();
  const [coords, setCoords] = useState(null);
  const userData = useRecoilValue(dataSelector);

  const [nickname, setNickname] = useState(userData.nickname);
  const [email, setEmail] = useState(userData.email);
  const [address, setAddress] = useState(userData.address);
  const [location, setLocation] = useState(userData.location);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      userId: userData.userId,
      picURL: userData.picURL,
      nickname,
      email,
      address,
      location,
      lat: coords.lat,
      lng: coords.lng,
    };

    if (nickname !== "" && email !== "" && location !== "" && address !== "") {
      try {
        await editData(newData);
      } catch (error) {
        console.error(error);
      }
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
      <h1 className="main-title">Modificar datos</h1>
      <form className="modify-data-form dropzone" onSubmit={HandleSubmit}>
        <FormInputComp
          className="nickname-input"
          type="text"
          name="nick"
          value={nickname}
          textContent="NICK"
          onChange={(e) => setNickname(e.target.value)}
        />
        <FormInputComp
          className="email-input"
          type="email"
          name="email"
          value={email}
          textContent="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInputComp
          className="location1-input"
          type="text"
          name="address"
          value={address}
          textContent="DIRECCIÓN"
          onChange={(e) => setAddress(e.target.value)}
        />
        <FormInputComp
          className="location2-input"
          type="text"
          name="loc"
          value={location}
          textContent="LOCALIDAD"
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="button-guardar">
          <ButtonComp color="#ff7f87" textContent="Guardar" />
        </div>
      </form>
    </div>
  );
}
