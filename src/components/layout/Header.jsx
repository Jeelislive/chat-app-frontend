import { AppBar, Backdrop, Box, Badge, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orange } from "../../constants/color"
import {
  Add as AddIcon,
  
  Group as GroupIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import { server } from '../../constants/config'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExist } from '../../redux/reducers/auth'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
import { resetNotificationCount } from '../../redux/reducers/chat'

const SearchDialog = lazy(() => import('../specific/Search'))
const NewGroupDialog = lazy(() => import('../specific/NewGroup'))
const NotificationDialog = lazy(() => import('../specific/Notifications'))


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector((state) => state.misc);

  const { notificationCount } = useSelector((state) => state.chat);


  const handleMobile = () =>  dispatch(setIsMobile(true));
   const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
   dispatch(setIsNewGroup(true));
  }
  
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  }

  const NavigateToGroup = () => navigate('/groups')

  const logoutHandler = async() => {
     try {
      const {data} = await axios.get(`${server}/api/v1/user/logout`, {withCredentials: true})

      dispatch(userNotExist()); 
      toast.success(data.message);
     } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
     }
  }

  return (
    <> 
      <Box sx={ { flexGrow: 1 } } height= "4rem">
        <AppBar position="static" sx={ {
          bgcolor: orange,
          pb: "0.5rem",
        } } >
          <Toolbar>
            <Typography
              variant='h6'
              sx={ {
                display: { xs: "none", sm: "block" },
              } }
            >chattu</Typography>
            <Box sx={ {
              display: { xs: 'block', sm: 'none' },
            } }>
              <IconButton color="inherit" onClick={ handleMobile }>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={ {
              flexGrow: 1,
            } } />
            <Box>
              <Iconbtn
                title="Search"
                icon={ <SearchIcon /> }
                onClick={ openSearch } />

              <Iconbtn
                title="New Group"
                icon={ <AddIcon /> }
                onClick={ openNewGroup } />

              <Iconbtn
                title="Manage Group"
                icon={ <GroupIcon /> }
                onClick={ NavigateToGroup } />
              
              <Iconbtn
                title="Notifications"
                icon={ <NotificationsIcon /> }
                onClick={ openNotification } 
                value={notificationCount}
                />
                
              <Iconbtn
                title="Logout"
                icon={ <LogoutIcon /> }
                onClick={ logoutHandler } />

            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      { isSearch && 
        <Suspense fallback={ <Backdrop open /> }>
        <SearchDialog />
        </Suspense>
      }
      { isNotification &&
        <Suspense fallback={ <Backdrop open /> }>
          <NotificationDialog />
        </Suspense>
      }
      { isNewGroup &&
        <Suspense fallback={ <Backdrop open /> }>
          <NewGroupDialog />
        </Suspense>
      }
    </>
  )
}



const Iconbtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;