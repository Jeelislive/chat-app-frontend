import { Avatar, Stack, Typography, Paper, Divider, Box, useTheme, alpha } from '@mui/material';
import React from 'react';
import {
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon // Corrected spelling
} from '@mui/icons-material';
import moment from 'moment';
import { transformImage } from '../../lib/features';

const Profile = ({ user }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={4} // Subtle elevation for a "cool" floating card effect
            sx={{
                padding: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive padding
                borderRadius: "16px", // Softer, modern border radius
                width: "100%",
                maxWidth: "550px", // Max width for content
                margin: "2rem auto", // Centered with margin
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.1)}`, // Softer shadow
            }}
        >
            <Stack spacing={{ xs: 2, sm: 2.5 }} direction={"column"} alignItems={"center"}>
                <Avatar
                    src={transformImage(user?.avatar?.url)}
                    alt={user?.name}
                    sx={{
                        width: { xs: 100, sm: 120, md: 140 }, // Responsive avatar size
                        height: { xs: 100, sm: 120, md: 140 },
                        objectFit: "cover",
                        border: `3px solid ${theme.palette.primary.main}`,
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)', // Slight scale on hover for "cool" factor
                        }
                    }}
                />
                <Typography
                    variant="h4" // Responsive font size handled by theme or could use sx
                    component="h1"
                    textAlign="center"
                    fontWeight="600"
                    color={theme.palette.text.primary}
                    sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } }}
                >
                    {user?.name}
                </Typography>

                {user?.bio && (
                    <Typography
                        variant="body1"
                        textAlign="center"
                        color={theme.palette.text.secondary}
                        sx={{
                            fontStyle: 'italic',
                            px: { xs: 1, sm: 2 },
                            maxWidth: '90%', // Ensure bio doesn't stretch too wide
                        }}
                    >
                        "{user.bio}"
                    </Typography>
                )}

                <Divider sx={{ width: '90%', my: { xs: 1.5, sm: 2 } }} />

                <Stack spacing={{ xs: 1.5, sm: 2 }} sx={{ width: '100%' }}>
                    <ProfileCardRow
                        Icon={<UserNameIcon />}
                        heading={"Username"}
                        text={user?.username ? `@${user.username}` : "N/A"}
                    />
                    <ProfileCardRow
                        Icon={<CalendarIcon />}
                        heading={"Joined"}
                        text={moment(user?.createdAt).fromNow()}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

const ProfileCardRow = ({ Icon, heading, text }) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2} // Consistent spacing
            sx={{
                width: "100%",
                padding: { xs: "0.5rem", sm: "0.75rem 1rem" }, // Responsive padding for rows
                borderRadius: '12px', // Rounded corners for rows if a background is added
                // For a more minimal look, avoid background on rows unless desired
                // backgroundColor: alpha(theme.palette.action.hover, 0.03),
            }}
        >
            {Icon && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    padding: '10px', // Increased padding for icon container
                    borderRadius: '50%', // Circular background for icon
                    minWidth: '40px', // Ensure consistent size
                    minHeight: '40px',
                }}>
                    {React.cloneElement(Icon, { fontSize: 'medium' })}
                </Box>
            )}
            <Stack sx={{ flexGrow: 1 }}>
                <Typography
                    variant="caption"
                    color={theme.palette.text.secondary}
                    sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.7rem', // Slightly smaller caption
                        mb: 0.25, // Small margin bottom
                    }}
                >
                    {heading}
                </Typography>
                <Typography variant="body1" fontWeight="500" color={theme.palette.text.primary}>
                    {text}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Profile;