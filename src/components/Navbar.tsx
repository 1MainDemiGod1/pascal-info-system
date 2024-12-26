import {
  Box,
  Flex,
  Button,
  Text,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link as ChakraLink
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <Box bg="gray.100" px={4} py={2}>
      <Flex maxW="container.lg" mx="auto" align="center" justify="space-between">
        <ChakraLink as={Link} to="/" fontSize="xl" fontWeight="bold">
          Pascal Learning
        </ChakraLink>

        <HStack spacing={4}>
          {currentUser ? (
            <Menu>
              <MenuButton>
                <HStack>
                  <Avatar size="sm" src={currentUser.photoURL || undefined} />
                  <Text>{currentUser.displayName}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Выйти</MenuItem>
              </MenuList>
            </Menu>
          ) : !isLoginPage && (
            <Button as={Link} to="/login" colorScheme="blue">
              Войти
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar 