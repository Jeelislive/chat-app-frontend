import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton, useTheme, alpha } from '@mui/material'; // Added useTheme and alpha
import ChatList from '../specific/ChatList';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { useErrors, useSocketEvents } from '../../hooks/hooks';
import { getSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events';
import { incrementNotificationCount, setNewMessagesAlert } from '../../redux/reducers/chat';
import { dataOfLocalStorage } from '../../lib/features';
import DeleteChatMenu from '../dialogs/DeleteChatMenu';

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const theme = useTheme(); // Get theme object
        const params = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const chatId = params.chatId;

        const deleteMenuAnchor = useRef(null);
        const socket = getSocket();

        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);

        const { isLoading, data, isError, error, refetch } = useMyChatsQuery();

        useEffect(() => {
            dataOfLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
        }, [newMessagesAlert]);

        const [onlineUsers, setOnlineUsers] = useState([]); // Renamed for clarity

        useErrors([{ isError, error }]);

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }));
            deleteMenuAnchor.current = e.currentTarget;
        };

        const handleMobileClose = () => dispatch(setIsMobile(false));

        const newMessageAlertHandler = useCallback(
            (data) => {
                if (data.chatId === chatId) return;
                dispatch(setNewMessagesAlert(data));
            },
            [chatId, dispatch] // Added dispatch to dependency array
        );

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotificationCount());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
        }, [refetch, navigate]); // Added navigate to dependency array

        const onlineUsersListener = useCallback((data) => { // Renamed for clarity
            setOnlineUsers(data);
        }, []);

        const eventHandlers = {
            [NEW_REQUEST]: newRequestListener,
            [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandlers);

        return (
            <>
                <Title />
                <Header />
                <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
                {isLoading ? (
                    <Skeleton variant="rectangular" height="calc(100vh - 4rem)" />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose} PaperProps={{ sx: { backgroundColor: theme.palette.background.default } }}> {/* Themed Drawer */}
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                            onlineUsers={onlineUsers}
                            newMessagesAlert={newMessagesAlert} // Added missing prop
                        />
                    </Drawer>
                )}

                <Grid container height={"calc(100vh - 4rem)"} sx={{ backgroundColor: theme.palette.background.default }}> {/* Main background */}
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },
                            backgroundColor: alpha(theme.palette.background.paper, 0.7), // Differentiated background for ChatList
                            backdropFilter: 'blur(5px)', // Optional: blur effect
                            borderRight: `1px solid ${theme.palette.divider}`,
                            height: "100%",
                            overflowY: 'auto', // Ensure ChatList itself is scrollable if content overflows
                             '&::-webkit-scrollbar': { width: '6px' },
                             '&::-webkit-scrollbar-track': { background: 'transparent' }, // Make track transparent
                             '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.action.hover, borderRadius: '10px' },
                        }}
                    >
                        {isLoading ? (
                            <Skeleton variant="rectangular" height="100%" />
                        ) : (
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        lg={3}
                        height={"100%"}
                        sx={{
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            backgroundColor: alpha(theme.palette.background.paper, 0.5), // Slightly different for Profile, or could be same as ChatList
                            backdropFilter: 'blur(3px)',
                            borderLeft: `1px solid ${theme.palette.divider}`,
                            overflowY: 'auto',
                             '&::-webkit-scrollbar': { width: '6px' },
                             '&::-webkit-scrollbar-track': { background: 'transparent' },
                             '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.action.hover, borderRadius: '10px' },
                        }}
                    >
                        {user && <Profile user={user} />} {/* Ensure user exists before rendering Profile */}
                    </Grid>
                </Grid>
            </>
        );
    };
};

export default AppLayout;