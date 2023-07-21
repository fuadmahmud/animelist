import { Alert, AlertTitle } from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { useEffect } from "react";


export default () => {
  const { openAlert, getAlertProps, setOpenAlert } = useAlert();
  const props = getAlertProps();

  useEffect(() => {
    if (openAlert) {
      const timeout = setTimeout(() => setOpenAlert(false, undefined), 3500);

      return () => clearTimeout(timeout);
    }
  }, [openAlert])

  return openAlert && (
    <Alert sx={{ zIndex: 2000, position: 'fixed', top: '40px', mx: 2 }} severity={props?.severity || "success"}>
      <AlertTitle sx={{ fontWeight: 700 }}>{props?.title}</AlertTitle>
      {props?.children}
    </Alert>
  )
}