import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast
} from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { TestResult } from '../types'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const Profile = () => {
  const { currentUser } = useAuth()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const fetchTestResults = async () => {
      if (!currentUser) return

      try {
        const q = query(
          collection(db, 'testResults'),
          where('userId', '==', currentUser.id)
        )
        const querySnapshot = await getDocs(q)
        const results: TestResult[] = []
        querySnapshot.forEach((doc) => {
          results.push(doc.data() as TestResult)
        })
        setTestResults(results.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime()))
      } catch (error) {
        toast({
          title: 'Ошибка при загрузке результатов',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTestResults()
  }, [currentUser, toast])

  if (!currentUser) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Пожалуйста, войдите в систему</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg">Личный кабинет</Heading>
          <Text mt={2} color="gray.600">
            {currentUser.displayName} ({currentUser.email})
          </Text>
          <Badge colorScheme={
            currentUser.role === 'admin' ? 'red' :
            currentUser.role === 'teacher' ? 'blue' : 'green'
          } mt={2}>
            {currentUser.role === 'admin' ? 'Администратор' :
             currentUser.role === 'teacher' ? 'Преподаватель' : 'Учащийся'}
          </Badge>
        </Box>

        <Tabs>
          <TabList>
            <Tab>Результаты тестов</Tab>
            {currentUser.role === 'teacher' && <Tab>Управление тестами</Tab>}
            {currentUser.role === 'admin' && <Tab>Управление пользователями</Tab>}
          </TabList>

          <TabPanels>
            <TabPanel>
              {loading ? (
                <Text>Загрузка результатов...</Text>
              ) : testResults.length === 0 ? (
                <Text>У вас пока нет результатов тестов</Text>
              ) : (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Дата</Th>
                      <Th>Тест</Th>
                      <Th>Результат</Th>
                      <Th>Процент</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {testResults.map((result) => (
                      <Tr key={result.id}>
                        <Td>{result.completedAt.toLocaleDateString()}</Td>
                        <Td>{result.testId}</Td>
                        <Td>{result.score} из {result.totalQuestions}</Td>
                        <Td>
                          {Math.round((result.score / result.totalQuestions) * 100)}%
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </TabPanel>

            {currentUser.role === 'teacher' && (
              <TabPanel>
                <Text>Здесь будет управление тестами</Text>
              </TabPanel>
            )}

            {currentUser.role === 'admin' && (
              <TabPanel>
                <Text>Здесь будет управление пользователями</Text>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default Profile 