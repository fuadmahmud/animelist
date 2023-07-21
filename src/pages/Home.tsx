import { useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";
import { Typography, CircularProgress, Grid, Box, Container } from "@mui/material";
import { GET_ANIME_LIST } from "../query";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

type Recommendations = Array<{
  media: {
    id: number;
    seasonYear: string;
    coverImage: {
      large: string;
    };
    title: {
      english: string;
      native: string;
      romaji: string;
    }
  }
}>

const CoverImage = styled.img`
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

export default function Home() {
  const { loading, data, fetchMore } = useQuery(GET_ANIME_LIST, {
    variables: { page: 1 }
  });
  const page = data?.Page?.pageInfo?.currentPage;
  const hasNextPage = data?.Page?.pageInfo?.hasNextPage;
  const recommendations: Recommendations = data?.Page?.recommendations || [];
  const observer = useRef<IntersectionObserver | null>();
  const lastItemRef = useCallback((node: Element | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && hasNextPage) {
        fetchMore({
          variables: { page: page + 1 },
          updateQuery(previousQueryResult, { fetchMoreResult }) {
            const newEntries = fetchMoreResult.Page.recommendations;
            return { Page: {
                __typename: 'Page',
                pageInfo: fetchMoreResult.Page.pageInfo,
                recommendations: [...previousQueryResult.Page.recommendations, ...newEntries]
              } 
            }
          },
        })
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasNextPage, page])

  return (
    <Container sx={{ paddingTop: '80px' }}>
      <Typography variant="h6" mb={1} fontWeight={700}>Recommendation</Typography>
      {!loading &&
        <Grid container spacing={1}>
          {recommendations.map((item, index) => (
            <Grid item xs={6} md={3} lg={2} key={index}>
              <Link to={`/${item.media.id}`}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  height={320}
                  gap={1}
                  overflow="hidden">
                  <CoverImage alt={item.media.title.english || item.media.title.romaji} src={item.media.coverImage.large} loading="lazy" />
                  <TitleWrapper>
                    <Typography className="line-clamp" variant="body1" fontWeight={500}>{
                      item.media.title.english || item.media.title.romaji || item.media.title.native}
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.5)" fontWeight={500}>{item.media.seasonYear}</Typography>
                  </TitleWrapper>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      }
      {loading && <CircularProgress color='secondary' sx={{ margin: '4px 45%'}} />}
      <div ref={lastItemRef} style={{ visibility: 'hidden' }} />
    </Container>
  )
}