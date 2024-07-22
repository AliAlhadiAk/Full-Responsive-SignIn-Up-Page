import { View } from "@/components/Themed";
import { AuthContextProvider, useAuth } from "@/Context/authContext";
import { useRoute } from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SlideInDown } from "react-native-reanimated";
import tw from "tailwind-react-native-classnames";

const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();


    useEffect(() => {
        if (typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0] == '(app)';
        if(isAuthenticated && !inApp){
            router.replace('home')
        }else if(isAuthenticated == false){
            router.replace('signIn')
        }
    },[isAuthenticated])

    return <Slot/>
}

const RootLayout = () => {
  return (
    <AuthContextProvider>
        <MainLayout/>
    </AuthContextProvider>
  )
}

export default RootLayout