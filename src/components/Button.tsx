import { Button, ButtonProps } from "@mui/material";

export default ({ children, sx, ...props }: ButtonProps) => <Button {...props} sx={{
  ...sx,
  background: '#1A1A1D',
  backgroundClip: 'padding-box',
  border: 'solid 2px transparent',
  borderRadius: '8px',
  color: 'white',
  padding: '.5rem',
  position: 'relative',
  height: '48px',
  '::before': {
    borderRadius: 'inherit',
    background: 'linear-gradient(90deg, rgba(2,150,229,1) 0%, rgba(144,83,164,1) 60%)',
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: '-2px',
    zIndex: -1
  }
}}>{children}</Button>