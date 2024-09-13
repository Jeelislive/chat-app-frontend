import React, { Fragment, useCallback, useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, matBlack, orange2 } from "../constants/color";
import { useRef } from "react";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";
import { Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import { orange } from "../constants/color";
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
  const bottemRef = useRef(null);
  const navigate = useNavigate();

  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isEncher, setIsEncher] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(null);
  const typingTimeout = useRef(null);


  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const {data:oldMessages, setData:setOldMessages} = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
   )

   const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, { chatId, members });
      setIAmTyping(true);
    }

    if(typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current =  setTimeout(() => {
      socket.emit(STOP_TYPING, { chatId, members });
      setIAmTyping(false);
    }, [2000]);
  }
  
  const handleFileMenu = (e) => {
    dispatch(setIsFileMenu(true));
    setIsEncher(e.currentTarget);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, {userId:user._id, members});
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED,{userId:user._id, members});
    }
  }, [chatId]);

  useEffect(() => {
      if(bottemRef.current) bottemRef.current.scrollIntoView({behavior: "smooth"});
    } , [messages]);

    useEffect(() => {
      if(chatDetails.isError) return navigate("/"); 
    }, [chatDetails.isError]);

  const newMessages = useCallback((data) => {
    if(data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const startTypingListener = useCallback((data) => {
     if(data.chatId !== chatId) return;
      setUserTyping(true);
  }, [chatId]);

  const stopTypingListener = useCallback((data) => {
    if(data.chatId !== chatId) return;
     setUserTyping(false);
 }, [chatId]);

 const alertListener = useCallback(
  (data) => {
      if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "djasdhajksdhasdsadasdas",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageForAlert]);
  },
  [chatId]
);

  const eventHandler = { 
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessages,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
   };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];


  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        box-sizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        sx={{
          backgroundImage: 'url("/chat.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
    {userTyping && <TypingLoader/>}
        <div ref={bottemRef}/>

      </Stack>
      <form
        onSubmit={submitHandler}
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"8px 24px"}
          alignItems={"center"}
          position={"relative"}
          sx={{
            backgroundColor: matBlack,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileMenu}
          >
            <AttachFileIcon sx={{
              color: 'white',
            }} />
          </IconButton>

          <InputBox
            sx={{
              height: "100%",
            }}
            placeholder="Type Messages here..."
            value={message}
            onChange={messageOnChange}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: matBlack,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={isEncher} chatId={chatId}/>
    </Fragment>
  );
}

export default AppLayout()(Chat);
