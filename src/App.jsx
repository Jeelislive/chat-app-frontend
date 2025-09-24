import React, {lazy, useEffect, useMemo, startTransition} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import { Suspense } from 'react'
import { LayoutLoader } from './components/layout/Loaders'
import axios from 'axios'
import { server } from './constants/config'
import { useDispatch, useSelector } from 'react-redux'
import {userExist, userNotExist} from './redux/reducers/auth'
import {Toaster} from 'react-hot-toast'
import { SocketProvider } from './socket'

// Performance optimization: Prioritize critical routes
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const Landing = lazy(() => import('./pages/Landing'))

// Secondary routes - load on demand
const Groups = lazy(() => import('./pages/Groups'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin routes - separate bundle for rare usage
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'))
const ChatManagement = lazy(() => import('./pages/Admin/ChatManagement'))
const MessageMenagement = lazy(() => import('./pages/Admin/MessageManagement'))

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Performance optimization: Memoize axios instance
  const authAxios = useMemo(() => axios.create({
    timeout: 8000,
    withCredentials: true
  }), []);

  useEffect(() => {
    // Performance optimization: Use startTransition for non-urgent updates
    const checkAuth = async () => {
      try {
        const { data } = await authAxios.get(`${server}/api/v1/user/me`);
        startTransition(() => {
          dispatch(userExist(data.user));
        });
      } catch (error) {
        startTransition(() => {
          dispatch(userNotExist());
        });
      }
    };

    checkAuth();
  }, [dispatch, authAxios]);

  // Performance optimization: Preload routes based on auth state
  useEffect(() => {
    if (user) {
      // Preload authenticated user routes
      const timer = setTimeout(() => {
        import('./pages/Chat');
        import('./pages/Groups');
      }, 100);
      return () => clearTimeout(timer);
    } else if (user === false) {
      // Preload login for unauthenticated users
      const timer = setTimeout(() => {
        import('./pages/Login');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Performance optimization: Memoize routes to prevent unnecessary re-renders
  const routes = useMemo(() => (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      <Route
        element={
          <SocketProvider>
            <ProtectRoute user={user} />
          </SocketProvider>
        }
      >
        <Route path="/app" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/groups" element={<Groups />} />
      </Route>

      <Route
        path="/login"
        element={
          <ProtectRoute user={!user} redirect="/app">
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
  ), [user]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        {routes}
      </Suspense>
      <Toaster position="bottom-center" toastOptions={{
        duration: 3000,
        style: {
          maxWidth: '400px',
        }
      }} />
    </BrowserRouter>
  );
};

export default React.memo(App);