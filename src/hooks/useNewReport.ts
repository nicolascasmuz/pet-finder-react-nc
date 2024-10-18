import React, { useEffect } from "react";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import {
  newReportAtom,
  newReportSelector,
} from "../atoms/set-new-report-atoms";

function useNewReport() {
  const setNewReportState = useSetRecoilState(newReportAtom);
  const newReportLoadable = useRecoilValueLoadable(newReportSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  async function newReport(newReportData) {
    setNewReportState(newReportData);
  }

  return newReport;
}

export { useNewReport };
