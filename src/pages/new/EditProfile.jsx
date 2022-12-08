import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Avatar, ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import user from '../../images/user.png';
import Country from './country/Country';
import { FaFileUpload } from 'react-icons/fa';
import { useState } from 'react';

const EditProfile = ({ inputs, title, details }) => {
  const [file, setFile] = useState();

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
              <Avatar src={
                  file ? URL.createObjectURL(file)
                  :user} size="xl" alt="user" />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file" className='imgupload'>
                    Image: <FaFileUpload className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={e => setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </div>
                {inputs.map(input => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} />
                  </div>
                ))}
                <div className="select">
                  <Country />
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

export default EditProfile;
