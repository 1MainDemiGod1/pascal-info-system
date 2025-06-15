import React from 'react'
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '@mui/material'

export default function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const theme = useTheme()

  const features = [
    {
      title: 'topics.title',
      description: 'topics.description',
      path: '/topics',
      icon: '📚'
    },
    {
      title: 'tests.title',
      description: 'tests.description',
      path: '/tests',
      icon: '✍️'
    },
    {
      title: 'articles.title',
      description: 'articles.description',
      path: '/articles',
      icon: '📝'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 2
          }}
        >
          {t('home.welcome')}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
        >
          {t('home.description')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.path}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h1"
                  component="div"
                  sx={{ fontSize: '3rem', mb: 2, textAlign: 'center' }}
                >
                  {feature.icon}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: 'bold' }}
                >
                  {t(feature.title)}
                </Typography>
                <Typography color="text.secondary">
                  {t(feature.description)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  fullWidth
                  onClick={() => navigate(feature.path)}
                  sx={{ py: 1.5 }}
                >
                  {t('home.explore')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
} 