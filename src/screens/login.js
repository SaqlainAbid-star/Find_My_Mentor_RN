import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login } = useContext(AuthContext);

    const handleUpdate = async () => {
        let error = await login(email, password)

        if (error != null) {
            Alert.alert(
                'Error', error.message
            );
            console.log(error.message);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >

            <Text style={styles.text}>My Mentor App</Text>




            <FormInput
                placeholderText="Email"
                onChangeText={(userEmail) => setEmail(userEmail)}
                labelValue={email}
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                isValid={true}                  // Formik Validation
                buttonTitle="Log In"
                onPress={handleUpdate}
            />


            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.navButtonText}>
                    Don't have an acount? Create here
                </Text>
            </TouchableOpacity>


        </ScrollView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // flex: 1,
        // paddingTop: 50
    },
    // logo: {
    //     height: 200,
    //     width: 200,
    //     resizeMode: 'cover',
    // },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 30,
        marginBottom: 10,
        color: '#5edbbc',
        fontWeight: 'bold'
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#5edbbc',
        fontFamily: 'Lato-Regular',
    },
});