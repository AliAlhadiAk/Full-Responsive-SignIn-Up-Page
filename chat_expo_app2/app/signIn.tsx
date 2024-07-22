import { View, Text, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { isLoading } from 'expo-font'
import Loading from '@/Component/Loading'
import CustomeKeboardView from '@/Component/CustomeKeboardView'

const SignIn = () => {
    const router = useRouter();
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const [loading,setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        if(!emailRef.current || !passwordRef.current){
            Alert.alert('SignIn','Please fill all the fields!')
        }
    }
  return (
    <CustomeKeboardView>
  <StatusBar style='dark' />
  <View style={{ flex: 1, gap: 48, paddingTop: hp(8), paddingHorizontal: wp(5) }}>
    <View style={tw`items-center`}>
      <Image
        source={require('../assets/login.png')}
        style={{ height: hp(25) }}
        resizeMode='contain'
      />
    </View>
    <View style={{ gap: hp(2) }}>
      <View style={{ gap: 16 }}>
        <Text style={[{ fontSize: hp(4), marginBottom: hp(3) }, tw`font-bold text-center text-black`]}>Sign In</Text>
        <View style={[{ height: hp(7), gap: 16 }, tw`flex-row px-4 bg-gray-100 items-center rounded-md`]}>
          <Octicons name='mail' size={hp(2.7)} color={'gray'} />
          <TextInput
          onChangeText={value => emailRef.current = value}
            style={[{ fontSize: hp(2) }, tw`flex-1 font-semibold text-gray-700`]}
            placeholder='Email Address'
            placeholderTextColor='gray'
          />
        </View>
        <View style={{ gap: 6 }}>
          <View style={[{ height: hp(7), gap: 16 }, tw`flex-row px-4 bg-gray-100 items-center rounded-md`]}>
            <Octicons name='lock' size={hp(2.7)} color={'gray'} />
            <TextInput
               onChangeText={value => passwordRef.current = value}
              style={[{ fontSize: hp(2) }, tw`flex-1 font-semibold text-gray-700`]}
              placeholder='Password'
              secureTextEntry
              placeholderTextColor='gray'
            />
          </View>
        </View>
        <Text style={[{ fontSize: hp(1.8), marginTop: hp(1.5) }, tw`font-semibold text-right text-gray-500`]}>Forgot Password?</Text>
      </View>
     <View>
        {
            loading?(
             <View style={tw`flex-row justify-center`}>
                <Loading size={hp(6.5)}/>
             </View>
            ):(
                <TouchableOpacity style={tw`bg-indigo-500 rounded-xl mt-4`}>
            <Text style={[{ fontSize: hp(2.7) }, tw`text-white font-bold text-center p-3`]}>Sign In</Text>
          </TouchableOpacity>
            )
        }
     </View>
      <View style={[tw`flex-row justify-center mt-4`]}>
        <Text style={[{ fontSize: hp(1.5) }, tw`font-semibold text-gray-500`]}>Don't have an account? </Text>
        <Pressable onPress={() => router.push('signup')}>
        <Text style={[{ fontSize: hp(1.8) }, tw`font-bold text-black`]}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  </View>
  </CustomeKeboardView>


  
  
  )
}

export default SignIn