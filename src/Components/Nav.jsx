import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  MenuGroup,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { myContext } from '../Context';
import { useContext } from 'react';

import { FaRegUserCircle, FaCog } from 'react-icons/fa';
const Links = [
  { name: 'Home', link: '/' },
  { name: 'Login', link: '/login' },
];

const AuthLinks = [
  { name: 'Recent Posts', link: '/feed' },
  { name: 'Following', link: '/following' },
];

const NavLink = ({ children, onClose }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    fontSize="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    onClick={onClose}
    as={RouterLink}
    to={children.link}
  >
    {children.name}
  </Link>
);

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userObj = useContext(myContext);
  const NavLinkList = userObj ? AuthLinks : Links;

  const logout = () => {
    axios
      .get('http://localhost:4000/auth/logout', { withCredentials: true })
      .then(res => {
        if (res.data) {
          window.location.href = '/';
        }
      });
  };

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        position="fixed"
        px={4}
        w="100%"
        zIndex="10"
        boxShadow="lg"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {NavLinkList.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <HStack>
            <ColorModeSwitcher />
            {userObj && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                >
                  <Avatar size={'sm'} src={userObj.photos} />
                </MenuButton>
                <MenuList fontSize="lg">
                  <MenuGroup title={userObj.displayName}>
                    <MenuItem
                      as={RouterLink}
                      to={`/profile/${userObj.username}`}
                      icon={<FaRegUserCircle />}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem icon={<FaCog />}>Settings</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'} spacing={4}>
              {NavLinkList.map(link => (
                <NavLink key={link} onClose={onClose}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
