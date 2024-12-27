import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  HStack, 
  Button, 
  VStack,
  Link as ChakraLink,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { articles } from '../data/articles'
import Quiz from '../components/Quiz'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useEffect } from 'react'

const Article = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentId = Number(id)
  const article = articles.find(a => a.id === currentId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

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
        const code = part.replace(/```pascal\n?/, '').replace(/```$/, '').trim()
        return (
          <Box key={index} my={4}>
            <SyntaxHighlighter 
              language="pascal"
              style={coy}
              customStyle={{
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                lineHeight: '1.5',
                backgroundColor: '#f5f2f0',
                margin: '16px 0'
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
    <>
      {/* Боковая навигация */}
      {prevArticle && (
        <Box
          position="fixed"
          left={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          display={['none', 'none', 'block']}
        >
          <Button
            position="relative"
            variant="solid"
            bg="white"
            shadow="lg"
            size="lg"
            h="120px"
            w="40px"
            p={0}
            borderLeftRadius={0}
            opacity={0.6}
            onClick={() => navigate(`/article/${prevArticle.id}`)}
            _hover={{ 
              opacity: 1,
              w: "200px",
              transition: "all 0.2s"
            }}
          >
            <Box 
              position="absolute" 
              left={3}
              display="flex"
              alignItems="center"
            >
              <ChevronLeftIcon boxSize={6} />
            </Box>
            <Text 
              position="absolute"
              left="40px"
              px={4}
              fontSize="sm" 
              maxW="150px" 
              noOfLines={2}
              opacity={0}
              _groupHover={{ opacity: 1 }}
            >
              {prevArticle.title}
            </Text>
          </Button>
        </Box>
      )}

      {nextArticle && (
        <Box
          position="fixed"
          right={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          display={['none', 'none', 'block']}
        >
          <Button
            position="relative"
            variant="solid"
            bg="white"
            shadow="lg"
            size="lg"
            h="120px"
            w="40px"
            p={0}
            borderRightRadius={0}
            opacity={0.6}
            onClick={() => navigate(`/article/${nextArticle.id}`)}
            _hover={{ 
              opacity: 1,
              w: "200px",
              transition: "all 0.2s"
            }}
          >
            <Box 
              position="absolute" 
              right={3}
              display="flex"
              alignItems="center"
            >
              <ChevronRightIcon boxSize={6} />
            </Box>
            <Text 
              position="absolute"
              right="40px"
              px={4}
              fontSize="sm" 
              maxW="150px" 
              noOfLines={2}
              opacity={0}
              _groupHover={{ opacity: 1 }}
            >
              {nextArticle.title}
            </Text>
          </Button>
        </Box>
      )}

      <Container 
        maxW="var(--max-content-width)" 
        py={8}
        px={4}
        mx="auto"
        flex="1"
      >
        <Box mb={4} position="relative">
          {/* Верхний ряд с хлебными крошками */}
          <Breadcrumb 
            fontSize="sm" 
            color="gray.600" 
            mb={[4, 4, 0]}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">Учебник Pascal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{article.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Навигационные ссылки с адаптивным позиционированием */}
          <Box
            position={['static', 'static', 'absolute']}
            right={4}
            top={0}
            display="flex"
            justifyContent={['center', 'center', 'flex-end']}
            mt={[0, 0, 0]}
          >
            <HStack spacing={4} fontSize="sm" color="gray.600" minW="200px">
              {prevArticle ? (
                <ChakraLink
                  as={Link}
                  to={`/article/${prevArticle.id}`}
                  replace
                  display="inline-flex"
                  alignItems="center"
                  _hover={{ color: 'blue.600' }}
                >
                  <ChevronLeftIcon boxSize={4} />
                  <Text ml={1}>Предыдущая</Text>
                </ChakraLink>
              ) : <Box w="100px" />}
              
              {nextArticle ? (
                <ChakraLink
                  as={Link}
                  to={`/article/${nextArticle.id}`}
                  display="inline-flex"
                  alignItems="center"
                  _hover={{ color: 'blue.600' }}
                >
                  <Text mr={1}>Следующая</Text>
                  <ChevronRightIcon boxSize={4} />
                </ChakraLink>
              ) : <Box w="100px" />}
            </HStack>
          </Box>
        </Box>

        {/* Заголовок статьи */}
        <Heading 
          mb={6} 
          color="var(--heading-color)"
          fontSize="2.5rem"
          fontWeight="600"
        >
          {article.title}
        </Heading>

        {/* Содержание */}
        <Box 
          mb={8} 
          p={6}
          borderWidth="1px" 
          borderRadius="lg"
          bg="gray.50"
          w="100%"
        >
          <Heading size="md" mb={4} color="var(--heading-color)">
            Содержание:
          </Heading>
          <VStack align="stretch" spacing={3}>
            {article.sections.map((section) => (
              <ChakraLink
                key={section.anchor}
                color="blue.600"
                onClick={() => scrollToSection(section.anchor)}
                cursor="pointer"
                _hover={{ textDecoration: 'none', color: 'blue.700' }}
                fontSize="1rem"
              >
                {section.title}
              </ChakraLink>
            ))}
          </VStack>
        </Box>

        {/* Контент */}
        {article.sections.map((section) => (
          <Box key={section.anchor} mb={12} id={section.anchor}>
            <Heading 
              size="lg" 
              mb={4}
              color="var(--heading-color)"
              fontSize="1.75rem"
              fontWeight="500"
            >
              {section.title}
            </Heading>
            {renderContent(section.content)}
            <Divider my={8} />
          </Box>
        ))}

        {/* Тест */}
        <Box mt={16}>
          <Quiz 
            key={article.id}
            questions={article.quiz.questions} 
          />
        </Box>
      </Container>
    </>
  )
}

export default Article 