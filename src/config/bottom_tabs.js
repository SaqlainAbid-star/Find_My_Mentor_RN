import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppStack from "../navigation/AppStack";
import HomeScreen from '../screens/Home';

import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/Profile';
import CoursesScreen from '../screens/courses';
import AddCourse from '../screens/AddCourses';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator
      initialRouteName="Home" 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Courses') {
              iconName = 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }
  
            // Return the icon component
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2f95dc',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#f2f2f2',
            height: 60,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
          },
          labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabStyle: {
            paddingBottom: 5,
          },
        }}>
        <Tab.Screen name="Home" component={AppStack} />
        <Tab.Screen name="Courses" component={CoursesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
  

export default MyTabs;