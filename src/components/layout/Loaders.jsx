import { Grid, Skeleton, Stack, Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { BouncingSkeleton } from '../styles/StyledComponents';

// Performance optimization: Memoize loader components to prevent unnecessary re-renders
const LayoutLoader = memo(() => {
    return (
        <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
            <Grid
                item
                sm={4}
                md={3}
                sx={{
                    display: { xs: "none", sm: "block" },
                }}
                height={"100%"}
            >
                <Skeleton variant="rectangular" height={"100vh"} />
            </Grid>
            <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                <Stack spacing={"1rem"}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton key={index} variant="rounded" height={"5rem"} />
                    ))}
                </Stack>
            </Grid>
            <Grid
                item
                md={4}
                lg={3}
                height={"100%"}
                sx={{
                    display: { xs: "none", md: "block" },
                }}
            >
                <Skeleton variant="rectangular" height={"100vh"} />
            </Grid>
        </Grid>
    )
});

// Performance optimization: Lightweight loader for initial app loading with better styling
const AppLoader = memo(() => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="background.default"
            sx={{
                background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
            }}
        >
            <Stack spacing={3} alignItems="center">
                <BouncingSkeleton
                    variant="circular"
                    width={60}
                    height={60}
                    sx={{
                        bgcolor: 'primary.main',
                        opacity: 0.8,
                    }}
                />
                <Typography 
                    variant="h6" 
                    color="text.secondary"
                    sx={{
                        fontWeight: 300,
                        letterSpacing: 1,
                    }}
                >
                    Loading Chat App...
                </Typography>
                {/* Performance optimization: Add a subtle progress indicator */}
                <Box
                    sx={{
                        width: 200,
                        height: 2,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            width: '30%',
                            height: '100%',
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                            animation: 'loading-progress 2s infinite',
                            '@keyframes loading-progress': {
                                '0%': { transform: 'translateX(-100%)' },
                                '100%': { transform: 'translateX(500%)' },
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Box>
    )
});

// Performance optimization: Memoize TypingLoader
const TypingLoader = memo(() => {
    return (
        <Stack
            spacing={"0.5rem"}
            direction={"row"}
            padding={"0.5rem"}
            justifyContent={"center"}
        >
            {/* Performance optimization: Use CSS animation instead of JS for better performance */}
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'text.secondary',
                    animation: 'typing 1.4s infinite ease-in-out',
                    animationDelay: '0s',
                    '@keyframes typing': {
                        '0%, 80%, 100%': {
                            transform: 'scale(0)',
                            opacity: 0.5,
                        },
                        '40%': {
                            transform: 'scale(1)',
                            opacity: 1,
                        },
                    },
                }}
            />
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'text.secondary',
                    animation: 'typing 1.4s infinite ease-in-out',
                    animationDelay: '0.2s',
                    '@keyframes typing': {
                        '0%, 80%, 100%': {
                            transform: 'scale(0)',
                            opacity: 0.5,
                        },
                        '40%': {
                            transform: 'scale(1)',
                            opacity: 1,
                        },
                    },
                }}
            />
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'text.secondary',
                    animation: 'typing 1.4s infinite ease-in-out',
                    animationDelay: '0.4s',
                    '@keyframes typing': {
                        '0%, 80%, 100%': {
                            transform: 'scale(0)',
                            opacity: 0.5,
                        },
                        '40%': {
                            transform: 'scale(1)',
                            opacity: 1,
                        },
                    },
                }}
            />
        </Stack>
    );
});

export { LayoutLoader, TypingLoader, AppLoader };