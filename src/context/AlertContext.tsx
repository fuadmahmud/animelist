import { createContext, useContext, ReactNode, useState } from "react";
import { AlertProps } from "@mui/material";

interface IAlertProps {
  title: string;
  children: string;
  severity: AlertProps["severity"];
}

interface IAlertContext {
  getAlertProps: () => IAlertProps | undefined
  setOpenAlert: (open: boolean, props?: IAlertProps) => void;
  openAlert: boolean;
  alertProps?: IAlertProps;
}

const initialState = {
  setOpenAlert: () => ({}),
  getAlertProps: () => undefined,
  openAlert: false,
}


const AlertContext = createContext<IAlertContext>(initialState);

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<IAlertProps | undefined>();

  const _setOpenAlert = (open: boolean, props?: IAlertProps) => {
    setAlertProps(props);
    setOpenAlert(open);
  };

  const getAlertProps = () => alertProps;

  return (
    <AlertContext.Provider value={{ openAlert, getAlertProps, setOpenAlert: _setOpenAlert }}>
      {children}
    </AlertContext.Provider>
  )
}