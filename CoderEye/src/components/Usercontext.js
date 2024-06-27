// src/components/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [leetcodeUsername, setLeetCodeUsername] = useState('');
  const [codeforcesUsername, setCodeforcesUsername] = useState('');

  return (
    <UserContext.Provider value={{ leetcodeUsername, setLeetCodeUsername, codeforcesUsername, setCodeforcesUsername }}>
      {children}
    </UserContext.Provider>
  );
};
