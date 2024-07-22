import { View, Text, Platform } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native'

const CustomeKeboardView = ({children}:{children:any}) => {
    const ios = Platform.OS == 'ios'
  return (
   <KeyboardAvoidingView
   behavior={ios?'padding':'height'}
   style={{flex:1}}>
    <ScrollView
    style={{flex:1}}
    bounces={false}
    showsVerticalScrollIndicator={false}>
        {children}
        
    </ScrollView>
   </KeyboardAvoidingView>
  )
}

export default CustomeKeboardView