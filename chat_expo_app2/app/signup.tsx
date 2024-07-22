import React, { Profiler, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import Loading from '@/Component/Loading';
import { Alert } from 'react-native';
import CustomeKeboardView from '@/Component/CustomeKeboardView';
import { useAuth } from '@/Context/authContext';
import { getAuth,createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { auth, usersRef } from '../firebaseConfig';

const SignUp = () => {
  const {register,isAuthenticated} = useAuth();
  const router = useRouter();
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const UserRef = useRef<string>('');
  const ProfileRef = useRef<string>('');
  const [loading,setLoading] = useState<boolean>(false)

 
  const handleRegister = async () => {
    setLoading(true);
    try {
      const authUser = await createUserWithEmailAndPassword(auth, emailRef.current, passwordRef.current);
      await updateProfile(authUser.user, {
        displayName: UserRef.current,
        photoURL: ProfileRef.current,
      });
      setLoading(false);
      console.log('Registration successful:', authUser.user);
      // Navigate to the next screen or perform any post-registration action
    } catch (error) {
      setLoading(false);
      console.error('Error registering user:', error.message);
      Alert.alert('Registration Error', error.message);
    }
  }; 

  return (
    <CustomeKeboardView>
  
      <StatusBar style='dark' />
      <View style={{ flex: 1, gap: 48, paddingTop: hp(8), paddingHorizontal: wp(5) }}>
        <View style={tw`items-center`}>
          <Image
            source={require('../assets/register.png')}
            style={{ height: hp(25) }}
            resizeMode='contain'
          />
        </View>
        <View style={{ gap: hp(2) }}>
          <View style={{ gap: 16 }}>
            <Text style={[{ fontSize: hp(4), marginBottom: hp(3) }, tw`font-bold text-center text-black`]}>Sign Up</Text>
            <View style={[{ height: hp(7), gap: 16 }, tw`flex-row px-4 bg-gray-100 items-center rounded-md`]}>
              <Octicons name='person' size={hp(2.7)} color={'gray'} />
              <TextInput
           
                style={[{ fontSize: hp(2), flex: 1 }, tw`font-semibold text-gray-700`]}
                placeholder='User Name'
                placeholderTextColor='gray'
                onChangeText={value => UserRef.current == value}
              />
            </View>
            <View style={[{ height: hp(7), gap: 16 }, tw`flex-row px-4 bg-gray-100 items-center rounded-md`]}>
              <Octicons name='mail' size={hp(2.7)} color={'gray'} />
              <TextInput
           
                style={[{ fontSize: hp(2), flex: 1 }, tw`font-semibold text-gray-700`]}
                placeholder='Email Address'
                placeholderTextColor='gray'
                onChangeText={value => emailRef.current == value}
              />
            </View>
            <View style={{ gap: 16 }}>
              <View style={[{ height: hp(7), gap: 16 }, tw`flex-row px-4 bg-gray-100 items-center rounded-md`]}>
                <Octicons name='lock' size={hp(2.7)} color={'gray'} />
                <TextInput
                  style={[{ fontSize: hp(2), flex: 1 }, tw`font-semibold text-gray-700`]}
                  placeholder='Password'
                  placeholderTextColor='gray'
                  secureTextEntry
                  onChangeText={value => passwordRef.current == value}
                />
              </View>
              <View style={[{ height: hp(7), gap: 16 }, tw`flex-row px-4 bg-gray-100 items-center rounded-md`]}>
                <Octicons name='image' size={hp(2.7)} color={'gray'} />
                <TextInput
                  style={[{ fontSize: hp(2), flex: 1 }, tw`font-semibold text-gray-700`]}
                  placeholder='Profile url'
                  placeholderTextColor='gray'
                  
                  onChangeText={value => ProfileRef.current == value}
                />
            </View>
            </View>
   
          </View>
          <View>
        {
            loading?(
             <View style={tw`flex-row justify-center`}>
                <Loading size={hp(6.5)}/>
             </View>
            ):(
                <TouchableOpacity onPress={handleRegister} style={tw`bg-indigo-500 rounded-xl mt-4`}>
            <Text style={[{ fontSize: hp(2.7) }, tw`text-white font-bold text-center p-3`]}>Sign Up</Text>
          </TouchableOpacity>
            )
        }
     </View>
          <View style={[tw`flex-row justify-center mt-0 pb-10`]}>
            <Text style={[{ fontSize: hp(1.5) }, tw`font-semibold text-gray-500`]}>Already have an account? </Text>
            <Pressable onPress={() => router.push('signIn')}>
              <Text style={[{ fontSize: hp(1.8), fontWeight: 'bold', color: 'black' }]}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    
    </CustomeKeboardView>
  );
};

export default SignUp;
