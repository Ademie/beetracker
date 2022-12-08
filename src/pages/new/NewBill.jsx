import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import bill from '../../images/bill.png';
import Select from 'react-select';
import Daterange from './daterange/Daterange';
import {  useId, useState, useContext } from 'react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import {  db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NewBill = ({ inputs, title, details }) => {
  const {currentUser} = useContext(AuthContext)
  const currencySelect = [
   
    {
      id: 1,
      label: 'USD',
      value: 'DOLLARS',
    },
    {
      id: 2,
      label: 'EUR',
      value: 'EUROS',
    },
    {
      id: 3,
      label: 'GBP',
      value: 'POUNDS',
    },
    {
      id: 4,
      label: 'NGN',
      value: 'NAIRA',
    },
    {
      id: 5,
      label: 'Other',
      value: 'Other',
    },
  ];
  // Data would be fetched from user accounts added in the app
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
  // Recurrence
  const dateSelect = [
    {
      id: 1,
      label: 'Monthly',
      value: 'Monthly',
    },
    {
      id: 2,
      label: 'Bi-Weekly',
      value: 'Bi-Weekly',
    },
    {
      id: 3,
      label: 'Weekly',
      value: 'Weekly',
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
      await addDoc(collection(db, "users", currentUser.uid, "bills"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      
      navigate('/bills');
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
                src={bill}
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
                    options={currencySelect}
                    placeholder={currencySelect ? "Currency": ""}
                  />
                  <Select
                    className="select"
                    options={payedSelect}
                    placeholder={payedSelect ? "Account Payed From": ""}
                  />
                  <Select
                    className="select"
                    options={dateSelect}
                    placeholder={dateSelect ? 'Recurrence' : ''}
                  />
                  {/* Date Range Picker */}
                  
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


export default NewBill;
