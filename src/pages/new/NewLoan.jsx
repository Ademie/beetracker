import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Avatar, ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import loan from '../../images/loan.png';
import Select from 'react-select';
import Daterange from './daterange/Daterange';
import {  useId, useState, useContext } from 'react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import {  db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NewLoan = ({ inputs, title, details }) => {
  const {currentUser} = useContext(AuthContext)

 
  const loanSelect = [
   
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
      await addDoc(collection(db, "users", currentUser.uid, "loans"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      
      navigate('/loans');
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
                src={loan}
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
                  </div>
                ))}
                <div>
                  <Select
                    className="select"
                    options={loanSelect}
                    placeholder={loanSelect ? "Loan Type": ""}
                  />
                   <Select
                    className="select"
                    options={currencySelect}
                    placeholder={currencySelect ? "Currency": ""}
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


export default NewLoan;
