import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import { profileAtom, profileSelector } from "../atoms/set-profile-atoms";
import mapboxgl from "mapbox-gl";
import MapboxClient from "mapbox";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibmljb2xhc2Nhc211eiIsImEiOiJjbGlnazg2cjExZTdvM21tcWl6eGU5bDM0In0.EtaC4N7nb_NuwfddaKZaow";
mapboxgl.accessToken = MAPBOX_TOKEN;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

function useSetProfile() {
  const navigate = useNavigate();
  const setProfileDataState = useSetRecoilState(profileAtom);
  const profileDataLoadable = useRecoilValueLoadable(profileSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  useEffect(() => {
    if (
      profileDataLoadable.state === "hasValue" &&
      profileDataLoadable.contents
    ) {
      console.log("useSetProfile (profileDataLoadable): ", profileDataLoadable);
      setDataState(profileDataLoadable.contents);
      navigate("/home");
    }
  }, [profileDataLoadable, navigate]);

  async function setProfile(coords, address, location) {
    const setProfileData = {
      email: stateData.email,
      password: stateData.password,
      address,
      location,
      lat: coords.lat,
      lng: coords.lng,
    };

    console.log("useSetProfile (setProfileData): ", setProfileData);
    setProfileDataState(setProfileData);
  }

  return setProfile;
}

export { useSetProfile };
