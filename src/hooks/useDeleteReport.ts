import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import {
  deletedReportAtom,
  deletedReportSelector,
} from "../atoms/deleted-report-atoms";

function useDeleteReport() {
  const navigate = useNavigate();
  const setDeletedReportState = useSetRecoilState(deletedReportAtom);
  const deletedReportLoadable = useRecoilValueLoadable(deletedReportSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  useEffect(() => {
    if (
      deletedReportLoadable.state === "hasValue" &&
      deletedReportLoadable.contents
    ) {
      navigate("/deleted-pet");
    }
  }, [deletedReportLoadable]);

  async function deleteReport(petID) {
    setDeletedReportState(petID);
  }

  return deleteReport;
}

export { useDeleteReport };
