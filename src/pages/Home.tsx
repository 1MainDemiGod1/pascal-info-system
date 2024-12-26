import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  Button,
  Link as ChakraLink,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { currentUser } = useAuth()

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading mb={4}>Курс программирования на Pascal</Heading>
          {!currentUser && (
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Text>
                Для доступа к материалам курса необходима авторизация
                <Button 
                  as={Link} 
                  to="/login" 
                  colorScheme="blue"
                  size="sm"
                  ml={4}
                >
                  Войти
                </Button>
              </Text>
            </Alert>
          )}
        </Box>

        {articles.map((article) => (
          <Box 
            key={article.id} 
            p={6} 
            borderWidth={1} 
            borderRadius="lg"
            _hover={{ shadow: 'md' }}
          >
            <Heading size="md" mb={4}>
              {article.id}. {article.title}
            </Heading>
            {currentUser && (
              <ChakraLink 
                as={Link} 
                to={`/article/${article.id}`}
                color="blue.500"
              >
                Читать материал →
              </ChakraLink>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  )
}

export default Home 