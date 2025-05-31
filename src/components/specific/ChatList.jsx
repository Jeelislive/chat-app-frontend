import React from 'react'
import { Stack, Typography, Divider, useTheme } from '@mui/material';
import ChatItem from '../shared/ChatItem';

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [], // Default to empty array
  handleDeleteChat,
}) => {
  const theme = useTheme();
  return (
    <Stack
      width={w}
      direction={"column"}
      overflow={"auto"}
      height={"100%"}
      sx={{
        // backgroundColor: theme.palette.background.paper, // Use paper for a slightly elevated look
        // borderRight: `1px solid ${theme.palette.divider}`,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.action.hover,
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.primary.light,
        }
      }}
    >
      {chats.length === 0 && (
        <Typography variant="subtitle1" textAlign="center" sx={{ padding: 2, color: theme.palette.text.secondary }}>
          No chats yet. Start a new conversation!
        </Typography>
      )}
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          (alert) => alert.chatId === _id
        );
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <React.Fragment key={_id}>
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              groupChat={groupChat}
              selected={chatId === _id} // Pass selected state
              handleDeleteChat={handleDeleteChat}
            />
            {index < chats.length - 1 && <Divider variant="inset" component="li" sx={{ bgcolor: theme.palette.divider, marginLeft: '72px' }} />}
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

export default ChatList;