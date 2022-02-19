import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import classes from '../styles/SignUp.module.css';
import Button from './Button';
import Checkbox from './Checkbox';
import Form from './Form';
import TextInput from './TextInput';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const { signup } = useAuth();
    const history = useHistory();

  async function handleSubmit(e) {
      e.preventDefault();
      
      if (password !== confirmPassword) {
          return setError('Password aren\'t  matching'); 
      }

      try {

          setError('');
          setLoading(true);
          await signup(email, password, username);
          history.push('/');

      } catch (err) {
          console.log(err);
          setLoading(false);
          setError('Failed to create an account!');

      }
  }

  return (
    <Form className={`${classes.signup}`} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        required
        placeholder="Enter Name"
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        type="text"
        required
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        required
        placeholder="Enter password atleast 6 characters"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        required
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        required
        text="  I agree to the Terms & Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />

          <Button type='submit' disabled={loading} > Submit Now </Button>
          
          {error && <p className='error'> {error} </p>}
          
          <div className="info">
              
              Already have an account?
              <Link to="/login">
                  Login
              </Link> instead.
              
      </div>
    </Form>
  );
}
