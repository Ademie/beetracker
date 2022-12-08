import React from 'react';
import '../home/home.scss';
import { ChakraProvider, Heading, Link} from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './profile.scss';
import simon from '../../components/progress/images/simon.jpg';
import Rechart from '../rechart/Rechart';
import Transactions from '../../components/transactions/Transactions';



const Profile = () => {
  return (
    <ChakraProvider theme={myTheme}>
      <div className="home profile">
        <div className="sideContainer">
          <Sidebar />
        </div>
        <div className="navContainer">
          <Navbar />
          
          <div className="top">
            <div className="left">
              <Link _hover={{ textDecoration: 'none' }}  href="/profile/edit" className="editButton">Edit</Link>
              <Heading size="sm" className="mainTitle">
                Information
              </Heading>
              <div className="item">
                <img src={`${simon}`} className="itemImg" alt='user'/>
                <div className="details">
                  <Heading className="itemTitle" size="md">
                    Ademie Dave
                  </Heading>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue ">ademiedave@gmail.com</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue ">+1 234 112 33</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue ">
                      Elt St. 204 Forteta Ave. NewYork
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue ">USA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right charts">
              <Rechart aspect={1/1} title="Bills and Income(Last 6 months)"/>
            </div>
          </div>
          <div className="bottom">
          <Heading size="sm" className="mainTitle">
                Last Transactions
              </Heading>
          <Transactions/>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Profile;
