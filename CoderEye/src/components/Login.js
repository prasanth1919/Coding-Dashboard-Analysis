import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const allowedEmails = ['shriyans3@gmail.com', 'jushith123@gmail.com', 'prasanth1919@gmail.com'];
  const validPasswords = {
    'shriyans3@gmail.com': 'admin123',
    'jushith123@gmail.com': 'admin123',
    'prasanth1919@gmail.com': 'admin123'
  };

  const handleLogin = () => {
    // Email validation
    if (!email || !email.includes('@gmail.com')) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    // Password validation
    if (!password || password.length < 6) { // Minimum password length validation
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Check if email is in allowed list and password matches
    if (!allowedEmails.includes(email) || password !== validPasswords[email]) {
      setError('Invalid Gmail address or password.');
      return;
    }

    // Clear any previous error messages
    setError('');

    // Proceed with login logic here
    navigate('/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginWrapper_custom}> {/* Updated wrapper div for alignment */}
      <div className={styles.login_custom}> {/* Updated className from CSS module */}
        <h2>Login</h2>
        <div className={styles.inputContainer_custom}> {/* Updated className from CSS module */}
          <FontAwesomeIcon icon={faUser} className={styles.inputIcon_custom} />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className={styles.inputContainer_custom}> {/* Updated className from CSS module */}
          <FontAwesomeIcon icon={faLock} className={styles.inputIcon_custom} />
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <span className={styles.eyeIcon_custom} onClick={togglePasswordVisibility}> {/* Updated className from CSS module */}
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>
        {error && <p className={styles.error_custom}>{error}</p>} {/* Updated className from CSS module */}
        <button className={styles.custom} onClick={handleLogin}>Login</button> {/* Updated className from CSS module */}
        <p>
          Don't have an account? <span className={styles.signupLink_custom} onClick={() => navigate('/signup')}>Create account</span> {/* Updated className from CSS module */}
        </p>
      </div>
    </div>
  );
}

export default Login;
