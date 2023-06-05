import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';

import { useTheme } from "@react-navigation/native";

var bg = require('../../assets/bg.png');
var logo = require('../../assets/Saver.png')

function Splash({navigation}) {

    const { colors } = useTheme()

    setTimeout(()=>{
        navigation.navigate('Login')
    },3000)

    return (
        <ImageBackground
            source={bg}
            style={styles.bg}
        >

    
            <View style={styles.logo}>
                <Image style={styles.img} source={logo}></Image>
            </View>



            <View style={styles.textWrapper}>
                <Text style={styles.text}>By Saqlain Abid</Text>
            </View>



        </ImageBackground>
    );
}

export default Splash;

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
    },
    logo: {
        flex: 5,
        alignItems: 'center',
        // justifyContent: 'center'
        marginTop:150
    },
    img: {
        width: 220,
        height: 220,
    },
    text: {
        color: '#2e64e5',
        fontSize: 20,
        fontWeight:'bold',
        borderBottomWidth:3,
        borderColor: '#2e64e5',
    },
    textWrapper: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
     
    }
});
