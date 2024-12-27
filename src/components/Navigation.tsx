import { 
  Box, 
  Container, 
  Heading, 
  Spacer, 
  HStack, 
  Button,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navigation = () => {
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <Box 
      as="nav" 
      bg="white" 
      borderBottom="1px" 
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
      height="64px"
    >
      <Container 
        maxW="var(--max-content-width)"
        h="100%"
        display="flex"
        alignItems="center"
        px={4}
      >
        <Link to="/">
          <Heading 
            size="md" 
            color="var(--heading-color)"
            _hover={{ color: 'blue.600' }}
          >
            Pascal Tutorial
          </Heading>
        </Link>
        <Spacer />
        <HStack spacing={4}>
          {currentUser ? (
            <Menu>
              <MenuButton 
                as={Button} 
                variant="ghost" 
                p={1}
              >
                <HStack>
                  <Avatar 
                    size="sm" 
                    src={currentUser.photoURL || undefined} 
                    name={currentUser.displayName || 'User'} 
                  />
                  <Text>{currentUser.displayName}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Выйти</MenuItem>
              </MenuList>
            </Menu>
          ) : !isLoginPage && (
            <Button 
              as={Link} 
              to="/login"
              variant="solid"
              bg="blue.500"
              color="white"
              size="md"
              height="40px"
              px={8}
              fontSize="md"
              fontWeight="500"
              borderRadius="full"
              _hover={{
                bg: "blue.400",
                transform: "translateY(-1px)",
                shadow: "md",
              }}
              _active={{
                bg: "blue.600",
                transform: "translateY(0)",
                shadow: "sm",
              }}
              transition="all 0.2s"
            >
              Войти
            </Button>
          )}
        </HStack>
      </Container>
    </Box>
  )
}

export default Navigation 