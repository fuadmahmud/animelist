import { AppBar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolling, setScrolling] = React.useState(false);
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
        padding: '1rem' }}
    >
      <Link to="/">
        <Typography variant="h4" fontWeight={700}>Animelist</Typography>
      </Link>
    </AppBar>
  )
}