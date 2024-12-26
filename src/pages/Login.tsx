import { 
  Box, 
  Container, 
  VStack, 
  Button, 
  Text, 
  Heading,
  useToast
} from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogin = async () => {
    try {
      await login()
      toast({
        title: 'Успешный вход',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/')
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Вход в систему</Heading>
        <Text>Войдите, чтобы сохранять свой прогресс</Text>
        <Box p={8} borderWidth={1} borderRadius="lg" width="100%">
          <VStack spacing={4}>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              width="100%"
              onClick={handleLogin}
            >
              Войти через Google
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Login 