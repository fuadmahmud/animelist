import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { GET_DETAIL_ANIME } from "../query";
import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";
import Button from "../components/Button";
import { useModal } from "../context/ModalContext";

export type DetailAnime = {
  id: number;
  bannerImage: string;
  description: string;
  episodes: number;
  title: {
    english: string;
    romaji: string;
    native: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    color: string;
  }
}

const Wrapper = styled.div`
  padding-top: 80px;
`

const BgWrapper = styled.div`
  height: 360px;
  position: relative;
  width: 100%;
`

const BlurredDiv = styled.div`
  background: linear-gradient(0deg, rgba(26, 26, 29, 1) 0%, rgba(26, 26, 29, .25) 60%, rgba(0,0,0,0) 100%);
  bottom: 0;
  height: 50%;
  position: absolute;
  right: 0;
  left: 0;
`

export default function Detail() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_DETAIL_ANIME, { variables: { id } });
  const { setOpen, setItem } = useModal();
  const detail: DetailAnime = data?.Media || {};
  
  return (
    <Wrapper>
      {loading || !detail?.bannerImage
        ? null
        : <BgWrapper>
            <div
              style={{
                backgroundImage: `url(${detail.bannerImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                height: '100%',
                width: '100%',
              }} 
            />
            <BlurredDiv />
        </BgWrapper>
      }
      <Container sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" fontWeight={700}>{detail.title?.english || detail.title?.romaji || ''}</Typography>
        <Typography variant="h6" color="rgba(255,255,255,0.5)">{detail.title?.native}</Typography>
        <div style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: detail.description }} />
        <div style={{ display: 'flex', flexDirection: 'row', margin: '1rem 0' }}>
          <Typography variant="body2" fontWeight={700}>Appear in:&nbsp;</Typography>
        </div>
        <Button sx={{ margin: '1rem 0' }} onClick={() => {
          setOpen(true);
          setItem(detail);
        }}>Add to collection</Button>
      </Container>
    </Wrapper>
  )
}