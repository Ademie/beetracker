import { useContext, useState } from 'react';
import '../login/login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigate to homepage after succesful login
  const navigate = useNavigate()

  //  Ensure loggedin user is persistence across app
  const {dispatch} = useContext(AuthContext)

const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        dispatch({type: "LOGIN", payload:user})
        navigate("/")

        // console.log(user.uid)
      })
      .catch(error => {
        setError(true);
      });

  };

  
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {/* error messages */}
        {error && <span>Wrong email or password</span>}
      </form>
    </div>
  );
};

export default Login;
