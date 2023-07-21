import React, { createContext, ReactNode, useContext } from "react"
import { Collection, useLocalStorage } from "../hooks";

interface ILocalStorageContext {
  setValue: React.Dispatch<React.SetStateAction<Collection>>;
  getValue: () => Collection;
}

const initialState = {
  setValue: () => ({}),
  getValue: () => ({})
}

const LocalStorageContext = createContext<ILocalStorageContext>(initialState);

export const useLocalStorageCtx = () => useContext(LocalStorageContext);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useLocalStorage("COLLECTION", {} as Collection)

  const getValue = () => value;

  return (
    <LocalStorageContext.Provider value={{ setValue, getValue }}>
      {children}
    </LocalStorageContext.Provider>
  );
}