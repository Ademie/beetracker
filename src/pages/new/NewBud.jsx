import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Avatar, ChakraProvider, Heading } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import './new.scss';
import user from '../../images/user.png';
import { RiFolderUploadFill } from 'react-icons/ri';
import Select from 'react-select';
import React, { useState } from 'react';

const NewBud = ({ inputs, title }) => {
  // handle file upload
  const [file, setFile] = useState('');
  
 
  const cardSelect = [
   
    {
      id: 1,
      label: 'America Express',
      value: 'America Express',
    },
    {
      id: 2,
      label: 'MasterCard',
      value: 'MasterCard',
    },
    {
      id: 3,
      label: 'Discover',
      value: 'Discover',
    },
    {
      id: 4,
      label: 'Visa',
      value: 'visa',
    },
    {
      id: 5,
      label: 'Other',
      value: 'Other',
    },
  ];
  
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
          </div>
          <div className="bottom">
            <div className="left">
              <Avatar
                src={file ? URL.createObjectURL(file) : { user }}
                size="lg"
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file" className="imgupload">
                    Image:
                    <RiFolderUploadFill className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={e => {
                      setFile(e.target.files[0]);
                    }}
                    style={{ display: 'none' }}
                  />
                </div>
                {inputs.map(input => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} required/>
                  </div>
                ))}
                <div>
                  <Select
                    className="select"
                    options={cardSelect}
                    placeholder={cardSelect ? "Account Type": ""}
                      

                    
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


export default NewBud;
