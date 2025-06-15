import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Topics from './pages/Topics'
import Topic from './pages/Topic'
import Tests from './pages/Tests'
import Test from './pages/Test'
import Articles from './pages/ArticleList'
import Article from './pages/Article'
import PrivateRoute from './components/PrivateRoute'
import { ProfileProvider } from './contexts/ProfileContext'
import SubTopic from './pages/SubTopic'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import TestManager from './pages/TestManager'
import TestEditor from './pages/TestEditor'

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <ProfileProvider>
              <CssBaseline />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/topics" element={<Topics />} />
                <Route path="/topics/:id" element={<Topic />} />
                <Route path="/subtopic/:id" element={<SubTopic />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/test/:id" element={<Test />} />
                <Route path="/tests/:id" element={<Navigate to="/test/:id" replace />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/teacher" element={<PrivateRoute><TeacherDashboard/></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />
                <Route path="/teacher/test-manager" element={<PrivateRoute><TestManager/></PrivateRoute>} />
                <Route path="/teacher/test-editor/:testId" element={<PrivateRoute><TestEditor/></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  )
}

export default App
