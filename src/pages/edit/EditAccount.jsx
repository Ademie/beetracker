import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import '../new/new.scss';
import bank from '../../images/bank.png';
import Select from 'react-select';
import {  useId, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverTimestamp, addDoc, collection, updateDoc, query, onSnapshot } from 'firebase/firestore';
import {  db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';


const EditAccount = ({ inputs, title, details }) => {
  const [accounts, setAccounts] = useState([]);
  const {currentUser} = useContext(AuthContext)

  const myObj = {
    id: 'hey',
    name: 'boo'
  }
  useEffect(()=>{
    localStorage.setItem('boo', "accounts")
  },[])

  console.log('local',localStorage.getItem('boo'))
  
  
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



  // FETCH ACCOUNTS DATA
  useEffect(() => {
   
    const unsub = onSnapshot(
      collection(db, "users", currentUser.uid, "accounts"),
      snapshot => {
        let list = [];
        let so = []
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
          so.push(doc.data())

        });
        setAccounts(list);
        console.log('Account', accounts)
      },
      error => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);


  
  const updateData = async e => {
    e.preventDefault();
    
    try {
        await updateDoc(collection(db, "users", currentUser.uid, "accounts", currentUser.accounts.uid),
        
    //   await addDoc(collection(db, "users", currentUser.uid, "accounts"), 
      {
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
              <form onSubmit={updateData}>
                {inputs.map(input => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    //   value={input.value}
                   
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

export default EditAccount;
