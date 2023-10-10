import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomCssTextField = styled(TextField)({
    '& label': {
        color: '#888888',
        fontFamily: 'Syne, sans-serif',
        left: '16px',
    },
    '& label.Mui-focused': {
        color: '#D9D9D9',
        boxSizing: 'border-box'
    },
    '& legend span': {
        display: 'block',
        padding: '0 16px'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#3B3B3C',
            color: '#D9D9D9',
            borderRadius: '8px',
        },
        '& input': {
            color: '#D9D9D9',
            paddingLeft: '30px'
        },
        '&:hover fieldset': {
            borderColor: '#D9D9D9',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#D9D9D9',
        },
    },
});

export default CustomCssTextField;
