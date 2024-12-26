import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'

const Home = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Уроки по Pascal</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {articles.map((article) => (
          <Box 
            key={article.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            as={Link}
            to={`/article/${article.id}`}
            _hover={{ shadow: 'lg' }}
          >
            <Heading size="md">{article.title}</Heading>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Home 