import { Box, Flex, Button, Heading, Spacer } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { currentUser, login, logout } = useAuth()

  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200" py={4} px={8}>
      <Flex maxW="container.xl" mx="auto" align="center">
        <RouterLink to="/">
          <Heading size="md">Pascal Learning</Heading>
        </RouterLink>
        <Spacer />
        {currentUser ? (
          <Button onClick={logout}>Выйти</Button>
        ) : (
          <Button colorScheme="blue" onClick={login}>
            Войти
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Navbar 