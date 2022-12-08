import Oasis from '../../images/image.png';
import { BsBag, BsCreditCard } from 'react-icons/bs';
import { MdMoneyOff } from 'react-icons/md';
import { GiMoneyStack } from 'react-icons/gi';
import { AiOutlineBank } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import SideItems from './SideItems';
import '../sidebar/sidebar.scss';
import {
  HStack,
  VStack,
  Link,
  Image,
  Flex,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiUser3Line,
  RiLogoutBoxLine,
  RiQuillPenLine,
  RiBillLine,
  RiPlantLine,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [navSize, changeNavSize] = useState('large');
    
  return (
    <Flex
      h="95vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      w={navSize === 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
      className="sidebar"
    >
      <Flex>
        {/* BRANDING */}

        <HStack
          borderTopLeftRadius="1em"
          justifyContent="center"
          alignItems="center"
          color="whiteAlpha.900"
          bgGradient="linear(to-b, rgba(46,82,176)65%, rgb(46,82,165) 35%)"
          h="5em"
          w="100%"
        >

          <VStack>
            <Link _hover={{ textDecoration: 'none' }} to="/">
              <Image
                boxSize={navSize === 'small' ? '2.4em' : '2.8em'}
                objectFit="cover"
                src={Oasis}
                alt="Oasis"
              />
              <Heading as="h1" fontSize={navSize === 'small' ? '.8em' : '1em'}>
                OASIS
              </Heading>
            </Link>
          </VStack>
        </HStack>
      </Flex>

      {/* MAIN NAV ITEMS */}
      <NavLink _hover={{ textDecoration: 'none' }} to="/" activeclassname="active">
        <SideItems
          navSize={navSize}
          icon={RiDashboardLine}
          title="Overview"
        />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/profile/:profileid">
        <SideItems navSize={navSize} icon={RiUser3Line} title="Profile" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/accounts">
        <SideItems navSize={navSize} icon={AiOutlineBank} title="Accounts" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/cards">
        <SideItems navSize={navSize} icon={BsCreditCard} title="Cards" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/income">
        <SideItems navSize={navSize} icon={GiMoneyStack} title="Income" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/loans">
        <SideItems navSize={navSize} icon={MdMoneyOff} title="Loans" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/bills">
        <SideItems navSize={navSize} icon={RiBillLine} title="Bills" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/savings">
        <SideItems navSize={navSize} icon={BsBag} title="Savings" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/investments">
        <SideItems navSize={navSize} icon={RiPlantLine} title="Investments" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/budgets">
        <SideItems navSize={navSize} icon={RiQuillPenLine} title="Budget" />
      </NavLink>
      <NavLink _hover={{ textDecoration: 'none' }} to="/logout">
        <SideItems navSize={navSize} icon={RiLogoutBoxLine} title="Logout" />
      </NavLink>

      {/* NAV BUTTON */}
      <Flex
        px={navSize === 'small' ? '20%' : '10%'}
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        mb={4}
        as="nav"
      >

        {/* CHANGE SIDEBAR SIZE */}
        <IconButton
          background="none"
          color="gray"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
      </Flex>
    </Flex>
  );

 
};

export default Sidebar;
