import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { SubTopic } from '../types/index'
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { allTopics } from '../data/content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { markSubTopicDone } from '../utils/progress'

type SubTopicParams = {
  id: string
}

export default function SubTopic() {
  const { id } = useParams<keyof SubTopicParams>()
  const [subTopic, setSubTopic] = useState<SubTopic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [topicId, setTopicId] = useState<string>('')

  useEffect(() => {
    if (!id) {
      setError('ID подтемы не указан')
      setLoading(false)
      return
    }
    let found: SubTopic | undefined
    let foundTopicId: string | undefined
    for(const t of allTopics){
      const s=t.subTopics.find(st=>st.id===id)
      if(s){found=s; break}
    }
    if(found){
      setSubTopic(found)
      foundTopicId=allTopics.find(t=>t.subTopics.some(st=>st.id===found!.id))?.id
    }else{
      setError('Подтема не найдена')
    }
    if(foundTopicId){ setTopicId(foundTopicId) }
    setLoading(false)
  }, [id])

  const handleTestNavigate = () => {
    if (subTopic?.test?.id) {
      navigate(`/test/${subTopic.test.id}`)
    }
  }

  const handleFinish = () => {
    if(subTopic && currentUser) {
      markSubTopicDone(currentUser.id, subTopic.topicId || topicId, subTopic.id)
      navigate(-1)
    }
  }

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  if (!subTopic) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Подтема не найдена
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Возможно, она была удалена или перемещена
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {subTopic.title}
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{subTopic.content}</ReactMarkdown>

          {subTopic.examples && subTopic.examples.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Примеры
              </Typography>
              <List>
                {subTopic.examples.map((example, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Пример ${index + 1}`}
                      secondary={example}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Paper>

        <Box sx={{ display:'flex', justifyContent:'center', mb:4 }}>
          <Button variant="outlined" color="success" onClick={handleFinish}>Завершить чтение</Button>
        </Box>

        {currentUser?.role === 'student' && subTopic.test && subTopic.test.id && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleTestNavigate}
            >
              Пройти тест по теме
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
} 