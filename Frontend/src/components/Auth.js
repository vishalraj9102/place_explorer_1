import React, { useState, useEffect } from 'react';
import '../style/Auth.css';

function Auth({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(true); // Toggle between Register and Login
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Check if token is available in localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []);

  // Handle Register or Login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegistering ? '/auth/register' : '/auth/login';
    const data = isRegistering
      ? { username, email, password } // Register data
      : { username, password }; // Login data

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 201 || response.status === 200) {
        // If registration or login is successful, store token
        if (!isRegistering) {
          localStorage.setItem('token', result.token);
          setIsLoggedIn(true); // Update login status
          onLoginSuccess(result.token); // Pass the token to the parent component
        }
        setMessage(result.message || 'Operation successful');
      } else {
        setMessage(result.message || 'Error occurred');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred, please try again.');
    }
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update login status
    setMessage('You have been logged out.');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.projectTitle}>Place Explorer</h1> {/* Project Name Added */}

      {isLoggedIn ? (
        // If logged in, show a success message and logout option
        <div>
          <h2 style={styles.title}>Welcome back!</h2>
          <button onClick={handleLogout} style={styles.submitButton}>Logout</button>
        </div>
      ) : (
        <div  className='main-container'>
          <h2 style={styles.title}>{isRegistering ? 'Register' : 'Login'}</h2>
          <form className='form-container' onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {isRegistering && (
              <div style={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" style={styles.submitButton}>{isRegistering ? 'Register' : 'Login'}</button>
          </form>
        </div>
      )}

      <p style={styles.message}>{message}</p>

      {!isLoggedIn && (
        <button onClick={() => setIsRegistering(!isRegistering)} style={styles.toggleButton}>
          {isRegistering ? 'Already have an account? Login' : 'Create an account? Register'}
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1c1c1c",
    color: "white",
    padding: "10px",
  },
  projectTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#0000FF",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "40px",
    textAlign: "center",
    color: "white",
  },
  inputGroup: {
    marginBottom: "20px",
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "10px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
  },
  message: {
    marginTop: "10px",
    color: "red",
    fontSize: "1rem",
  },
  toggleButton: {
    marginTop: "20px",
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Auth;
