import React, { useState } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  MenuBook as MenuBookIcon,
  AccountCircle as AccountCircleIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import { useTheme as useAppTheme } from '../contexts/ThemeContext'
import ThemeSelector from './ThemeSelector'

const pages = [
  { title: 'Главная', path: '/', icon: <HomeIcon /> },
  { title: 'Темы', path: '/topics', icon: <MenuBookIcon /> },
  { title: 'Тесты', path: '/tests', icon: <QuizIcon /> },
  { title: 'Статьи', path: '/articles', icon: <ArticleIcon /> }
]

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const appTheme = useAppTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const storedPhoto = currentUser ? localStorage.getItem(`profilePhoto_${currentUser.id}`) || undefined : undefined

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const rolePages = [] as {title:string,path:string,icon:JSX.Element}[]
  if(currentUser?.role==='teacher'){
    rolePages.push({title:'Панель преподавателя', path:'/teacher-dashboard', icon:<SupervisedUserCircleIcon/>})
  }
  if(currentUser?.role==='admin'){
    rolePages.push({title:'Админ-панель', path:'/admin', icon:<AdminPanelSettingsIcon/>})
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Pascal Info
      </Typography>
      <Divider />
      <List>
        {[...pages, ...rolePages].map((page) => (
          <ListItem
            key={page.path}
            component={RouterLink}
            to={page.path}
            selected={location.pathname === page.path}
            sx={{
              color: 'inherit',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{page.icon}</ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pascal Info
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {[...pages, ...rolePages].map((page) => (
              <Button
                key={page.path}
                component={RouterLink}
                to={page.path}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: location.pathname === page.path ? 'primary.dark' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                {page.icon}
                {page.title}
              </Button>
            ))}
          </Box>

          <ThemeSelector />

          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <>
                <Tooltip title="Открыть меню">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={currentUser.displayName} src={currentUser.photoURL || storedPhoto || undefined}>
                      {currentUser.displayName?.[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={RouterLink} to="/profile" onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Профиль</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Выйти</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                variant="outlined"
                sx={{ ml: 2 }}
              >
                Войти
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
} 