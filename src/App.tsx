import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ThemeProvider, createTheme } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from "@apollo/client/utilities";
import { ModalProvider } from "./context/ModalContext";
import { AlertProvider } from "./context/AlertContext";
import { LocalStorageProvider } from "./context/LocalStorageContext";


const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          page: offsetLimitPagination()
        }
      }
    }
  }),
});

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans Variable', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'].join(',')
  },
  palette: {
    common: {
      black: "#000",
      white: "#FFF"
    },
    primary: {
      main: "#1A1A1D"
    },
    secondary: {
      main: "#0296E5"
    }
  }
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <ModalProvider>
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <LocalStorageProvider>
              <RouterProvider router={router} />
            </LocalStorageProvider>
          </AlertProvider>
        </ThemeProvider>
      </ModalProvider>
    </ApolloProvider>
  )
}

export default App