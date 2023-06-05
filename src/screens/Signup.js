import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Alert, ScrollView } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../navigation/AuthProvider';

import database from '@react-native-firebase/database';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const SignupScreen = ({ navigation }) => {
  // const [name, setName] = useState();
  // const [phone, setPhone] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();

  const [image, setImage] = useState(null);
  const [Img, setImg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState('Mentor');
  const [country, setCountry] = useState('Pakistan');

  const { register } = useContext(AuthContext);

  const handleUpdate = async (name, phone, email, password, expertise) => {

    
      const {user,e} = await register(email, password);
      // console.log("Signup", user);
   

    if(e==null){

      let imgUrl = await uploadImage();

      let userData = {
        imgUrl,
        name,
        phone,
        email,
        expertise,
        role,
        country,
        days: [""],
        times: [""],
        price: "",
      }

        database().ref(`users/${user.uid}`).set(userData).then(() => {
          Alert.alert(
            `The ${role} has been registered successfully!`,
          );
        })
    


      setRole('')
      setCountry('')
      setImg(null)
    }else{
      Alert.alert(
        'Error',e.message
      );
    }


  }



  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //   }).then((image) => {
  //     console.log(image);
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     setImage(imageUri);
  //     bs.current.snapTo(1);
  //   });
  // };

  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      // bs.current.snapTo(1);
    });
  };




  // Formik Validation
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter your email address.'),
    password: Yup.string()
      .min(8)
      .required("Please enter your password.")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Must contain atleast one uppercase letter,one lowercase letter,one number and one special character.'
      ),
    // confirmPassword: Yup.string()
    //   .min(8, 'Confirm Password must be 8 characters long.')
    //   .oneOf([Yup.ref('password')], 'Your passwords do not match.')
    //   .required('Confirm password is required.'),
    name: Yup.string()
      .min(6, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Please enter your full name.'),
    phone: Yup.string()
      .min(11, 'Must be exactly 11 digits')
      .max(11, 'Must be exactly 11 digits')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Please enter your mobile number.')
  });


  return (
    <Formik initialValues={{
      name: '',
      phone: '',
      expertise: '',
      email: '',
      password: '',
      // confirmPassword: '',
    }}
      validationSchema={SignupSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}
    >
      {({ values,
        errors,
        handleChange,
        setFieldTouched,
        isValid,
        touched,
        handleSubmit }) => (

        <ScrollView style={styles.container}>
          {/* <Text style={styles.text}>Create an account</Text> */}

          <View style={styles.uploadContainer}>
            <TouchableOpacity onPress={choosePhotoFromLibrary}>
              <View style={styles.uploadIcon}>
                <View style={{ padding: 8, }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#000"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}
                  />
                </View>
                <Text style={styles.uploadtext}>Upload Profile Photo</Text>
              </View>
            </TouchableOpacity>
          </View>


          <FormInput
            // labelValue={name}  
            // onChangeText={(name) => setName(name)}
            labelValue={values.name}
            onChangeText={handleChange('name')}
            onBlur={() => { setFieldTouched('name') }}

            placeholderText="Name"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.errWrapper}>
            {touched.name && errors.name && (
              <Text style={styles.errTxt}>{errors.name}</Text>
            )}
          </View>

          <FormInput
            // labelValue={email}
            // onChangeText={(userEmail) => setEmail(userEmail)}
            labelValue={values.email}
            onChangeText={handleChange('email')}
            onBlur={() => { setFieldTouched('email') }}

            placeholderText="Email"
            iconType="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.errWrapper}>
            {touched.email && errors.email && (
              <Text style={styles.errTxt}>{errors.email}</Text>
            )}
          </View>

          <FormInput
            // labelValue={phone}
            // onChangeText={(phone) => setPhone(phone)}
            labelValue={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={() => { setFieldTouched('phone') }}
            placeholderText="Phone No."
            iconType="phone"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.errWrapper}>
            {touched.phone && errors.phone && (
              <Text style={styles.errTxt}>{errors.phone}</Text>
            )}
          </View>



          <FormInput
            // labelValue={name}  
            // onChangeText={(name) => setName(name)}
            labelValue={values.expertise}
            onChangeText={handleChange('expertise')}
            onBlur={() => { setFieldTouched('expertise') }}

            placeholderText="Expertise"
            iconType="plus"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.errWrapper}>
            {touched.expertise && errors.expertise && (
              <Text style={styles.errTxt}>{errors.expertise}</Text>
            )}
          </View>





          <FormInput
            // labelValue={password}
            // onChangeText={(userPassword) => setPassword(userPassword)}
            labelValue={values.password}
            onChangeText={handleChange('password')}
            onBlur={() => { setFieldTouched('password') }}

            autoCapitalize="none"
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />

          <View style={styles.errWrapper}>
            {touched.password && errors.password && (
              <Text style={styles.errTxt}>{errors.password}</Text>
            )}
          </View>

          {/* <FormInput
            // labelValue={confirmPassword}
            // onChangeText={(userPassword) => setPassword(userPassword)}
            labelValue={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={() => { setFieldTouched('confirmPassword') }}

            placeholderText="Confirm Password"
            iconType="lock"
            secureTextEntry={true}
          /> */}

          <View style={styles.errWrapper}>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errTxt}>{errors.confirmPassword}</Text>
            )}
          </View>

          <View style={styles.category}>
            <Picker selectedValue={role} onValueChange={(value) => setRole(value)}>
              <Picker.Item label="Mentor" value="Mentor" />
              <Picker.Item label="Student" value="Student" />
            </Picker>
          </View>

          <View style={styles.category}>
            <Picker selectedValue={country} onValueChange={(value) => setCountry(value)}>
              <Picker.Item label="Pakistan" value="Pakistan" />
              <Picker.Item label="India" value="India" />
              <Picker.Item label="China" value="China" />
              <Picker.Item label="England" value="England" />
              <Picker.Item label="Saudi Arab" value="Saudi Arab" />
            </Picker>
          </View>


          <FormButton
            buttonTitle="Create Account"
            isValid={true}
            // onPress={() => register(email, password)}
            onPress={() => handleUpdate(values.name, values.phone, values.email, values.password, values.expertise)}
          />


          {/* <View style={styles.textPrivate}>

        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>

        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>

        <Text style={styles.color_textPrivate}> and </Text>

        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>

      </View> */}

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navButtonText}>Have an account? Log In</Text>
          </TouchableOpacity>
        </ScrollView>

      )}
    </Formik>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 30,
    marginBottom: 10,
    color: '#5edbbc',
    fontWeight: 'bold'
  },
  uploadIcon: {
    height: 50,
    width: 400,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadContainer: {
    marginTop: 10,
    marginBottom: 0,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  uploadtext: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errWrapper: {
    width: '100%',
  },
  errTxt: {
    fontSize: 12,
    textAlign: 'left',
    color: '#FF0D10',

  },
  navButton: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',

  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5edbbc',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  category: {
    marginTop: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});
