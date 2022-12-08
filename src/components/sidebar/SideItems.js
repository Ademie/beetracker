import { Flex, Menu, MenuButton, Link, Icon, Text } from '@chakra-ui/react';
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const SideItems = ({ navSize, title, icon, active}) => {

  return (
    <Flex
      mt={0}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      
      <Menu placement="right">
        <Link
          color={active ? 'primary' : 'gray.400'}
          p={0}
          px={6}
          borderRadius={8}
          _hover={{ bgColor: 'primary', color: 'white' }}
          w={navSize === 'large' && '100%'}
        >
          <MenuButton>
            <Flex p={navSize === "small" ? '1' : '2'} className='sideItems'>
              <Icon as={icon} _hover={{ color: 'white' }} fontSize="xl" />
              <Text ml={4} display={navSize === 'small' ? 'none' : 'flex'} className="sideText">
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default SideItems;
