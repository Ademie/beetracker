import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Text, ChakraProvider, Heading } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import bag from '../../images/bag.png';
import Select from 'react-select';
import Daterange from './daterange/Daterange';
import { useState, useContext } from 'react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import {  db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NewInvest = ({ inputs, title, details }) => {
  const {currentUser} = useContext(AuthContext)
  
  
  const payedSelect = [
   
    {
      id: 1,
      label: 'Account 1',
      value: 'Account 1',
    },
    {
      id: 2,
      label: 'Account 2',
      value: 'Account 2',
    },
    {
      id: 3,
      label: 'Account 3',
      value: 'Account 3',
    },
    
  ];
  const investSelect = [
   
    {
      id: 1,
      label: 'Flexi Savings',
      value: 'Flexi Savings',
    },
    {
      id: 2,
      label: 'Fixed Savings',
      value: 'Fixed Savings',
    },  
  ];

  const purposeSelect = [
   
    {
      id: 1,
      label: 'Automotive',
      value: 'Automotive',
    },
    {
      id: 2,
      label: 'Business',
      value: 'Business',
    },
    {
      id: 3,
      label: 'Home',
      value: 'Home',
    },
    {
      id: 4,
      label: 'Line of Credit',
      value: 'Line of Credit',
    },
    {
      id: 5,
      label: 'Personal',
      value: 'Personal',
    },
    {
      id: 6,
      label: 'Student',
      value: 'Student',
    },
  ];

  const [data, setData] = useState({});  
  const navigate = useNavigate();

  const handleInput = e => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "users", currentUser.uid, "investments"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      
      navigate('/investments');
    } catch (err) {
      console.log(err);
    }
  
  };

  return (
    <ChakraProvider theme={myTheme}>
      <div className="home new">
        <div className="sideContainer">
          <Sidebar />
        </div>
        <div className="navContainer">
          <Navbar />
          <div className="top">
            <Heading size="md" className="title">
              {title}
            </Heading>
            <Text size="sm" className="details">
              {details}
            </Text>
          </div>
          <div className="bottom">
            <div className="left">
            <img
                src={bag}
                size="lg"
                className='avatar'
                alt="loan"
              />
            </div>
            <div className="right">
              <form onSubmit={handleAdd}>
               
                {inputs.map(input => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      required
                    />
                    <label style={{ color: 'gray', fontSize: '12px' }}>
                      {input.desc}
                    </label>
                  </div>
                ))}
                <div>
                  <Select
                    className="select"
                    options={payedSelect}
                    placeholder={payedSelect ? "Account Payed From": ""}
                  />
                  <Select
                    className="select"
                    options={investSelect}
                    placeholder={investSelect ? "Investment Type": ""}
                  />
                  
                  <Select
                    className="select"
                    options={purposeSelect}
                    placeholder={purposeSelect ? "Investment Purpose": ""}
                  />

                  <Daterange/>
                </div>

                <button type="submit" className="setup">
                  Continue Setup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};


export default NewInvest;
