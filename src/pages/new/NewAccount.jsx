import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import bank from '../../images/bank.png';
import Select from 'react-select';
import {  useId, useState, useContext } from 'react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import {  db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const NewAccount = ({ inputs, title, details }) => {
  const {currentUser} = useContext(AuthContext)
  
  
  const accntSelect = [
    {
      id: useId(),
      label: 'Current',
      value: 'current',
    },
    {
      id: useId(),
      label: 'Savings',
      value: 'savings',
    },
    {
      id: useId(),
      label: 'Other',
      value: 'Other',
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
      await addDoc(collection(db, "users", currentUser.uid, "accounts"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate('/accounts');
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
              <img src={bank} size="lg" className="avatar" alt="account" />
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
                    options={accntSelect}
                    placeholder={accntSelect ? 'Account Type' : ''}
                  />
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

export default NewAccount;
