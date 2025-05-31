import React from 'react';
import { alpha, keyframes, Skeleton, styled } from '@mui/material';
import {Link as LinkComponent} from 'react-router-dom';
// Color constants are now sourced from the theme object.

const VisuallyHiddenInput = styled('input')({
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,

});

export const Link = styled(LinkComponent)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary, // Uses textPrimaryDark from theme
  padding: '1rem',
  '&:hover': {
    color: theme.palette.primary.main, // Use accent color for hover
  }
}));

export const InputBox = styled("input")(({ theme }) => ({
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    padding: '1rem 3rem',
    color: theme.palette.text.primary, // Use primary text color for input
    borderRadius: '1.5rem',
    backgroundColor: theme.palette.background.paper, // Use paper for input background for slight elevation
    border: `1px solid ${theme.palette.divider}`, // Add a subtle border
    '&:focus': {
        borderColor: theme.palette.primary.main,
    }
}));

 export const SearchField = styled("input")(({ theme }) => ({
    width: '20vmax',
    border: 'none',
    outline: 'none',
    padding: '1rem 2rem',
    borderRadius: '1.5rem',
    backgroundColor: theme.palette.background.paper, // Use paper for search field background
    fontSize: '1.1rem',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    '&:focus': {
        borderColor: theme.palette.primary.main,
    }
}));

export const CurveButton = styled("button")(({ theme }) => ({
    border: 'none',
    outline: 'none',
    padding: '1rem 2rem',
    borderRadius: '1.5rem',
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main, // Use accent color for button
    fontSize: '1.1rem',
    color: theme.palette.primary.contrastText || theme.palette.text.primary, // Ensure contrast
    '&:hover': {
        backgroundColor: theme.palette.primary.dark || alpha(theme.palette.primary.main, 0.8), // Darken on hover
    }
}));

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

export const BouncingSkeleton = styled(Skeleton)(({ theme }) => ({
  animation: `${bounceAnimation} 1s infinite`,
  backgroundColor: alpha(theme.palette.text.secondary, 0.2), // Use a semi-transparent version of secondary text or a dark grey
}));

export function VisuallyHiddenInputComponent(props) {
    return <VisuallyHiddenInput {...props} />;
}