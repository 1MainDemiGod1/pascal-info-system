import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import ArticleList from './pages/ArticleList'
import Article from './pages/Article'
import Login from './pages/Login'
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

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router basename="/pascal-info-system/">
          <Navigation />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/article/:id" 
              element={
                <PrivateRoute>
                  <Article />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
