import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material'
import {
  School as SchoolIcon,
  Quiz as QuizIcon,
  Article as ArticleIcon,
  Person as PersonIcon
} from '@mui/icons-material'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { currentUser } = useAuth()

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: t('home.features.learning.title'),
      description: t('home.features.learning.description'),
      path: '/topics'
    },
    {
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      title: t('home.features.tests.title'),
      description: t('home.features.tests.description'),
      path: '/tests'
    },
    {
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      title: t('home.features.articles.title'),
      description: t('home.features.articles.description'),
      path: '/articles'
    },
    {
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      title: t('home.features.profile.title'),
      description: t('home.features.profile.description'),
      path: '/profile'
    }
  ]

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center'
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
        >
          {t('home.hero.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t('home.hero.subtitle')}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          {currentUser ? (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/topics')}
            >
              {t('home.hero.startLearning')}
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
              >
                {t('home.hero.login')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/register')}
              >
                {t('home.hero.register')}
              </Button>
            </>
          )}
        </Stack>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature) => (
          <Grid item key={feature.title} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                  boxShadow: 3
                }
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* About Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          {t('home.about.title')}
        </Typography>
        <Typography variant="body1" paragraph align="center">
          {t('home.about.description')}
        </Typography>
      </Box>
    </Container>
  )
} 