import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  HStack, 
  Button, 
  VStack,
  Link as ChakraLink,
  Divider
} from '@chakra-ui/react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { articles } from '../data/articles'
import Quiz from '../components/Quiz'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Article = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentId = Number(id)
  const article = articles.find(a => a.id === currentId)

  if (!article) {
    return <Container>Статья не найдена</Container>
  }

  const prevArticle = articles.find(a => a.id === currentId - 1)
  const nextArticle = articles.find(a => a.id === currentId + 1)

  const scrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderContent = (content: string) => {
    const parts = content.split(/(`{3}pascal[\s\S]*?`{3})/)
    
    return parts.map((part, index) => {
      if (part.startsWith('```pascal')) {
        // Извлекаем код из блока ```pascal ... ```
        const code = part.replace(/```pascal\n?/, '').replace(/```$/, '').trim()
        return (
          <Box key={index} my={4}>
            <SyntaxHighlighter 
              language="pascal"
              style={tomorrow}
              customStyle={{
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </Box>
        )
      }
      return <Text key={index} whiteSpace="pre-line">{part}</Text>
    })
  }

  return (
    <Container maxW="container.md" py={8}>
      {/* Навигация между статьями */}
      <HStack justify="space-between" mb={8}>
        {prevArticle ? (
          <Button 
            leftIcon={<ChevronLeftIcon />} 
            onClick={() => navigate(`/article/${prevArticle.id}`)}
          >
            Предыдущая
          </Button>
        ) : <Box />}
        
        <Button as={Link} to="/">К списку</Button>
        
        {nextArticle ? (
          <Button 
            rightIcon={<ChevronRightIcon />} 
            onClick={() => navigate(`/article/${nextArticle.id}`)}
          >
            Следующая
          </Button>
        ) : <Box />}
      </HStack>

      <Heading mb={6}>{article.title}</Heading>

      {/* Содержание */}
      <Box 
        mb={8} 
        p={4} 
        borderWidth="1px" 
        borderRadius="md" 
        bg="gray.50"
      >
        <Heading size="md" mb={4}>Содержание:</Heading>
        <VStack align="stretch" spacing={2}>
          {article.sections.map((section) => (
            <ChakraLink
              key={section.anchor}
              color="blue.500"
              onClick={() => scrollToSection(section.anchor)}
              cursor="pointer"
            >
              {section.title}
            </ChakraLink>
          ))}
        </VStack>
      </Box>

      {/* Контент */}
      {article.sections.map((section) => (
        <Box key={section.anchor} mb={8} id={section.anchor}>
          <Heading size="md" mb={4}>{section.title}</Heading>
          {renderContent(section.content)}
          <Divider my={4} />
        </Box>
      ))}

      {/* Тест */}
      <Box mt={12}>
        <Quiz 
          key={article.id}
          questions={article.quiz.questions} 
        />
      </Box>
    </Container>
  )
}

export default Article 