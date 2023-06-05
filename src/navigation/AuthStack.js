import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/login";
import SignupScreen from "../screens/Signup";
import Splash from '../screens/splash';


const Appstack = createNativeStackNavigator();

const AuthStack = () => {

    return (
        <Appstack.Navigator
            // headerMode='none'
            >
            {/* <Appstack.Screen name='Splash' component={Splash}  options={{ header: () => null }}/> */}
            <Appstack.Screen name='Login' component={LoginScreen} />
            <Appstack.Screen name='Register' component={SignupScreen} />
          
        </Appstack.Navigator>
    );
}

export default AuthStack;