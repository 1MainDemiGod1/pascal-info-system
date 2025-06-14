import { Box, Heading, Text, VStack, Divider } from '@chakra-ui/react'
import { SubTopic } from '../types'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ArticleProps {
  subTopic: SubTopic
}

const Article = ({ subTopic }: ArticleProps) => {
  return (
    <Box p={6} bg="white" borderRadius="lg" shadow="sm">
      <VStack spacing={6} align="stretch">
        <Heading size="lg">{subTopic.title}</Heading>
        <Divider />
        <Box>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {subTopic.content}
          </ReactMarkdown>
        </Box>
      </VStack>
    </Box>
  )
}

export default Article 