import React from "react";
import styled from "@emotion/styled";
import { AppBar, Box, Button, List, ListItem, ListItemText, SwipeableDrawer, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Bar = styled.div`
  background: white;
  height: 2px;
  width: 1rem;
  margin-bottom: 4px;
`

export default function Header() {
  const navigate = useNavigate();
  const [isScrolling, setScrolling] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  const handleNavigate = (path: string) => {
    setOpenDrawer(false);
    navigate(path === 'home'? '' : `/${path}`);
  }

  const handleNavBg = () => {
    window.scrollY > 0 ? setScrolling(true) : setScrolling(false)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleNavBg);
    return () => {
      window.removeEventListener('scroll', handleNavBg);
    }
  }, [])

  return (
    <AppBar
      component="nav"
      sx={{ background: isScrolling ? 'linear-gradient(90deg, rgba(26, 26, 29, 1) 40%, rgba(2,150,229,1) 100%)' : 'transparent',
        boxShadow: 'none',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Link to="/">
        <Typography variant="h4" fontWeight={700}>Animelist</Typography>
      </Link>
      <Box>
        <Button sx={{ display: 'flex', flexDirection: 'column' }} onClick={() => setOpenDrawer(true)}>
          <Bar />
          <Bar />
        </Button>
        <SwipeableDrawer
          anchor="right"
          open={openDrawer}
          onOpen={toggleDrawer(true)}
          onClose={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ '& .MuiPaper-root': { bgcolor: 'primary.main', width: '40%' } }}
        >
          <List>
            {['HOME', 'COLLECTION'].map((item, index) =>
              <ListItem sx={{ cursor: 'pointer', color: 'white' }} key={item} onClick={() => handleNavigate(item.toLowerCase())} tabIndex={index}>
                <ListItemText>
                  {item}
                </ListItemText>
              </ListItem>
            )}
          </List>
        </SwipeableDrawer>
      </Box>
    </AppBar>
  )
}