import React from 'react';
import { keyframes, Skeleton, styled } from '@mui/material';
import {Link as LinkComponent} from 'react-router-dom';
import { grayColor, matBlack, typeing } from '../../constants/color';

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

export const Link = styled(LinkComponent)`
     text-decoration: none;
     color: black;
     padding: 1rem;
     &:hover {
        background-color: rgba(0, 0, 0, 0.1);
     }
`;

export const InputBox = styled("input")`
    width: 100%;
    height: 100%;   
    border: none;
    outline: none;
    padding: 1rem 3rem ;
    color: white;
    border-radius: 1.5rem;
    background-color: ${typeing};
    
`;

 export const SearchField = styled("input")`
    width: 20vmax; 
    border: none;
    outline: none;
    padding: 1rem 2rem;
    border-radius: 1.5rem;
    background-color: ${grayColor};
    font-size: 1.1rem;  
`;

export const CurveButton = styled("button")`
    border: none;
    outline: none;
    padding: 1rem 2rem;
    border-radius: 1.5rem;
    cursor: pointer;
    background-color: ${matBlack};
    font-size: 1.1rem;  
    color: white;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`; 

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
  backgroundColor: '#f0f0f0',
}));

export function VisuallyHiddenInputComponent(props) {
    return <VisuallyHiddenInput {...props} />;
}