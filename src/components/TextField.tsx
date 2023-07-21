import { TextField, TextFieldProps } from "@mui/material";

export default (props: TextFieldProps) => <TextField
  {...props}
  sx={{ margin: '1rem 0', width: '90%',
    '& .Mui-error': {
      color: '#d32f2f !important'
    },
    '& .MuiFormLabel-root': {
      color: 'white'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-root': {
      borderColor: 'white',
      color: 'white',
    },
    '& .MuiFormHelperText-root': {
      color: 'white'
    },
  }}
  variant="standard" />