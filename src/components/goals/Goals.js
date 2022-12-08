import { Flex, Heading, Link, Text, VStack } from "@chakra-ui/react"
import Progress from "../progress/Progress"
import '../goals/goals.scss'


const Goals = () => {
  return (
    <div className="goals">
      
        <div className="top">
          <div className="left">
          <Heading size="sm">Goals</Heading>
          </div>
          <div className="right">
          <Heading size="sm">
          <Link fontSize={13} href="/goals" color='gray.500'>Add New</Link>
          </Heading>
          </div>
        </div>

       
      <Progress done="70"/>
      <Progress done="50"/>
      <Progress done="90"/>
      
    </div>
  )
}

export default Goals