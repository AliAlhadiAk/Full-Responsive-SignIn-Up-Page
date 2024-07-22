import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const StartPage = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator color={'gray'} size={50}/>
    </View>
  )
}

export default StartPage