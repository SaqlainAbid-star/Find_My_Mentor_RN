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

const DetailsScreen = ({ navigation, route }) => {

    const user = route.params.user;
    console.log(user);

    return (

        <View style={{flex:1,backgroundColor: COLORS.primary}}>


        <View 
        style={{
          // flexDirection: 'row',
          flex:1,
          marginTop: SIZES.radius + 20,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderTopRightRadius: SIZES.radius + 5,
          borderTopLeftRadius: SIZES.radius + 5,
          backgroundColor: COLORS.white
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: SIZES.padding - 5, }}>
          {/* Profile Image */}
          <TouchableOpacity
            style={{
              width: 120,
              height: 120
            }}
          >
            <Image
              // source={images.profile}
              source={{ uri: user.imgUrl }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 70,
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
              Name: {user.name}

            </Text>


            <Text
              style={{
                color: COLORS.gray60,
                ...FONTS.body4
              }}
            >
              Expertise: {user.expertise}
            </Text>

            <Text
              style={{
                color: COLORS.gray60,
                ...FONTS.body4
              }}
            >
              Phone: {user.phone}
            </Text>

            <Text
              style={{
                color: COLORS.gray60,
                ...FONTS.body4
              }}
            >
             Email: {user.email}
            </Text>


            <Text
              style={{
                color: COLORS.gray60,
                ...FONTS.body4
              }}
            >
              Country: {user.country}
            </Text>

          </View>

        </View>

        <LineDivider />


        <View style={styles.selectedDaysContainer}>
          <View style={styles.selectedDaysLeftCol}>
            <Text style={styles.selectedDaysHeader}>Days available</Text>
            {user.days.map((day, index) => (
              <Text key={index} style={styles.selectedDayLabel}>
                {day}
              </Text>
            ))}
          </View>


          <View style={styles.selectedDaysRightCol}>
            <Text style={styles.selectedDaysHeader}>Times available</Text>
            {user.times.map((time, index) => (
              <Text key={index} style={styles.selectedDayLabel}>
                {time}
              </Text>
            ))}
          </View>
        </View>

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
            // onPress={() => navigation.navigate('Add Course')}
            label="Connect"
            onPress={() => navigation.navigate("Details", { user })}
            contentContainerStyle={{
              height: 35,
              // marginTop: SIZES.padding,
              // paddingHorizontal: SIZES.radius,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
              flex: 1
            }}
            labelStyle={{
              color: COLORS.white
            }}
          />
        </View>

      </View>
      </View>




    );

}


export default DetailsScreen;


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
    //   justifyContent: "center",
      alignItems: "center",
    },
    selectedDaysRightCol: {
      flex: 1,
      marginLeft: 8,
      alignItems: "center",
    },
    selectedDaysHeader: {
      fontWeight: 'bold',
      ...FONTS.h3,
      marginBottom: 4,
      color: COLORS.primary,
  
    },
    selectedDayLabel: {
      marginBottom: 4,
      color: COLORS.gray50,
  
    },
  });

