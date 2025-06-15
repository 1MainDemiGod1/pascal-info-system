import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../contexts/ProfileContext'
import type { TestResult, UserRole } from '../types/index'
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
  TextField,
  Button,
  IconButton
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import UseCaseDiagram from '../components/UseCaseDiagram'
import { allTests } from '../data/content'

const roleMap: Record<UserRole, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
    student: { label: 'Студент', color: 'primary' },
    teacher: { label: 'Преподаватель', color: 'info' },
    admin: { label: 'Администратор', color: 'success' },
};

export default function Profile() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentUser, setCurrentUser } = useAuth()
  const { profile, updateProfile, getProfile } = useProfile()
  const [editMode, setEditMode] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '')
      setPhotoURL(profile.photoURL || '')
      setEmail(profile.email || '')
    }
  }, [profile])

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Load test results from local storage
    const stored = JSON.parse(localStorage.getItem(`testResults_${currentUser.id}`) || '[]') as TestResult[];
    setTestResults(stored);

    // If the user is a teacher, we might have additional loading steps in the future,
    // but for now, we just ensure the loading is complete.
    // This also helps prevent the diagram from "flickering".
    setLoading(false);
  }, [currentUser]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0])
      setPhotoURL(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSave = async () => {
    setSaveLoading(true)
    setSaveError(null)
    setSaveSuccess(false)
    try {
      let newPhotoURL = photoURL
      const actualEmail = email || (currentUser && currentUser.email) || '';
      const afterSave = async (photo: string) => {
        await updateProfile({ displayName, photoURL: photo, email: actualEmail })
        if(currentUser) localStorage.setItem(`profilePhoto_${currentUser.id}`, photo)
        await getProfile()
        if (setCurrentUser && currentUser) {
          setCurrentUser((prev: any) => prev ? { ...prev, displayName, photoURL: photo, email: actualEmail } : prev)
        }
        setSaveSuccess(true)
        setEditMode(false)
        setPhotoFile(null)
        setSaveLoading(false)
      }
      if (photoFile) {
        const reader = new FileReader()
        reader.onloadend = async () => {
          newPhotoURL = reader.result as string
          await afterSave(newPhotoURL)
        }
        reader.readAsDataURL(photoFile)
      } else {
        await afterSave(newPhotoURL)
      }
    } catch (err: any) {
      setSaveError('Ошибка при сохранении профиля' + (err && err.message ? ': ' + err.message : ''))
      setSaveLoading(false)
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

  const calculateAverageScore = () => {
    if (testResults.length === 0) return 0
    const total = testResults.reduce((sum, result) => sum + result.score, 0)
    return total / testResults.length
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'error'
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Личный кабинет
        </Typography>

        <Paper sx={{ p: 3, mb: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ position: 'relative', mr: 3 }}>
            <Avatar src={photoURL} sx={{ width: 80, height: 80, mb: 1 }} />
            {editMode && (
              <>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-photo-upload"
                  type="file"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="profile-photo-upload">
                  <IconButton color="primary" component="span" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {editMode ? (
              <>
                <TextField
                  label="Никнейм"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  value={email}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: true }}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleSave} disabled={saveLoading}>
                    Сохранить
                  </Button>
                  <Button variant="outlined" onClick={() => setEditMode(false)} disabled={saveLoading}>
                    Отмена
                  </Button>
                </Box>
                {saveError && <Alert severity="error" sx={{ mt: 2 }}>{saveError}</Alert>}
                {saveSuccess && <Alert severity="success" sx={{ mt: 2 }}>Профиль обновлён!</Alert>}
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="h6">{displayName}</Typography>
                  {currentUser?.role && (
                    <Chip
                      label={roleMap[currentUser.role].label}
                      color={roleMap[currentUser.role].color}
                      size="small"
                    />
                  )}
                </Box>
                <Typography color="text.secondary">{email}</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
                  Редактировать профиль
                </Button>
              </>
            )}
          </Box>
        </Paper>

        {/* Show Use Case Diagram only for teachers and when not loading */}
        {!loading && currentUser?.role === 'teacher' && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              UML-диаграмма прецедентов
            </Typography>
            <Paper sx={{ p: 2, mb: 4 }}>
              <UseCaseDiagram />
            </Paper>
          </>
        )}

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Общая статистика
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Средний балл: {calculateAverageScore().toFixed(1)}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={calculateAverageScore()} 
              color={getScoreColor(calculateAverageScore())}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="body1">
            Всего пройдено тестов: {testResults.length}
          </Typography>
        </Paper>

        <Typography variant="h5" gutterBottom>
          История тестов
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Тест</TableCell>
                <TableCell>Результат</TableCell>
                <TableCell>Правильных ответов</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    {new Date(result.completedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {allTests.find((t)=>t.id===result.testId)?.title || result.testId}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${result.score.toFixed(1)}%`}
                      color={getScoreColor(result.score)}
                    />
                  </TableCell>
                  <TableCell>
                    {result.answers ? result.answers.length : '-'}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={result.score >= 60 ? 'Зачет' : 'Незачет'}
                      color={result.score >= 60 ? 'success' : 'error'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}