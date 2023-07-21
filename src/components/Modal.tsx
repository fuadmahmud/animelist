import { useState } from "react";
import { Container, Modal as MUIModal, Typography, Box, Button as MUIButton } from "@mui/material"
import { useModal } from "../context/ModalContext"
import { Collection, useLocalStorage } from "../hooks";
import Button from "./Button";
import TextField from "./TextField";
import { useAlert } from "../context/AlertContext";
import { findAnime } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

// alphanumeric & underscore
const REGEX = /^\w+$/;

export default function Modal() {
  const { isOpen, setOpen, item } = useModal();
  const { setOpenAlert } = useAlert();
  const navigate = useNavigate();
  const [collection, setCollection] = useLocalStorage("COLLECTION", { } as Collection);
  const [isCreate, setIsCreate] = useState(false);
  const [name, setName] = useState("");
  const error = !REGEX.test(name);
  

  const handleAction = () => {
    if (!isCreate) setIsCreate(true);
    else {
      setCollection({ [name]: { } });
      setIsCreate(false);
    }
  }

  const handleSave = (col: string) => {
    const alreadyInCol = findAnime(collection, col, item.id);
    
    if (alreadyInCol) {
      setOpenAlert(true, { title: 'Failed', severity: 'error', children: `This anime failed to added to ${col} because it's already in it` });
    } else {
      setCollection({ ...collection, [col]: { ...collection[col], [item.id]: item }});
      setOpenAlert(true, { title: 'Sucess', severity: 'success', children: `This anime success to added to ${col}` });
      setOpen(false);
    }
  };

  const handleNavigate = () => {
    setOpen(false);
    navigate("/collection");
  }

  return (
    <MUIModal
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mx: 2 }}
      open={isOpen}
      onClose={() => {
        setName("")
        setOpen(false);
      }}>
      <Container sx={{ bgcolor: 'primary.main', height: '50%', padding: 2, borderRadius: 2 }}>
        {Object.keys(collection).length < 1
          ? <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" fontWeight={700} textAlign="center">There is no collection yet. Please create a new one.</Typography>
              {isCreate &&
                <TextField
                  error={error}
                  required
                  helperText="Collection name can only include alphanumeric & underscore"
                  label="Collection Name"
                  placeholder="Enter Your Collection Name"
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                  value={name} />}
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {isCreate && <MUIButton sx={{ zIndex: 1, marginTop: 1, height: '48px', color: 'white', mx: 1 }} onClick={() => setIsCreate(false)} variant="outlined">Back</MUIButton>}
                <Button
                  sx={{ zIndex: 1, marginTop: 1 }}
                  disabled={error && !!name}
                  onClick={handleAction}>{isCreate ? 'Create' : 'Create new collection'}</Button>
              </Box>
            </Box>
          : <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'scroll' }}>{Object.keys(collection).map((col) => 
            <MUIButton
              sx={{ border: '1px solid #0296E5', padding: 2, borderRadius: 1, color: 'white', width: '100%', textTransform: 'uppercase', mb: 2 }}
              onClick={() => handleSave(col)}
              key={col}>
                <Typography variant="body2">{col}</Typography>
            </MUIButton>
          )}
          <Button
            sx={{ zIndex: 1, marginTop: 1, width: '100%' }} onClick={handleNavigate}>
            Go to my collection
          </Button>
          </Box>}
      </Container>
    </MUIModal>
  )
}