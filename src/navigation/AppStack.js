import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home';
import CoursesScreen from '../screens/courses';
import ProfileScreen from '../screens/Profile';
import AvailabilityForm from '../screens/Availability';
import DetailsScreen from '../screens/details';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Mentors') {
            iconName = 'search-outline';
          } else if (route.name === 'Courses') {
            iconName = 'book-outline';
          } else if (route.name === 'User Profile') {
            iconName = 'person-outline';
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          paddingBottom: 5,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
      >
      <Tab.Screen name="Courses" component={CoursesScreen} options={{ header: () => null }} />
      <Tab.Screen name="Mentors" component={HomeScreen} options={{ header: () => null }} />
      <Tab.Screen name="User Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const AppStack = ({ navigation }) => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: '#5edbbc',
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold'
    //   }
    // }}
    >
      <Stack.Screen name='Tabs' component={MyTabs} options={{ header: () => null }}
      // options={{
      //   title: 'Home',
      //   headerLeft: () => (
      //     <Icon.Button name="ios-menu" size={25} backgroundColor="#5edbbc" 
      //     onPress={() => navigation.openDrawer()}
      //     ></Icon.Button>
      //   )
      // }}
      />
      <Stack.Screen name='Select Your Availability' component={AvailabilityForm} />
      <Stack.Screen name='Details' component={DetailsScreen} />

    </Stack.Navigator>
  );
}

export default AppStack;