import { 
  Container, 
  VStack, 
  Heading, 
  Box, 
  Text,
  Tooltip,
  HStack,
  Icon
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { useAuth } from '../contexts/AuthContext'

const ArticleList = () => {
  const { currentUser } = useAuth()

  return (
    <Container maxW="var(--max-content-width)" py={8} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading 
          color="var(--heading-color)"
          fontSize="2.5rem"
          fontWeight="600"
          mb={8}
        >
          Учебник Pascal
        </Heading>
        {articles.map(article => (
          currentUser ? (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`}
              replace
              style={{ textDecoration: 'none' }}
            >
              <Box 
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                transition="all 0.2s"
                bg="white"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md",
                  borderColor: "blue.500"
                }}
              >
                <HStack justify="space-between" align="center">
                  <Text
                    fontSize="1.2rem"
                    color="blue.600"
                  >
                    {article.title}
                  </Text>
                  <Icon 
                    as={ChevronRightIcon} 
                    boxSize={6} 
                    color="blue.500"
                  />
                </HStack>
              </Box>
            </Link>
          ) : (
            <Tooltip 
              key={article.id}
              label="Войдите, чтобы получить доступ к статье" 
              hasArrow
            >
              <Box 
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                transition="all 0.2s"
                opacity={0.6}
                bg="white"
                cursor="default"
              >
                <HStack justify="space-between" align="center">
                  <Text
                    fontSize="1.2rem"
                    color="gray.600"
                  >
                    {article.title}
                  </Text>
                  <Icon 
                    as={ChevronRightIcon} 
                    boxSize={6} 
                    color="gray.400"
                  />
                </HStack>
              </Box>
            </Tooltip>
          )
        ))}
      </VStack>
    </Container>
  )
}

export default ArticleList 