import styled from "@emotion/styled"
import { Collection, useLocalStorage } from "../hooks"
import { Box, Typography, Button as MUIButton, Grid, Modal, Container } from "@mui/material";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { editCollection, findCollection, removeCollection } from "../utils/helpers";
import DefaultCover from "../assets/default-cover.jpg";
import { useState } from "react";
import TextField from "../components/TextField";
import { useAlert } from "../context/AlertContext";
import { EditOutlined, DeleteOutline } from '@mui/icons-material';

const Wrapper = styled.div`
  padding-top: 80px;
  margin: 0 1rem;
  height: 100vh;
`

const CoverImage = styled.img`
  height: 80px;
  width: 80px;
  transform: rotate(40deg);
  margin-right: -40px;
`

// alphanumeric & underscore
const REGEX = /^\w+$/;

export default function CollectionPage() {
  const [collection, setCollection] = useLocalStorage("COLLECTION", {} as Collection);
  const [openModal, setOpenModal] = useState<"create" | "delete" | "edit" | "">("");
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");
  const { setOpenAlert } = useAlert();
  const navigate = useNavigate();
  const error = !REGEX.test(name);
  
  const handleSave = () => {
    const available = !findCollection(collection, name);
    if (!available) {
      setOpenAlert(true, { title: 'Failed', severity: 'error', children: `Encounter collection with same name` });
    } else {
      setCollection({ ...collection, [name]: { } });
      setOpenAlert(true, { title: 'Sucess', severity: 'success', children: `Success to create new collection` });
      setOpenModal("");
    }
  };

  const handleDelete = () => {
    const newCol = removeCollection(collection, name);

    setCollection(newCol);
  };

  const handleEdit = () => {
    const newCol = editCollection(collection, oldName, name);

    setCollection(newCol)
  }

  const handleSubmit = () => {
    switch (openModal) {
      case "create":
        handleSave();
        break;
      case "delete":
        handleDelete();
        break;
      case "edit":
        handleEdit();
        break;
      default:
        break;
    }

    setName("");
    setOldName("");
    setOpenModal("");
  }

  return (
    <Wrapper>
      {Object.keys(collection).length < 1
        ? <Box>
          <Typography variant="h6" fontWeight={700}>You haven't create any collection let's create a new one</Typography>
          <Button onClick={() => setOpenModal("create")}>Create Collection</Button>
        </Box>
        : <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: 2, justifyContent: 'space-between' }}>
          <Grid container spacing={0}>
            {Object.keys(collection).map((item, index) => {
              const isEmpty = !findCollection(collection, item);
              const key = isEmpty ? 0 : parseInt(Object.keys(collection[item])[0]);
              const color = isEmpty ? '#0296E5' : collection[item][key].coverImage.color;
              const image = isEmpty ? DefaultCover : collection[item][key].coverImage.large;
              return (
                <Grid item xs={12} sm={5} md={3} key={index}
                  sx={{
                    marginRight: 1,
                    marginBottom: 1,
                    background: color,
                    borderRadius: 2,
                    filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
                  }}
                  >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    height={120}
                    p={1}
                    overflow="hidden"
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" fontWeight={700} textTransform="uppercase">{item}</Typography>
                        <MUIButton onClick={() => {
                          setOpenModal("delete");
                          setName(item)
                        }}>
                          <DeleteOutline sx={{ color: 'common.white' }} />
                        </MUIButton>
                        <MUIButton onClick={() => {
                          setName(item)
                          setOpenModal("edit");
                          setOldName(item);
                        }}>
                          <EditOutlined sx={{ color: 'common.white' }} />
                        </MUIButton>
                      </Box>
                      <MUIButton onClick={() => navigate(`/collection/${item}`)}>
                        <CoverImage alt={item} src={image} loading="lazy" />
                      </MUIButton>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
          <Button sx={{ zIndex: 0, my: 2 }} onClick={() => setOpenModal("create")}>Create Collection</Button>
        </Container>
      }
      <Modal
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mx: 2 }}
        open={!!openModal}
        onClose={() => setOpenModal("")}>
        {openModal === 'delete' ? <Container sx={{ bgcolor: 'primary.main', height: '50%', padding: 2, borderRadius: 2 }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" fontWeight={500} textTransform="uppercase">{openModal} MODE</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', pt: 4 }}>
                <MUIButton sx={{ height: '48px', color: 'white', mx: 1, width: '45%' }} onClick={() => setOpenModal("")} variant="outlined">Cancel</MUIButton>
                <Button
                  type="button"
                  sx={{ zIndex: 1, width: '45%' }}
                  disabled={error && !!name}
                  onClick={handleSubmit}>Delete</Button>
              </Box>
            </Box>
          </Container>
        : <Container sx={{ bgcolor: 'primary.main', height: '50%', padding: 2, borderRadius: 2 }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" fontWeight={500} textTransform="uppercase">{openModal} MODE</Typography>
            <TextField
              error={error}
              required
              helperText="Collection name can only include alphanumeric & underscore"
              label="Collection Name"
              placeholder="Enter Your Collection Name"
              onChange={(e) => setName(e.target.value.toLowerCase())}
              value={name} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <MUIButton sx={{ height: '48px', color: 'white', mx: 1, width: '45%' }} onClick={() => setOpenModal("")} variant="outlined">Cancel</MUIButton>
              <Button
                type="button"
                sx={{ zIndex: 1, width: '45%' }}
                disabled={error && !!name}
                onClick={handleSubmit}>{openModal === 'create' ? 'Create' : 'Save'}</Button>
            </Box>
          </Box>
        </Container>}
      </Modal>
    </Wrapper>
  )
}