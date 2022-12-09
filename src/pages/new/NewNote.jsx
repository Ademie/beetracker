import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import card from '../../images/card.png';
import { useState, useContext } from 'react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NewNote = ({ inputs, title, details }) => {
  const { currentUser } = useContext(AuthContext);

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
      await addDoc(collection(db, 'users', currentUser.uid, 'notes'), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      navigate('/');
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
              <img src={card} size="lg" className="avatar" alt="card" />
            </div>
            <div className="right">
              <form onSubmit={handleAdd} >
                <div className='notesform'>
                  <input
                    className='notestitle'
                    id="title"
                    type="text"
                    placeholder="Add Title"
                    onChange={handleInput}
                    required
                  />
                  <textarea
                    className='notestext'
                    type="text"
                    id="text"
                    placeholder="Add Note..."
                    onChange={handleInput}
                    required
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

export default NewNote;
