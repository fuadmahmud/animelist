import { createContext, useContext, ReactNode, useState } from "react";
import { DetailAnime } from "../pages/Detail";

interface IModalContext {
  setOpen: (val: boolean) => void;
  isOpen: boolean;
  setItem: (val: DetailAnime) => void;
  item: DetailAnime;
}

const initialState = {
  setOpen: () => ({}),
  isOpen: false,
  item: {
    id: 0,
    bannerImage: "",
    description: "",
    episodes: 0,
    title: {
      english: "",
      romaji: "",
      native: "",
    },
    coverImage: {
      extraLarge: "",
      large: "",
      color: ""
    }
  },
  setItem: () => ({})
}


const ModalContext = createContext<IModalContext>(initialState);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState<DetailAnime>(initialState.item);

  return (
    <ModalContext.Provider value={{ setOpen, isOpen, item, setItem }}>
      {children}
    </ModalContext.Provider>
  )
}