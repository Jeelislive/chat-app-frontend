import React, {lazy, useEffect}  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import { Suspense } from 'react'
import { LayoutLoader, AppLoader } from './components/layout/Loaders'
import axios from 'axios'
import { server } from './constants/config'
import { useDispatch, useSelector } from 'react-redux'
import {userExist, userNotExist} from './redux/reducers/auth'
import {Toaster} from 'react-hot-toast'
import { SocketProvider } from './socket'

// Core user routes - prioritize loading
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))

// Secondary routes - load on demand
const Groups = lazy(() => import('./pages/Groups'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin routes - separate bundle since they're rarely used
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'))
const ChatManagement = lazy(() => import('./pages/Admin/ChatManagement'))
const MessageMenagement = lazy(() => import('./pages/Admin/MessageManagement'))

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // Optimize initial auth check - reduce timeout and add error handling
    const authCheck = axios.create({
      timeout: 5000, // 5 second timeout
      withCredentials: true
    });
    
    authCheck.get(`${server}/api/v1/user/me`)
    .then(({ data }) => dispatch(userExist(data.user)))
    .catch(() => dispatch(userNotExist()));
  }, [dispatch]);

  // Preload critical routes after initial load
  useEffect(() => {
    if (user) {
      // Preload main chat components when user is authenticated
      import('./pages/Chat');
      import('./pages/Groups');
    } else {
      // Preload login when user is not authenticated
      import('./pages/Login');
    }
  }, [user]);

    return loader ? (
    <AppLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageMenagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;