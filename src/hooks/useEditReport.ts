import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import { editReportAtom, editReportSelector } from "../atoms/edit-report-atoms";

function useEditReport() {
  const navigate = useNavigate();
  const setEditReportState = useSetRecoilState(editReportAtom);
  const editReportLoadable = useRecoilValueLoadable(editReportSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  useEffect(() => {
    if (
      editReportLoadable.state === "hasValue" &&
      editReportLoadable.contents
    ) {
      setDataState((prevState) => ({
        ...prevState,
        selectedPet: editReportLoadable.contents,
      }));

      if (editReportLoadable.contents.found === true) {
        navigate("/found-pet");
      }
    }
  }, [editReportLoadable]);

  async function editReport(editedData) {
    setEditReportState(editedData);
  }

  return editReport;
}

export { useEditReport };
