import { Avatar, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import prog from '../../data/Prog';
import '../progress/progress.scss';

const Progress = ({done}) => {
  const [style, setStyle] = useState({})

  setTimeout(()=>{
    const newStyle ={
      opacity: 1,
      width: `${done}%`,
      background: 'red'
    }

    setStyle(newStyle)
  }, 1000)
  return (
    <div className="goContent">
      <Flex className="progTitle">
        <img src={prog[0].thumb} className="thumbNail" />

        <VStack className="progInfo">
          <Heading size="sm" className="small">{prog[0].title}</Heading>
          <Text className="smText">{prog[0].text}</Text>
        </VStack>
      </Flex>

      <VStack className="progContent">
        <Text className="progText">{done}% complete</Text>
        
        {/* progress */}
        <div className="progBar">
          <div className="progDone" style={style}>
            
          </div>
        </div>


      </VStack>
    </div>
  );
};

export default Progress;
