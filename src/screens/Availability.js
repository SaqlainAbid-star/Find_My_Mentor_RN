// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// const timeSlots = ['8:00am - 10:00am', '10:00am - 12:00pm', '1:00pm - 3:00pm', '3:00pm - 5:00pm', '5:00pm - 7:00pm'];

// const AvailabilityForm = () => {
//   const [availability, setAvailability] = useState({});

//   const toggleAvailability = (day, timeSlot) => {
//     const updatedAvailability = { ...availability };
//     updatedAvailability[day] = updatedAvailability[day] || {};
//     updatedAvailability[day][timeSlot] = !updatedAvailability[day][timeSlot];
//     setAvailability(updatedAvailability);
//   };

//   const handleSubmit = () => {
//     // TODO: Save the availability data to Firebase or another database
//     console.log('Availability:', availability);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Select your availability for video meetings</Text>
//       {daysOfWeek.map((day, index) => (
//         <View key={index} style={styles.dayContainer}>
//           <Text style={styles.day}>{day}</Text>
//           <View style={styles.timeSlotsContainer}>
//             {timeSlots.map((timeSlot, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[styles.timeSlot, availability[day]?.[timeSlot] && styles.timeSlotSelected]}
//                 onPress={() => toggleAvailability(day, timeSlot)}
//               >
//                 <CheckBox
//                   value={availability[day]?.[timeSlot]}
//                   onValueChange={() => toggleAvailability(day, timeSlot)}
//                 />
//                 <Text style={styles.timeSlotLabel}>{timeSlot}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       ))}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   dayContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   day: {
//     fontSize: 18,
//     marginRight: 10,
//     width: 80,
//   },
//   timeSlotsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   timeSlot: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   timeSlotSelected: {
//     backgroundColor: '#5dbcd2',
//   },
//   timeSlotLabel: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   submitButton: {
//     backgroundColor: '#5dbcd2',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default AvailabilityForm;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,Alert } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import CheckBox from '@react-native-community/checkbox';
import database from '@react-native-firebase/database';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['8:00am - 10:00am', '10:00am - 12:00pm', '1:00pm - 3:00pm', '3:00pm - 5:00pm', '5:00pm - 7:00pm'];


const AvailabilityForm = ({route,navigation}) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [price, setPrice] = useState("");
    const [selectedTimes, setSelectedTimes] = useState([]);
    const uid = route.params.uid

    const toggleDaySelection = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const toggleTimeSelection = (time) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter((t) => t !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    };

    const handleSubmit = () => {
        // TODO: Save the availability data to Firebase or another database
        // console.log('Selected days:', selectedDays);
        // console.log('Selected Times:', selectedTimes);
        // console.log(price);


        database().ref(`users/${uid}`).update({
            days: selectedDays,
            times: selectedTimes,
            price,
          }).then(() => {
            Alert.alert('User data updated successfully!');
          }).catch((error) => {
            console.log(error);
            Alert.alert('Failed to update user data.');
          });
          

    };

    return (
        <ScrollView 
        contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            padding: 20
          }}>
            <Text style={styles.label}>Set Price</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price in dollars"
            />

            <Text style={styles.label}>Select days:</Text>
            {daysOfWeek.map((day, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.day, selectedDays.includes(day) && styles.selectedDay]}
                    onPress={() => toggleDaySelection(day)}
                >
                    <CheckBox value={selectedDays.includes(day)} onValueChange={() => toggleDaySelection(day)} />
                    <Text style={styles.dayLabel}>{day}</Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.label}>Select times:</Text>
            {timeSlots.map((time, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.day, selectedTimes.includes(time) && styles.selectedDay]}
                    onPress={() => toggleTimeSelection(time)}
                >
                    <CheckBox value={selectedTimes.includes(time)} onValueChange={() => toggleTimeSelection(time)} />
                    <Text style={styles.dayLabel}>{time}</Text>
                </TouchableOpacity>
            ))}


            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    day: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    selectedDay: {
        // backgroundColor: '#5dbcd2',
    },
    dayLabel: {
        fontSize: 18,
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#5edbbc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedDaysContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#eee',
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
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#5edbbc',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default AvailabilityForm;
