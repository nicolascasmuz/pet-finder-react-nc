import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import { signinAtom, signinSelector } from "../atoms/sign-up-atoms";

function useSignUp() {
  const navigate = useNavigate();
  const setAuthDataState = useSetRecoilState(signinAtom);
  const userDataLoadable = useRecoilValueLoadable(signinSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  const emptyData: any = {
    userId: "",
    picURL: "",
    nickname: "",
    email: "",
    password: "",
    address: "",
    location: "",
    lat: "",
    lng: "",
    newUser: "",
    selectedPet: "",
    petsByRadius: [],
    myReportedPets: [],
  };

  useEffect(() => {
    if (userDataLoadable.state === "hasValue" && userDataLoadable.contents) {
      emptyData.email = userDataLoadable.contents.emailPassValues.email;
      emptyData.password = userDataLoadable.contents.emailPassValues.password;
      setDataState(emptyData);
      navigate("/location");
    }
  }, [userDataLoadable, navigate]);

  async function signUp(email, password) {
    setAuthDataState({ email, password });
  }

  return signUp;
}

export { useSignUp };
