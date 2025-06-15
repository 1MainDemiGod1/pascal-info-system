import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Chip,
  Breadcrumbs,
  Link,
  Paper,
  Divider,
  Button,
  CircularProgress,
  IconButton
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Print as PrintIcon
} from '@mui/icons-material'
import { Article as ArticleType } from '../types/index'
import { allArticles } from '../data/articles'
import { useLanguage } from '../contexts/LanguageContext'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import { articleImages } from '../data/articleImages'

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<ArticleType | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    if (!id) return

    const art = allArticles.find(a => a.id.toString() === id)
    if (art) {
      const flatContent = art.sections.map(s=>s.content).join('\n\n')
      setArticle({
        ...art,
        id: art.id.toString(),
        title: art.title,
        content: flatContent,
        imageUrl: articleImages[art.id] || 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
        tags: ['Pascal', 'Программирование', '8 класс'],
        createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
        readingTime: Math.ceil(art.sections.reduce((t,s)=>t+s.content.length/1000,0))
      })
    } else {
      navigate('/articles')
    }
    setLoading(false)
  }, [id, navigate])

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem('bookmarkedArticles')
      const arr = stored ? JSON.parse(stored) as string[] : []
      setBookmarked(arr.includes(id))
    }
  }, [id])

  const toggleBookmark = () => {
    if (!id) return
    const stored = localStorage.getItem('bookmarkedArticles')
    const arr = stored ? JSON.parse(stored) as string[] : []
    let newArr: string[]
    if (arr.includes(id)) {
      newArr = arr.filter(a => a !== id)
      setBookmarked(false)
    } else {
      newArr = [...arr, id]
      setBookmarked(true)
    }
    localStorage.setItem('bookmarkedArticles', JSON.stringify(newArr))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article?.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована в буфер обмена')
    }
  }

  const handlePrint = () => window.print()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  if (!article) {
    return null
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/articles')}
          sx={{ mb: 2 }}
        >
          {t('app.back')}
        </Button>

        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/articles')}
            sx={{ textDecoration: 'none' }}
          >
            {t('articles.title')}
          </Link>
          <Typography color="text.primary">{article.title}</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            {article.title}
          </Typography>
          <Box>
            <IconButton onClick={toggleBookmark} color={bookmarked ? 'primary' : 'default'}>
              <BookmarkIcon />
            </IconButton>
            {('share' in navigator) && (
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            )}
            <IconButton onClick={handlePrint}>
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {article.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {new Date(article.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.readingTime} {t('articles.readingTime')}
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <img
            src={article.imageUrl as string}
            alt={article.title}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            onError={(e:any)=>{e.currentTarget.src='/img/articles/placeholder.svg'}}
          />
        </Box>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({node, inline, className, children, ...props}: any) {
              return (
                <code
                  className={className}
                  style={{ backgroundColor: inline ? 'rgba(135,131,120,0.15)' : 'transparent', padding: inline ? '0.2em 0.4em' : undefined }}
                  {...props}
                >
                  {children}
                </code>
              )
            }
          }}
        >
          {article.content}
        </ReactMarkdown>

        {article.codeExample && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              {t('articles.codeExample')}
            </Typography>
            <Paper
              sx={{
                p: 2,
                bgcolor: 'grey.100',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap'
              }}
            >
              {article.codeExample}
            </Paper>
          </>
        )}

        {article.exercises && article.exercises.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              {t('articles.exercises')}
            </Typography>
            {article.exercises.map((exercise, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('articles.exercise')} {index + 1}
                </Typography>
                <Typography variant="body1">{exercise}</Typography>
              </Box>
            ))}
          </>
        )}
      </Paper>
    </Container>
  )
} 