import { Avatar, Heading, Text } from '@chakra-ui/react';
import { AiOutlineDown } from 'react-icons/ai';
import React, { useContext, useEffect, useState } from 'react';
import '../investments/investments.scss';
import man from '../../images/man.png';
import invest from '../../data/Invest';


const Investments = () => {



  return (
    <div className="investments">
      {/* 1 */}
      <div className="top">
        <Heading as="h3" size="sm" className="head">
          Investments
        </Heading>
      </div>
      {/* 2 */}
      <div className="invs">
        <div className="content">
          <Avatar src={man} className='avatar' size="sm" />
          <div className="text">

            <Text >{invest[0].value}</Text>
            <Text className="small">{invest[0].value}</Text>
          </div>
        </div>
        <div className="content">
          <Avatar src={man} className='avatar' size="sm" />
          <div className="text">
            <Text >{invest[1].value}</Text>
            <Text className="small">{invest[1].value}</Text>
          </div>
        </div>
        <div className="content">
          <Avatar src={man} className='avatar' size="sm" />
          <div className="text">
            <Text >{invest[2].value}</Text>
            <Text className="small">{invest[2].value}</Text>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="total">
        <div className="title">
          <Heading as="h6" size="sm">
            Total Investment
          </Heading>
          <AiOutlineDown />
        </div>
        <p className="sum">
          $11,500.00
        </p>
      </div>
    </div>
  );
};

export default Investments;
