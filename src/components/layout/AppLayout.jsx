import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
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
        
        const params = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const chatId = params.chatId;

        const deleteMenuAnchor = useRef(null);
        const socket = getSocket();

        const { isMobile }  = useSelector((state) => state.misc);
        const {user} = useSelector((state) => state.auth);
        const {newMessagesAlert} = useSelector((state) => state.chat); 

        const {isLoading, data, isError, error, refetch}  = useMyChatsQuery();

        useEffect(() => {
            dataOfLocalStorage({key: NEW_MESSAGE_ALERT, value:newMessagesAlert});
        }, [newMessagesAlert]);

        const [onlineUser, setOnlineUser] = useState([]);

        useErrors([ { isError, error } ]);
 
        const handleDeleteChat = (e, chatId, groupChat) => {
                dispatch(setIsDeleteMenu(true));
                dispatch(setSelectedDeleteChat({chatId, groupChat}))
            deleteMenuAnchor.current = e.currentTarget;
        }

        const handleMobileClose = () => dispatch(setIsMobile(false));

        const newMessageAlertHandler = useCallback((data) => {
            if(data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, []);

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotificationCount());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
                refetch();
                navigate("/")
        }, [refetch]);

        const onlineUserListener = useCallback((data) => {
            setOnlineUser(data);
    }, []);

        const eventHandlers = {    
            [NEW_REQUEST]: newRequestListener, 
            [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUserListener
         };
         
         useSocketEvents(socket, eventHandlers);

        return (
            <>
                <Title/>
                <Header /> 
                <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor}/>
                {
                    isLoading ? (<Skeleton/>) : (
                        <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                        w="70vw" 
                        chats={ data?.chats }
                        chatId={ chatId }
                        handleDeleteChat={ handleDeleteChat }
                        onlineUsers={onlineUser}
                    />  
                        </Drawer>
                    )
                }  
                
                <Grid container height={  "calc(100vh - 4rem)"} >
                    <Grid item
                        sm={ 4 }
                        md={ 3 }
                        sx={ {
                        display: { xs: "none", sm: "block" },
                        } }
                        height={ "100%" } >
                       {
                        isLoading ? <Skeleton/> :
                        <ChatList
                        chats={ data?.chats }
                        chatId={ chatId }
                        handleDeleteChat={ handleDeleteChat }
                        newMessagesAlert={ newMessagesAlert }
                        onlineUsers={onlineUser}
                    />  
                       }
                        </Grid>
                    <Grid item
                        xs={ 12 }
                        sm={ 8 }
                        md={ 5 }
                        lg={ 6 }
                        height={ "100%" } ><WrappedComponent { ...props } chatId={chatId} user={user} /></Grid>
                    <Grid item
                        md={ 4 }
                        lg={ 3 }
                        height={ "100%" }
                        sx={ {
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            bgcolor: "#262626",
                        } }
                    >
                        <Profile user={user}/>
                         </Grid>
                        
                </Grid>
            </> 
        )
    };
};


export default AppLayout;