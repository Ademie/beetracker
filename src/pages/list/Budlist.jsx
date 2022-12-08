import { ChakraProvider } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import '../list/list.scss';
import '../home/home.scss';
import Budtable from '../../components/datatable/Budtable';
import Billstable from '../../components/datatable/Billstable';
import Incometable from '../../components/datatable/Incometable';
import Savingstable from '../../components/datatable/Savingstable';
import Investstable from '../../components/datatable/Investstable';
import Pchart from '../../components/pchart/Pchart';
import Rchart from '../../components/rchart/Rchart';



const Budlist = ({ title }) => {
  return (
    <ChakraProvider theme={myTheme}>
      <div className="home list">
        <div className="sideContainer">
          <Sidebar />
        </div>
        <div className="navContainer">
          <Navbar />


          <div className='chartbox'>
              <Pchart/>
              <Rchart aspect={1 / 1} />
          
          </div>



          <Incometable title="Add New Income" />
          <Billstable title="Add New Bill" />
          <Savingstable title="Add New Saving" />
          <Investstable title="Add New Investment" />


        </div>

      </div>
    </ChakraProvider>
  );
};

export default Budlist;
