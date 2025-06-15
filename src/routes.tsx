import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import { Box, CircularProgress } from '@mui/material'

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'))
const Topics = React.lazy(() => import('./pages/Topics'))
const Topic = React.lazy(() => import('./pages/Topic'))
const SubTopic = React.lazy(() => import('./pages/SubTopic'))
const Tests = React.lazy(() => import('./pages/Tests'))
const Test = React.lazy(() => import('./pages/Test'))
const Profile = React.lazy(() => import('./pages/Profile'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const ArticleList = React.lazy(() => import('./pages/ArticleList'))
const Article = React.lazy(() => import('./pages/Article'))
const KnowledgeTest = React.lazy(() => import('./pages/KnowledgeTest'))
const TestResult = React.lazy(() => import('./pages/TestResult'))
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'))
const TeacherDashboard = React.lazy(() => import('./pages/TeacherDashboard'))

const CenteredSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
)

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<CenteredSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route path="/topics" element={<PrivateRoute><Topics /></PrivateRoute>} />
          <Route path="/topics/:id" element={<PrivateRoute><Topic /></PrivateRoute>} />
          <Route path="/topics/:topicId/subtopics/:subTopicId" element={<PrivateRoute><SubTopic /></PrivateRoute>} />
          <Route path="/tests" element={<PrivateRoute><Tests /></PrivateRoute>} />
          <Route path="/tests/:id" element={<PrivateRoute><Test /></PrivateRoute>} />
          <Route path="/knowledge-test/:id" element={<PrivateRoute><KnowledgeTest /></PrivateRoute>} />
          <Route path="/test-result/:id" element={<PrivateRoute><TestResult /></PrivateRoute>} />
          <Route path="/articles" element={<PrivateRoute><ArticleList /></PrivateRoute>} />
          <Route path="/articles/:id" element={<PrivateRoute><Article /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* Role-based Routes */}
          <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/teacher-dashboard" element={<PrivateRoute roles={['teacher']}><TeacherDashboard /></PrivateRoute>} />

          {/* Not Found */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRoutes 