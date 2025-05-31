import React, { memo } from 'react';
import { Box, Stack, Typography, useTheme, Badge } from '@mui/material';
import { Link } from '../styles/StyledComponents'; // Assuming Link is correctly styled for theme
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';
import { transformImage } from '../../lib/features'; // For transforming avatar if needed

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    selected, // Renamed from sameSender for clarity
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {
    const theme = useTheme();

    return (
        <Link
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
            sx={{
                display: 'block', // Ensure Link takes full width for padding and hover
                padding: 0, // Reset Link's default padding if any
                textDecoration: 'none',
                color: 'inherit', // Inherit color from parent or theme
                '&:hover > div': { // Target the motion.div for hover
                    backgroundColor: selected ? theme.palette.action.selected : theme.palette.action.hover,
                },
            }}
        >
            <motion.div
                initial={{ opacity: 0, x: "-50px" }} // Slide in from left
                animate={{ opacity: 1, x: 0 }} // Changed whileInView to animate for consistent entry
                transition={{ delay: index * 0.05, duration: 0.3 }} // Faster, smoother transition
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "1rem", // Consistent padding
                    justifyContent: "space-between", // To push online indicator to the right
                    position: "relative",
                    cursor: 'pointer',
                    // borderBottom: `1px solid ${theme.palette.divider}`, // Removed as ChatList handles separator
                    backgroundColor: selected ? theme.palette.action.selected : 'transparent',
                    // color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
                 }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <AvatarCard
                        avatar={avatar.map(src => transformImage(src, 50))}
                        max={groupChat ? 2 : 1}
                        size="45px" // Pass size as string with units
                    />
                    <Stack sx={{ overflow: 'hidden' }}>
                        <Typography
                            variant="subtitle1"
                            noWrap
                            sx={{
                                fontWeight: selected ? 600 : 500,
                                color: selected ? theme.palette.primary.main : theme.palette.text.primary,
                            }}
                        >
                            {name}
                        </Typography>
                        {newMessageAlert && (
                            <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                                {newMessageAlert.count} New Message{newMessageAlert.count > 1 ? 's' : ''}
                            </Typography>
                        )}
                    </Stack>
                </Stack>

                <Stack direction="column" alignItems="flex-end" spacing={0.5}>
                    {isOnline && !selected && ( // Show online dot only if not selected to avoid clutter
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: theme.palette.success.main,
                                boxShadow: `0 0 5px ${theme.palette.success.light}`,
                            }}
                        />
                    )}
                     {newMessageAlert && ( // Alternative position for new message count as a badge
                        <Badge
                            badgeContent={newMessageAlert.count}
                            color="primary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    // fontSize: '0.7rem',
                                    // padding: '0 4px',
                                    // height: '18px',
                                    // minWidth: '18px',
                                }
                            }}
                        />
                    )}
                </Stack>
            </motion.div>
        </Link>
    );
};

export default memo(ChatItem);