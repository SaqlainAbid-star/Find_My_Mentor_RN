import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import LineDivider from '../../components/LineDivider';
import ProgressBar from '../../components/ProgressBar';
import ProfileValue from '../../components/ProfileValue';
import ProfileRadioButton from '../../components/ProfileRadioButton';


const Section = ({ containerStyle, title, onPress, children }) => {
  return (
    <View
      style={{
        ...containerStyle
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding - 20,
          marginBottom: 10
        }}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
            color: COLORS.black
          }}
        >
          {title}
        </Text>

        {/* <TextButton
          contentContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary
          }}
          label="See All"
          onPress={onPress}
        /> */}
      </View>

      {children}
    </View>
  )
}


const HomeScreen = ({ navigation }) => {

  const [users, setUsers] = useState(null);
  const [filterUsers, setfilterUsers] = useState(null);
  const [search, setSearch] = useState();


  const searchUsers = (value) => {
    if (value !== '') {
      setfilterUsers(
        filterUsers.filter(i => i.expertise.toLowerCase().includes(value.toLowerCase()))
      )
    } else {
      setfilterUsers(users)
    }
  }


  useEffect(() => {
    const usersRef = database().ref('users').orderByChild('role').equalTo('Mentor')

    // Subscribe to realtime updates
    usersRef.on('value', snapshot => {
      const users = [];
      snapshot.forEach(childSnapshot => {
        const user = childSnapshot.val();
        users.push(user);
      });
      setUsers(users);
      setfilterUsers(users)
    });

    // Unsubscribe from realtime updates when the component unmounts
    return () => usersRef.off('value');
  }, []);

  function renderSearchBar() {
    return (
      <View>
        {/* Search Bar */}
        <View style={{
          // position: 'absolute',
          // top: 10,
          // left: 0,
          // right: 0,
          // paddingHorizontal: SIZES.padding,
          height: 50,
          flexDirection: 'row',
          marginTop: 15,
          marginBottom: 5,
          paddingHorizontal: SIZES.padding - 15,
          alignItems: 'center'
        }} >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              width: SIZES.width - (SIZES.padding * 2),
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={icons.search}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.gray40
              }}
            />

            <TextInput
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                ...FONTS.h4,
                color: COLORS.black
              }}
              value={search}
              onChangeText={(value) => searchUsers(value)}
              placeholder="Search by Expertise"
              placeholderTextColor={COLORS.black}
            />
          </View>
        </View>
      </View>
    );
  }



  if (filterUsers) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white
        }}
      >

        {/* Search Bar*/}
        {renderSearchBar()}

        <ScrollView contentContainerStyle={{
          paddingHorizontal: SIZES.padding - 8,
          paddingBottom: 50
        }}>

          {/* Section */}
          <Section
            title="All Mentors"
            containerStyle={{
              marginTop: 10,
            }}
          >



            {filterUsers.map((user, index) => (
              <View key={index}
                style={{
                  // flexDirection: 'row',
                  marginTop: SIZES.radius,
                  paddingHorizontal: SIZES.radius,
                  paddingVertical: 20,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.primary3
                }}
              >
                <View style={{ flexDirection: 'row', marginBottom: SIZES.padding - 5, }}>
                  {/* Profile Image */}
                  <TouchableOpacity
                    style={{
                      width: 100,
                      height: 100
                    }}
                  >
                    <Image
                      // source={images.profile}
                      source={{ uri: user.imgUrl }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: COLORS.white
                      }}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: SIZES.radius + 20,
                      alignItems: 'flex-start'
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.primary,
                        ...FONTS.h2,
                        fontWeight: 'bold',
                      }}
                    >
                      {user.name}

                    </Text>


                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4
                      }}
                    >
                      Expertise: {user.expertise}
                    </Text>

                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4
                      }}
                    >
                      Phone: {user.phone}
                    </Text>

                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4
                      }}
                    >
                      Email: {user.email}
                    </Text>

                   

                  </View>

                </View>

                {/* <LineDivider />


                <View style={styles.selectedDaysContainer}>
                  <View style={styles.selectedDaysLeftCol}>
                    <Text style={styles.selectedDaysHeader}>Days available:</Text>
                    {user.days.map((day, index) => (
                      <Text key={index} style={styles.selectedDayLabel}>
                        {day}
                      </Text>
                    ))}
                  </View>


                  <View style={styles.selectedDaysRightCol}>
                    <Text style={styles.selectedDaysHeader}>Times available:</Text>
                    {user.times.map((time, index) => (
                      <Text key={index} style={styles.selectedDayLabel}>
                        {time}
                      </Text>
                    ))}
                  </View>
                </View> */}

                <LineDivider />




                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.padding, paddingHorizontal: SIZES.radius, }}>

                  <Text
                    style={{
                      ...FONTS.h2,
                      color: COLORS.primary,
                      flex: 1,
                    }}
                  >
                    $ {user.price}
                  </Text>

                  {/* Video Call */}
                  <TextButton
                    label="See Details"
                    onPress={() => navigation.navigate("Details", { user })}
                    contentContainerStyle={{
                      height: 35,
                      // marginTop: SIZES.padding,
                      // paddingHorizontal: SIZES.radius,
                      borderRadius: 20,
                      backgroundColor: COLORS.white,
                      flex: 1
                    }}
                    labelStyle={{
                      color: COLORS.primary
                    }}
                  />
                </View>

              </View>
            ))}

          </Section>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({

  selectedDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10
  },
  selectedDaysLeftCol: {
    flex: 1,
    marginRight: 8,
  },
  selectedDaysRightCol: {
    flex: 1,
    marginLeft: 8,
  },
  selectedDaysHeader: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary,

  },
  selectedDayLabel: {
    marginBottom: 4,
    color: COLORS.white,

  },

});