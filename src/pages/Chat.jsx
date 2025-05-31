import React, { Fragment, useCallback, useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack, alpha, Box, useTheme } from "@mui/material"; // Added Box and useTheme
// import { grayColor, matBlack, orange2, orange } from "../constants/color"; // Will be removed or replaced by theme
import { useRef } from "react";
import { AttachFile as AttachFileIcon, Mic as MicIcon } from "@mui/icons-material"; // Added MicIcon
import { Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import MessageComponent from "./../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import {useInfiniteScrollTop} from '6pp'
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import FileMenu from "../components/dialogs/FileMenu";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import  {TypingLoader}  from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";

function Chat({ chatId, user }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null); // Corrected typo
  const navigate = useNavigate();
  const theme = useTheme(); // Get theme object

  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null); // Renamed for clarity
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false); // Default to false
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIAmTyping(false);
    }, 2000); // 2 seconds
  };

  const handleFileOpen = (e) => { // Renamed for clarity
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId, dispatch, members, setOldMessages, socket, user._id]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError, navigate]);

  const newMessageHandler = useCallback((data) => { // Renamed for clarity
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(true);
  }, [chatId]);

  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(false);
  }, [chatId]);

  const alertListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: { _id: "admin_alert_id", name: "Admin" }, // Simplified ID
      chat: chatId,
      createdAt: new Date().toISOString(),
      _id: `alert_${Date.now()}` // Unique ID for alerts
    };
    setMessages((prev) => [...prev, messageForAlert]);
  }, [chatId]);

  const eventHandlers = { // Renamed for clarity
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandlers);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton variant="rectangular" height="100%" />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={{ xs: "0.5rem", sm: "1rem" }} // Responsive padding
        spacing={"0.5rem"} // Reduced spacing between messages
        height={"90%"}
        sx={{
          // backgroundColor: alpha(theme.palette.background.default, 0.5), // Slightly transparent default bg
          // backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.background.default, 0.8)}, ${alpha(theme.palette.background.paper, 0.9)}), url("/chat.jpg")`,
          // backgroundBlendMode: 'overlay',
          backgroundColor: theme.palette.background.default, // Solid background
          // Consider a subtle pattern or texture if image is too distracting
          // backgroundImage: 'url("/assets/bgchatapp.jpg")', // Ensure path is correct
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // backgroundAttachment: 'fixed', // Keep background fixed during scroll
          overflowX: "hidden",
          overflowY: "auto",
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': { background: theme.palette.background.paper },
          '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.primary.light, borderRadius: '10px' },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: theme.palette.primary.main },
        }}
      >
        {allMessages.map((msg) => (
          <MessageComponent key={msg._id} message={msg} user={user} />
        ))}
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form onSubmit={submitHandler} style={{ height: "10%" }}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={{ xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" }} // Responsive padding
          alignItems={"center"}
          position={"relative"}
          sx={{
            backgroundColor: theme.palette.background.paper, // Use paper for input area bg
            borderTop: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 -2px 10px ${alpha(theme.palette.common.black, 0.05)}`, // Subtle top shadow
          }}
        >
          <IconButton
            sx={{
              // position: "absolute", // Keep it inline for better flow
              // left: "1.5rem",
              // rotate: "30deg", // Removed rotation for cleaner look
              color: theme.palette.text.secondary,
              marginRight: '0.5rem',
              '&:hover': { color: theme.palette.primary.main }
            }}
            onClick={handleFileOpen}
            aria-label="attach file"
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type a message..."
            value={message}
            onChange={messageOnChange}
            sx={{
              flexGrow: 1, // Allow input to take available space
              height: "calc(100% - 16px)", // Adjust height considering padding
              marginRight: '0.5rem',
              backgroundColor: theme.palette.background.default, // Slightly different bg for input
              color: theme.palette.text.primary,
              padding: '0.75rem 1rem', // Internal padding for input
              borderRadius: '20px', // More rounded input
            }}
          />
          {/* Optional: Mic Icon for voice messages - future feature */}
          {/* <IconButton
            sx={{
              color: theme.palette.text.secondary,
              marginRight: '0.5rem',
              '&:hover': { color: theme.palette.primary.main }
            }}
            aria-label="voice message"
          >
            <MicIcon />
          </IconButton> */}
          <IconButton
            type="submit"
            sx={{
              // rotate: "-30deg", // Removed rotation
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              // marginLeft: "1rem",
              padding: "0.75rem", // Consistent padding
              borderRadius: '50%', // Circular send button
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              transition: 'background-color 0.2s ease-in-out',
            }}
            aria-label="send message"
            disabled={!message.trim()} // Disable if no message
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} /> {/* Corrected prop name */}
    </Fragment>
  );
}

export default AppLayout()(Chat);
