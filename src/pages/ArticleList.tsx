import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon
} from '@mui/icons-material'
import { Article } from '../types/index'
import { allArticles } from '../data/articles'
import { useLanguage } from '../contexts/LanguageContext'
import { articleImages } from '../data/articleImages'

// локальные изображения /img/articles/{id}.svg, при отсутствии будет placeholder
const placeholderLocal = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'

type SortMode = 'title' | 'date'

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [sortMode, setSortMode] = useState<SortMode>('date')
  const navigate = useNavigate()
  const { t } = useLanguage()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Используем локальные данные с дополнительными полями
        const articlesData: Article[] = []
        for (const article of allArticles) {
          const safeImg = articleImages[article.id] || placeholderLocal
          const mapped = {
            ...article,
            id: article.id.toString(),
            content: article.sections.map(s => s.content).join(' ').substring(0, 200) + '...',
            imageUrl: safeImg,
            tags: ['Pascal', 'Программирование', '8 класс'],
            createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
            readingTime: Math.ceil(article.sections.reduce((total, section) => total + section.content.length / 1000, 0))
          }
          articlesData.push(mapped)
        }
        setArticles(articlesData)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]') as string[]

  let visible = showBookmarks ? filteredArticles.filter(a=>bookmarkedIds.includes(a.id.toString())) : filteredArticles

  const sortedArticles = [...visible].sort((a,b)=>{
    const aB = bookmarkedIds.includes(a.id.toString()) ? 0 : 1
    const bB = bookmarkedIds.includes(b.id.toString()) ? 0 : 1
    if(aB!==bB) return aB-bB
    if(sortMode==='date') return b.createdAt - a.createdAt
    return a.title.localeCompare(b.title)
  })

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('articles.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('app.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant={showBookmarks ? 'contained' : 'outlined'}
            startIcon={<FilterListIcon />}
            onClick={() => setShowBookmarks(prev=>!prev)}
          >
            {showBookmarks ? 'Закладки' : t('app.filter')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={() => setSortMode(prev=> prev==='date'?'title':'date')}
          >
            {sortMode === 'date' ? 'Сорт: дата' : 'Сорт: A→Z'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {sortedArticles.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} key={`${article.id}_${idx}`}>
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
              onClick={() => navigate(`/articles/${article.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={article.imageUrl}
                alt={article.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {article.content}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {article.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSearchQuery(tag)
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.readingTime} {t('articles.readingTime')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
} 