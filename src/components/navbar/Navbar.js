import { BellIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { AiOutlineDown } from 'react-icons/ai';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import man from '../../images/man.png';
import user from '../../data/Data';
import '../navbar/navbar.scss';
import { getAuth, signOut } from 'firebase/auth';
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  Avatar,
  HStack,
  IconButton,
} from '@chakra-ui/react';

const Navbar = () => {
  // HIDE OR REVEAL
  const [showNav, setShowNav] = useState(false);

  const Logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  };

  return (
    <div className="mainNavContainer">
      {/* ENTIRE NAVBAR FLEXED AT LEFT */}
      <Flex
        h="10.4vh"
        p={5}
        alignItems="center"
        className="navbar"
        id={showNav ? 'hidden' : ''}
      >
        <div className="leftSide">
          {/* HEADEIND AND SEARCH BAR */}
          <Flex alignItems="center">
            <Heading as="h3" size="sm" className="head">
              Dashboard
            </Heading>
            <FormControl>
              <Input
                variant="unstyled"
                borderLeft="1px"
                borderColor="rgb(220,178,77)"
                color="gray.600"
                ml={4}
                mr="0px"
                p={3}
                pl={10}
                w="10vw"
                placeholder="Search Investments, transactions...."
                position="relative"
                className="search"
              />
              <Button
                type="submit"
                position="absolute"
                left={6}
                top={3}
                size="custom"
                className="searchBtn"
              >
                <FiSearch />
              </Button>
            </FormControl>
          </Flex>
        </div>

        {/* RIGHT TOGGLES */}
        <div className="rightSide">
          {/* <Button onClick={Logout}>LOGOUT</Button> */}
          <HStack>
            {/* 1 */}
            <ColorModeSwitcher
              _hover={{ bgColor: 'primary', color: 'white' }}
              className="respfont"
            />
            {/* 2 */}
            {/* <Link
            
              to=""
              borderRadius={6}
              fontSize="1.4em"
              className="respfont notification"
              _hover={{ bgColor: 'primary', color: 'white' }}
              px={2}
              py={2}
              display="flex"
            >
              <BellIcon />
              
              <div className="counter">1</div>
            </Link> */}

            {/* 3 AVATAR */}
            <Link
              display="flex"
              href="/profile/:profileid"
              to=""
              alignItems="center"
              justifyContent="flex-start"
              w="15vw"
              pl="10px"
              m={0}
              _hover={{ textDecoration: 'none' }}
              className="respfont"
            >
              <Avatar src={man} size="sm" className="avatar" />
              <Heading
                size="sm"
                fontSize=".85em"
                pl="10px"
                mr={2}
                className="username"
              >
                {user.username}
              </Heading>
              <AiOutlineDown />
            </Link>
          </HStack>
        </div>
      </Flex>

      {/* TOGGLE BUTTON FLEXED AT RIGHT */}
      <IconButton
        background="none"
        color="gray"
        mt={5}
        _hover={{ background: 'none' }}
        icon={<FiMenu />}
        className="toggleButton"
        onClick={() => setShowNav(!showNav)}
      />
    </div>
  );
};

export default Navbar;
