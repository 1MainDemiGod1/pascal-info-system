import { Box, Button, Center } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const { login } = useAuth()

  return (
    <Center h="80vh">
      <Box textAlign="center">
        <Button colorScheme="blue" onClick={login}>
          Войти через Google
        </Button>
      </Box>
    </Center>
  )
}

export default Login 