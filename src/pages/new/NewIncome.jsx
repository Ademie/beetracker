import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import money from '../../images/money.png';
import Select from 'react-select';
import Daterange from './daterange/Daterange';
import {  useId, useState, useContext } from 'react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import {  db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NewIncome = ({ inputs, title, details }) => {
  const {currentUser} = useContext(AuthContext)

  const depositSelect = [
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

  // Navigate to accounts after succesful signup
  const navigate = useNavigate();

  //HANLE FORM INPUT FIELDS
  const handleInput = e => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  
  

  const handleAdd = async e => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "users", currentUser.uid, "income"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      
      navigate('/income');
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
              <img src={money} size="lg" className="avatar" alt="loan" />
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
                    options={depositSelect}
                    placeholder={depositSelect ? 'Deposit Account' : ''}
                  />
                  <Select
                    className="select"
                    options={dateSelect}
                    placeholder={dateSelect ? 'Recurrence' : ''}
                  />
                  {/* Date Range Picker */}
                  
                  <Daterange/>
                  
                  {/* <div className="textarea">
                    <label>Additional Notes (optional)</label>
                    <textarea cols="30" rows="2"></textarea>
                  </div> */}
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

export default NewIncome;
