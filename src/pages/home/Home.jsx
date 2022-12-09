import { ChakraProvider } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import Widgets from '../../components/widgets/Widgets';
import Chart from '../../components/chart/Chart';
import Investments from '../../components/investments/Investments';
import Notestable from '../../components/datatable/Notestable';



const Home = () => {
  
  return (
    <ChakraProvider theme={myTheme}>
      <div className="home">
        <div className="sideContainer">
          <Sidebar />
        </div>
        <div className="navContainer">
          <Navbar />
          <div className="sectionContainer">
            <div className="widgetContainer">
              <div className="topWid">
                <Widgets type="networth" />
                <Widgets type="income" />
                <Widgets type="bills" />
                <Widgets type="loans" />
              </div>
              <div className="charts">
                <Chart />
                <Investments />
              </div>
              <div className="tableContainer">
                <Notestable/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Home;

{
  /* <Container
maxW="container.xl"
bgColor="whiteAlpha"
p={0}
m={0}
pos="relative"
>
<Flex
  justifyContent="flex-end"
  p={0}
  m={0}
  h={{ base: 'auto', md: '100vh' }}
  pos="relative"
>
  <Sidebar />
  <Navbar/>
</Flex>
</Container> */
}
