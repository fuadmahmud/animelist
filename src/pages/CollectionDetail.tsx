import styled from "@emotion/styled";
import { Box, Grid, Typography, Button as MUIButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { removeAnime } from "../utils/helpers";
import { useLocalStorageCtx } from "../context/LocalStorageContext";

const Wrapper = styled.div`
  padding-top: 80px;
  margin: 0 1rem;
  margin-bottom: 1rem;
  height: 100vh;
`

const CoverImage = styled.img`
  cursor: pointer;
  border-radius: 4px;
  height: 75%;
  width: 100%;
  max-width: 180px;
`

const MenuImage = styled.div`
  background: linear-gradient(90deg, rgba(26, 26, 29, 1) 40%, rgba(2,150,229,1) 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 75%;
  width: 100%;
  max-width: 180px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

export default function CollectionDetail() {
  const { id } = useParams();
  const { getValue, setValue } = useLocalStorageCtx(); 
  const collection = getValue();
  const singleCol = id ? collection[id] : {};
  const [openMenu, setOpenMenu] = useState<undefined | number>();

  const handleRemove = (index: number) => {
    const newSingleCol = removeAnime(singleCol, index);
    setValue({ ...collection, [id as string]: newSingleCol });
  }
  
  return (
    <Wrapper>
      <Typography variant="body1" fontWeight={700} textTransform="uppercase" mb={2}>Collection {id}</Typography>
      {Object.keys(singleCol).length < 1 ? <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="body2" fontWeight={500} sx={{mb: 2}}>No anime added here. Please add a new one.</Typography>
        <Link to="/"><Button>Add anime to collection</Button></Link>
      </Box>
      : <Grid container spacing={1}>
          {Object.keys(singleCol).map((item, index) => {
            const key = parseInt(item);
            const id = singleCol[key].id;
            const title = singleCol[key].title;
            const episode = singleCol[key].episodes;
            const coverImage = singleCol[key].coverImage.large;
            return (
              <Grid item xs={6} md={3} lg={2} key={item}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  height={320}
                  gap={1}
                  overflow="hidden">
                  {openMenu !== undefined && index === openMenu
                    ?
                      <MenuImage onClick={() => setOpenMenu(undefined)}>
                        <MUIButton sx={{ height: '48px', color: 'white', mx: 1, width: '45%' }} onClick={() => handleRemove(id)} variant="outlined">Delete</MUIButton>
                        <Link to={`/${id}`}>
                          <Button
                            type="button"
                            sx={{ zIndex: 1, width: '45%' }}>
                            View
                          </Button>
                        </Link>
                      </MenuImage>
                    : <CoverImage onClick={() => setOpenMenu(index)} alt={title.english || title.romaji} src={coverImage} loading="lazy" />
                  }
                  <TitleWrapper>
                    <Typography className="line-clamp" variant="body1" fontWeight={500}>{
                      title.english || title.romaji || title.native}
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.5)" fontWeight={500}>Eps: {episode}</Typography>
                  </TitleWrapper>
                </Box>
              </Grid>
          )})}
        </Grid>
      }
    </Wrapper>
  )
}