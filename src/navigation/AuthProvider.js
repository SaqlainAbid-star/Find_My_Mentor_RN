import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
              return e;
            }
          },
          register: async (email, password) => {
            try {
              const userCredential = await auth().createUserWithEmailAndPassword(email, password);
              // User registered successfully
              const user = userCredential.user;
              // console.log("Auth", user);
              return {user:user,e: null};
            } catch (e) {
              console.log(e);
              return {user:null,e:e};
            }
          },
          logout: async () => {
            try {
              await auth().signOut();
            } catch (e) {
              console.log(e);
            }
          },
        }}>
        {children}
      </AuthContext.Provider>
    );
  };