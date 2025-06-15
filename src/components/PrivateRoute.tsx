import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Box, CircularProgress, Typography } from '@mui/material'

interface PrivateRouteProps {
  children: React.ReactNode
  roles?: string[]
}

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { currentUser, loading, userRole } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they
    // log in, which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && userRole && !roles.includes(userRole)) {
    // user is logged in but does not have the required role
    return (
       <Box textAlign="center" mt={5}>
        <Typography variant="h4">Доступ запрещен</Typography>
        <Typography>У вас нет прав для просмотра этой страницы.</Typography>
      </Box>
    )
  }

  return <>{children}</>
} 