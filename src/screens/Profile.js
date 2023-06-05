// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import database from '@react-native-firebase/database';
// import { AuthContext } from '../navigation/AuthProvider';


// const ProfileScreen = () => {
//     const [userData, setUserData] = useState(null);



//     const { user, logout } = useContext(AuthContext);
//     const uid = user.uid;

//     // console.log(uid);


//     useEffect(() => {
//         // Retrieve user data from Firebase Realtime Database
//         database()
//             .ref(`users/${uid}`)            // current user
//             // .ref(`users`)                // To access all users
//             // .orderByChild('role').equalTo('Student')    // Filter
//             .once('value')
//             .then(snapshot => {
//                 const data = snapshot.val();
//                 // console.log("Profile data",data);
//                 setUserData(data)
//                 // console.log(userData);
//             });


//     }, []);

//     if (!user) {
//         return <Text>Loading...</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             {userData ? (
//                 <>
//                     <Image style={styles.profileImage} source={{ uri: userData.imgUrl }} />
//                     <Text style={styles.name}>{userData.name}</Text>
//                     <Text style={styles.info}>{userData.email}</Text>
//                     <Text style={styles.info}>{userData.phone}</Text>
//                     <Text style={styles.info}>{userData.country}</Text>
//                     <View style={styles.row}>
//                         <Text style={styles.label}>Role:</Text>
//                         <Text style={styles.value}>{userData.role}</Text>
//                     </View>
//                     <View style={styles.row}>
//                         <Text style={styles.label}>Expertise:</Text>
//                         <Text style={styles.value}>{userData.expertise}</Text>
//                     </View>
//                     {/* <TouchableOpacity style={styles.editButton}>
//                 <Text style={styles.editText}>Edit Profile</Text>
//               </TouchableOpacity> */}
//                 </>
//             ) : (
//                 <Text>Loading...</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     profileImage: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         marginBottom: 20,
//     },
//     name: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     info: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 5,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginRight: 10,
//     },
//     value: {
//         fontSize: 16,
//     },
//     editButton: {
//         backgroundColor: '#8e44ad',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 20,
//     },
//     editText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default ProfileScreen;












import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import { AuthContext } from '../navigation/AuthProvider';

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import LineDivider from '../../components/LineDivider';
import ProgressBar from '../../components/ProgressBar';
import ProfileValue from '../../components/ProfileValue';
import ProfileRadioButton from '../../components/ProfileRadioButton';

const ProfileScreen = ({ navigation }) => {

  const [newCourseNotification, setNewCourseNotification] = React.useState(false)
  const [studyReminder, setSudyReminder] = React.useState(false)
  const [userData, setUserData] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const uid = user.uid;

  console.log(uid);

  useEffect(() => {
    // Retrieve user data from Firebase Realtime Database
    database()
      .ref(`users/${uid}`)            // current user
      // .ref(`users`)                // To access all users
      // .orderByChild('role').equalTo('Student')    // Filter
      .on('value', (snapshot) => {
        const data = snapshot.val();
        console.log("Profile data", data);
        setUserData(data)
      });

    // Clean up the listener to avoid memory leaks
    return () => database().ref(`users/${uid}`).off('value');
  }, []);




  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'space-between'
        }}
      >
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.black
          }}
        >
          Profile
        </Text>

        <IconButton
          icon={icons.sun}
          iconStyle={{
            tintColor: COLORS.black
          }}
        />
      </View>
    )
  }

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary3
        }}
      >
        {/* Profile Image */}
        <TouchableOpacity
          style={{
            width: 100,
            height: 100
          }}
        >
          <Image
            // source={images.profile}
            source={{ uri: userData.imgUrl }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50,
              borderWidth: 1,
              borderColor: COLORS.white
            }}
          />

          <View
            style={{
              position: 'absolute',
              width: "100%",
              height: "100%",
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.primary
              }}
            >
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17
                }}
              />
            </View>
          </View>
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
              color: COLORS.white,
              ...FONTS.h2
            }}
          >
            {userData.name}

          </Text>

          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4
            }}
          >
            Role: {userData.role}
          </Text>

          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4
            }}
          >
            Expertise: {userData.expertise}
          </Text>

          {/* Progress */}
          {/* <ProgressBar
            Progress="58%"
            ContainerStyle={{
              marginTop: SIZES.radius
            }}
          />

          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body4
              }}
            >
              Overall Prgress
            </Text>

            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4
              }}
            >
              58%
            </Text>
          </View> */}

          {/* Add Courses */}
          {userData.role === "Mentor" ?
            <TextButton
              // onPress={() => navigation.navigate('Add Course',{userData})}
              label="Add Courses"
              contentContainerStyle={{
                height: 35,
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
                borderRadius: 20,
                backgroundColor: COLORS.white
              }}
              labelStyle={{
                color: COLORS.primary
              }}
            />
            : null}
        </View>
      </View>
    )
  }

  function renderProfileSection1() {
    return (
      <View
        style={styles.profileSectionContainer}
      >
        <ProfileValue
          icon={icons.profile}
          label="Name"
          value={userData.name}
        />

        <LineDivider />

        <ProfileValue
          icon={icons.email}
          label="Email"
          value={userData.email}
        />

        <LineDivider />


        <ProfileValue
          icon={icons.call}
          label="Contact Number"
          value={userData.phone}
        />

        <LineDivider />

        <ProfileValue
          icon={icons.country}
          label="Country"
          value={userData.country}
        />




        {userData.role === "Mentor" ?
          <View>
            <LineDivider />

            <ProfileValue
              icon={icons.coin}
              label="Price"
              value={userData.price}
            />

            <LineDivider />
            {userData.days.length > 0 && (
              <View style={styles.selectedDaysContainer}>
                <Text style={styles.selectedDaysHeader}>Selected days:</Text>
                {userData.days.map((day, index) => (
                  <Text key={index} style={styles.selectedDayLabel}>
                    {day}
                  </Text>
                ))}
              </View>
            )}

            {userData.times.length > 0 && (
              <View style={styles.selectedDaysContainer}>
                <Text style={styles.selectedDaysHeader}>Selected Times:</Text>
                {userData.times.map((time, index) => (
                  <Text key={index} style={styles.selectedDayLabel}>
                    {time}
                  </Text>
                ))}
              </View>
            )}
          </View>
          : null}

      </View>
    )
  }

  function renderProfileSection2() {
    return (
      <View
        style={styles.profileSectionContainer}
      >

        <ProfileRadioButton
          icon={icons.new_icon}
          label="Notifications"
          isSelected={newCourseNotification}
          onPress={() =>
            setNewCourseNotification
              (!newCourseNotification)
          }
        />

        <LineDivider />

        {userData.role === "Mentor" ?
          <View>
            <ProfileValue
              onPress={() => navigation.navigate("Select Your Availability", { uid })}
              icon={icons.available}
              value="Set Availability"
            />
            <LineDivider />
          </View>
          : null
        }

        <ProfileValue
          onPress={() => logout()}
          icon={icons.logout}
          value="Log Out"
        />

      </View>
    )
  }

  if (userData) {

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white
        }}
      >
        {/* Header */}
        {/* {renderHeader()} */}



        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 30
          }}
        >
          {/* Profile Card */}
          {renderProfileCard()}

          {/*Profile Sectiobn 1*/}
          {renderProfileSection1()}

          {/* Profile Sectiobn 2 */}
          {renderProfileSection2()}


        </ScrollView>
      </View>
    );

  }


};

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20
  },
  selectedDaysContainer: {
    // marginTop: 20,
    padding: 10,
    // backgroundColor: '#eee',
    borderRadius: 5,
  },
  selectedDaysHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDayLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
})

export default ProfileScreen;
