import { 
  Box, 
  Container, 
  VStack, 
  Button, 
  Text, 
  Heading,
  useToast,
  Icon
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
    <Container 
      maxW="var(--max-content-width)" 
      py={16}
      px={4}
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box 
        p={8} 
        borderWidth="1px" 
        borderRadius="xl"
        bg="white"
        shadow="xl"
        maxW="400px"
        w="100%"
        textAlign="center"
      >
        <VStack spacing={6}>
          <Heading 
            size="lg"
            color="var(--heading-color)"
          >
            Добро пожаловать
          </Heading>
          
          <Text color="gray.600" fontSize="lg">
            Войдите, чтобы получить доступ к учебным материалам
          </Text>

          <Button
            leftIcon={<Icon as={FaGoogle} />}
            colorScheme="blue"
            size="lg"
            width="100%"
            height="50px"
            onClick={handleLogin}
            fontSize="md"
            _hover={{
              transform: "translateY(-1px)",
              shadow: "md"
            }}
            transition="all 0.2s"
          >
            Войти через Google
          </Button>

          <Text fontSize="sm" color="gray.500">
            Мы используем Google для безопасной авторизации
          </Text>
        </VStack>
      </Box>
    </Container>
  )
}

export default Login 