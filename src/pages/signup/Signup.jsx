import { Avatar, ChakraProvider } from '@chakra-ui/react';
import { myTheme } from '../../theme/_theme';
import '../new/new.scss';
import user from '../../images/user.png';
import { FaFileUpload } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Country from '../new/country/Country';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Signup = ({ inputs }) => {
  const [file, setFile] = useState();
  const [data, setData] = useState({});

   // Navigate to loginpage after succesful signup
    const navigate = useNavigate()
  // prevent reuploading of image
  const [percentage, setPercentage] = useState(null)

  useEffect(() => {
    const uploadFile = () => {
      const uniqueName = new Date().getTime + file.name;
      const storageRef = ref(storage, file.name);

      
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPercentage(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        error => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setData((prev)=>({...prev, img:downloadURL}))
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = e => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async e => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      // Add a new account in collection "accounts"
      await setDoc(doc(db, 'users', res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <ChakraProvider theme={myTheme}>
      <div className="home new">
        <div className="navContainer">
          <div className="bottom">
            <div className="left">
              <Avatar
                src={file ? URL.createObjectURL(file) : user}
                size="xl"
                alt="user"
              />
            </div>
            <div className="right">
              <form onSubmit={handleAdd}>
                <div className="formInput">
                  <label htmlFor="file" className="imgupload">
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
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  </div>
                ))}
                <div className="select">
                  <Country onChange={handleInput} />
                </div>

                <button disabled={percentage !== null && percentage < 100} type="submit" className="setup">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Signup;

// import { useState } from 'react';
// import '../login/login.scss';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [error, setError] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//     // Navigate to loginpage after succesful signup
//     const navigate = useNavigate()

//   const handleSignup = e => {
//     e.preventDefault();

//     createUserWithEmailAndPassword(auth, email, password)
//       .then(userCredential => {
//         // Signed in
//         // const user = userCredential.user;
//         navigate('/login')
//       })
//       .catch(error => {
//         setError(true);
//       });
//   };
//   return (
//     <div className="signup login">
//       <form onSubmit={handleSignup}>
//         <input
//           type="email"
//           placeholder="email"
//           onChange={e => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           onChange={e => setPassword(e.target.value)}
//         />
//         <button type="submit">Signup</button>
//         {/* error messages */}
//         {error && <span>Wrong email or password</span>}
//       </form>
//     </div>
//   );
// };

// export default Signup;
