import { useSetRecoilState } from "recoil";
import { dataAtom, emptyData } from "../atoms/data-atoms";

function useLogOut() {
  const setDataState = useSetRecoilState(dataAtom);

  function logOut() {
    setDataState(emptyData);
  }

  return logOut;
}

export { useLogOut };
