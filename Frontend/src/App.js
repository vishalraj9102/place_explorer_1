import React, { useState } from 'react';
import Auth from './components/Auth';
import SearchPlaces from './components/SearchPlaces'; // We'll handle place search after login

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <SearchPlaces />
      )}
    </div>
  );
}

export default App;
