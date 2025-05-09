import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const authAtom = atom({
  key: "auth-atom",
  default: {
    email: "",
    password: "",
  },
});

const authSelector = selector({
  key: "auth-selector",
  get: async ({ get }) => {
    const emailPassValues = get(authAtom);

    if (emailPassValues.email && emailPassValues.password) {
      const response = await fetch(API_BASE_URL + "/log-in", {
        headers: {
          "content-type": "application/json",
          authorization:
            "Bearer " + emailPassValues.email + " " + emailPassValues.password,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const json = await response.json();
        const data = json.profile;

        return data;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
});

export { authAtom, authSelector };
