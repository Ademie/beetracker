import { ChakraProvider } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import '../list/list.scss';
import '../home/home.scss';
import Cardstable from '../../components/datatable/Cardstable';

const Cardslist = ({title}) => {
  return (
    <ChakraProvider theme={myTheme}>
      <div className="home list">
        <div className="sideContainer">
          <Sidebar />
        </div>
        <div className="navContainer">
          <Navbar />
          <Cardstable title="Add New Card"/>
          
          
        </div>
        
      </div>
    </ChakraProvider>
  );
};

export default Cardslist;
