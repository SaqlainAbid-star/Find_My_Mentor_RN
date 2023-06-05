import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import database from '@react-native-firebase/database';

import { COLORS, FONTS, SIZES, icons, images, dummyData } from "../../constants";

import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import LineDivider from '../../components/LineDivider';
import ProgressBar from '../../components/ProgressBar';
import ProfileValue from '../../components/ProfileValue';
import ProfileRadioButton from '../../components/ProfileRadioButton';
import { HorizontalCourseCard } from '../../components';
import { Colors } from 'react-native/Libraries/NewAppScreen';


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


const CoursesScreen = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState();
  
  
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
              placeholder="Search for Courses"
              placeholderTextColor={COLORS.black}
            />
          </View>
        </View>
      </View>
    );
  }


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >

      {/* Search Bar*/}
      {renderSearchBar()}




      {/* content */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150
        }}
        showsVerticalScrollIndicator={false}
      >




        {/* Section */}
        <Section
          title="Popular Courses"
          containerStyle={{
            margin: 15,

          }}
        >


          {dummyData.courses_list_2.map((course, index) => (
            <View key={index}>

              <HorizontalCourseCard course={course} i={index}
                // onPress={()=> navigation.navigate("All Videos",{course})}
                containerStyle={{
                  marginVertical: SIZES.padding,
                  marginTop: index == 0 ? SIZES.
                    radius : SIZES.padding
                }} />

              <LineDivider
                lineStyle={{
                  backgroundColor: COLORS.gray20
                }}
              />

            </View>
          ))
          }



        </Section>

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  courseContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CoursesScreen;




