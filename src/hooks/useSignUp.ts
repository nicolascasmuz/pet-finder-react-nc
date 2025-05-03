import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { dataAtom } from "../atoms/data-atoms";
import { signinAtom, signinSelector } from "../atoms/sign-up-atoms";

function useSignUp() {
  const navigate = useNavigate();
  const setAuthDataState = useSetRecoilState(signinAtom);
  const userDataLoadable = useRecoilValueLoadable(signinSelector);
  const setDataState = useSetRecoilState(dataAtom);

  const data: any = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (userDataLoadable.state === "hasValue" && userDataLoadable.contents) {
      data.email = userDataLoadable.contents.emailPassValues.email;
      data.password = userDataLoadable.contents.emailPassValues.password;
      setDataState(data);
      navigate("/location");
    }
  }, [userDataLoadable, navigate]);

  async function signUp(email, password) {
    setAuthDataState({ email, password });
  }

  return signUp;
}

export { useSignUp };
