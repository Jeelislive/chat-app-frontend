import React from 'react'
import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import { transformImage } from './../../lib/features';

const AvatarCard = ({ avatar = [], max = 4, size = "3rem" }) => { // Added size prop
  // If only one avatar and max is effectively 1 (or less, which is invalid for AvatarGroup),
  // render a single Avatar component.
  if (avatar.length === 1 && max <= 1) {
    return (
      <Avatar
        src={transformImage(avatar[0])}
        alt="Avatar"
        sx={{
          width: size,
          height: size,
          border: (theme) => `2px solid ${theme.palette.background.paper}`, // Optional: add a border
        }}
      />
    );
  }

  // Ensure max is at least 2 for AvatarGroup, or if avatar length is 1 but max prop was >=2
  const displayMax = Math.max(2, max);

  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={displayMax}
        sx={{
          position: "relative",
          '& .MuiAvatar-root': { // Target Avatars within the group
            width: size,
            height: size,
            border: (theme) => `2px solid ${theme.palette.background.paper}`, // Consistent border
            fontSize: size === "3rem" ? '1rem' : '0.8rem', // Adjust font size for "+N" avatar if needed
          },
        }}
      >
        {/* The Box for positioning might need adjustment or removal if relying on AvatarGroup's default layout */}
        {/* For simplicity, let AvatarGroup handle positioning mostly. */}
        {avatar.slice(0, displayMax).map((i, index) => ( // Only map up to displayMax
          <Avatar
            key={index} // Use index as key if 'i' is just a URL string and not an object with id
            src={transformImage(i)}
            alt={`Avatar ${index}`}
            // sx prop here will be overridden by the one in AvatarGroup if more specific,
            // so it's better to style children via the parent AvatarGroup sx.
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;