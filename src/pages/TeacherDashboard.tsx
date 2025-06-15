import React, { useEffect, useState, useMemo } from 'react'
import { Container, Typography, Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Alert } from '@mui/material'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { TestResult } from '../types/index'
import { allTests } from '../data/content'
import TeacherContentManager from '../components/teacher/TeacherContentManager'

export default function TeacherDashboard(){
  const [results, setResults] = useState<TestResult[]>([])
  const [usersMap, setUsersMap] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const testsMap = useMemo(() => {
    return allTests.reduce((acc, test) => {
      acc[test.id] = test.title
      return acc
    }, {} as Record<string, string>)
  }, [])

  useEffect(()=>{
    const unsubResults = onSnapshot(collection(db,'results'), 
      (snap) => {
        const arr:TestResult[]=[]
        snap.forEach(d=>arr.push(d.data() as TestResult))
        setResults(arr)
        setLoading(false)
      },
      (err) => {
        console.error("TeacherDashboard results snapshot error:", err)
        setError("Не удалось загрузить результаты. Проверьте права доступа в Firestore.")
        setLoading(false)
      }
    )
    const unsubUsers = onSnapshot(collection(db,'users'), 
      (snap) => {
        const map:Record<string,string>={}
        snap.forEach(d=>{ const data=d.data(); map[data.id]=data.displayName||data.email})
        setUsersMap(map)
      },
      (err) => {
        console.error("TeacherDashboard users snapshot error:", err)
        // This is a secondary subscription, so we don't set the main error state
        // to avoid overwriting a more critical error from the primary data source.
      }
    )
    return ()=>{unsubResults(); unsubUsers()}
  },[])

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

  return (
    <Container>
      <Box sx={{ mt:4 }}>
        <Typography variant="h4" gutterBottom>Панель преподавателя</Typography>
        <TeacherContentManager />
        <Paper sx={{ p:2, mt: 4 }}>
          <Typography variant="h6" gutterBottom>Результаты студентов</Typography>
          {results.length === 0 ? (
            <Typography>Результатов пока нет.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Студент</TableCell>
                  <TableCell>Тест</TableCell>
                  <TableCell>Баллы</TableCell>
                  <TableCell>Дата</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map(r=> (
                  <TableRow key={r.id}>
                    <TableCell>{usersMap[r.userId] || r.userId}</TableCell>
                    <TableCell>{testsMap[r.testId] || r.testId}</TableCell>
                    <TableCell>{r.score.toFixed(1)}%</TableCell>
                    <TableCell>{new Date(r.completedAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>
    </Container>
  )
} 