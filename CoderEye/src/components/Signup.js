import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './Signup.module.css'; // Import CSS module

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
    // Name validation (no numbers allowed)
    if (!name || /\d/.test(name)) {
      setError('Please enter a valid name without numbers.');
      return;
    }

    // Email validation
    if (!email || !email.includes('@') || !email.includes('.com')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation
    if (!password || password.length < 10) {
      setError('Password must be at least 10 characters long.');
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear any previous error messages
    setError('');

    // Handle signup logic here
    navigate('/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  const redirectToLogin = () => {
    navigate('/login'); // Replace with the correct route to your Login page
  };

  return (
    <div className={styles.signupWrapper_custom}>
      <div className={styles.signup_custom}>
        <h2>Sign Up</h2>
        {error && <p className={styles.error_custom}>{error}</p>}
        <div className={styles.inputContainer_custom}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className={styles.inputIcon_custom}><FaUser /></span> {/* Add user icon */}
        </div>
        <div className={styles.inputContainer_custom}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className={styles.inputIcon_custom}><FaEnvelope /></span> {/* Add email icon */}
        </div>
        <div className={styles.inputContainer_custom}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.eyeIcon_custom} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Correct the icons */}
          </span>
          <span className={styles.inputIcon_custom}><FaLock /></span> {/* Add lock icon */}
        </div>
        <div className={styles.inputContainer_custom}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className={styles.eyeIcon_custom} onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} {/* Correct the icons */}
          </span>
          <span className={styles.inputIcon_custom}><FaLock /></span> {/* Add lock icon */}
        </div>
        <button className={styles.custom} onClick={handleSignup}>Sign Up</button>
        <p>
          Already have an account? <span className={styles.signupLink_custom} onClick={redirectToLogin}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
