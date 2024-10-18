import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import {
  petsByRadiusAtom,
  petsByRadiusSelector,
} from "../atoms/pets-by-radius-atoms";

function usePetsByRadius() {
  const navigate = useNavigate();
  const setPetsByRadiusState = useSetRecoilState(petsByRadiusAtom);
  const petsByRadiusLoadable = useRecoilValueLoadable(petsByRadiusSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  useEffect(() => {
    if (
      petsByRadiusLoadable.state === "hasValue" &&
      petsByRadiusLoadable.contents
    ) {
      setDataState((prevState) => ({
        ...prevState,
        petsByRadius: petsByRadiusLoadable.contents,
      }));
    }
  }, [petsByRadiusLoadable]);

  async function petsByRadius(search) {
    setPetsByRadiusState(search);
  }

  async function deletePetsByRadius(trueValue) {
    if (trueValue) {
      setDataState((prevState) => ({
        ...prevState,
        petsByRadius: [],
      }));
    }
  }

  return { petsByRadius, deletePetsByRadius };
}

export { usePetsByRadius };
