import { Box, Typography, useTheme, Paper, alpha } from '@mui/material'; // Added alpha
import React from 'react';
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import {motion} from 'framer-motion';

const MessageComponent = ({message, user}) => {
  const { sender, content, attachments = [], createdAt, _id: messageId } = message; // Added messageId for key
  const sameSender = sender?._id === user?._id;
  const theme = useTheme();

  const timeAgo = moment(createdAt).fromNow();

  // Determine message bubble styles based on sender
  const bubbleStyles = {
    alignSelf: sameSender ? "flex-end" : "flex-start",
    backgroundColor: sameSender ? theme.palette.primary.main : theme.palette.background.paper,
    color: sameSender ? theme.palette.primary.contrastText : theme.palette.text.primary,
    padding: "0.75rem 1rem", // Increased padding
    borderRadius: sameSender // Different border radius for "sent" vs "received"
      ? "20px 20px 5px 20px" // Sent message bubble shape
      : "20px 20px 20px 5px", // Received message bubble shape
    width: "fit-content",
    maxWidth: "75%", // Slightly increased max width
    boxShadow: theme.shadows[2], // Slightly more pronounced shadow
    marginBottom: "0.25rem", // Small margin between messages
    position: 'relative', // For timestamp positioning
    overflowWrap: 'break-word', // Ensure long words break
    wordBreak: 'break-word', // Ensure long words break
  };

  return (
    <motion.div
      key={messageId} // Ensure unique key for motion component
      initial={{ opacity: 0, y: 20 }} // Slide up and fade in
      animate={{ opacity: 1, y: 0 }} // Changed whileInView to animate
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ display: 'flex', justifyContent: sameSender ? 'flex-end' : 'flex-start', width: '100%' }}
    >
      <Paper elevation={0} sx={bubbleStyles}> {/* Use Paper for better control if needed, or just Box */}
        {!sameSender && sender?.name !== "Admin" && ( // Don't show name for admin alerts
          <Typography
            color={theme.palette.secondary.main} // Or a specific color for sender name
            fontWeight={"600"}
            variant="caption"
            display="block"
            sx={{ mb: 0.5 }}
          >
            {sender.name}
          </Typography>
        )}
        {content && <Typography variant="body1">{content}</Typography>}
        {attachments.length > 0 && (
          <Box sx={{ mt: attachments.length > 0 && content ? 1 : 0.5, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {attachments.map((attachment, index) => {
              const url = attachment.url;
              const file = fileFormat(url);
              return (
                <Box key={index} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer" // Added for security
                    download
                    style={{
                      color: sameSender ? theme.palette.primary.contrastText : theme.palette.info.main,
                      textDecoration: 'none', // Remove underline for cleaner look, rely on RenderAttachment visual
                      display: 'block', // Ensure link takes up block for better click area on images
                    }}
                  >
                    {RenderAttachment(file, url)}
                  </a>
                </Box>
              );
            })}
          </Box>
        )}
        <Typography
          variant="caption"
          sx={{
            color: sameSender ? alpha(theme.palette.primary.contrastText, 0.7) : theme.palette.text.secondary,
            display: 'block', // Make it block to push to new line or control with flex
            textAlign: 'right', // Align timestamp to the right of the bubble
            fontSize: '0.65rem', // Smaller timestamp
            mt: 0.75, // Margin top for timestamp
          }}
        >
          {timeAgo}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default React.memo(MessageComponent); // Use React.memo for performance