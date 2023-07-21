import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query AnimeList($page: Int) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      recommendations(sort:RATING) {
        media {
          id
          seasonYear
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
        }
      }
    }
  }
`


export const GET_DETAIL_ANIME = gql`
  query DetailAnime($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      episodes
      bannerImage
      description
      coverImage {
        extraLarge
        large
        color
      }
    }
  }
`