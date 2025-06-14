import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import ArticleList from './pages/ArticleList'
import Article from './pages/Article'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'

const theme = extendTheme({})

// Создаем компонент для защищенных маршрутов
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth()
  
  if (!currentUser) {
    return <Navigate to="/login" />
  }
  
  return <>{children}</>
}

// Создаем компонент для маршрутов, доступных только преподавателям и администраторам
const TeacherRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth()
  
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    return <Navigate to="/" />
  }
  
  return <>{children}</>
}

// Создаем компонент для маршрутов, доступных только администраторам
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth()
  
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" />
  }
  
  return <>{children}</>
}

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router basename="/pascal-info-system/">
          <Navigation />
          <Routes>
            <Route path="/" element={<ArticleList />} />
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
            <Route 
              path="/article/:id" 
              element={
                <PrivateRoute>
                  <Article />
                </PrivateRoute>
              } 
            />
            {/* Здесь будут добавлены маршруты для управления тестами и пользователями */}
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
